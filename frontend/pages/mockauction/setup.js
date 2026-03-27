import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import { teamsData } from '../../data/teams';
import { preRetentions } from '../../data/auctionPlayers';
import { auth, rtdb } from '../../utils/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, get } from 'firebase/database';

const RETENTION_SLABS = [18, 14, 11, 18, 14, 4]; // In Crores

export default function AuctionSetup() {
  const router = useRouter();
  const [phase, setPhase] = useState('FRANCHISE'); // 'FRANCHISE' | 'RETENTION'
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [userRetentions, setUserRetentions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
     const unsub = onAuthStateChanged(auth, async (user) => {
        if (user) {
           const snap = await get(ref(rtdb, `users/${user.uid}/prefs`));
           if (snap.exists() && snap.val().favTeam) {
              const team = snap.val().favTeam;
              // Only auto-select if it's a valid team name
              if (teamsData[team]) {
                 setSelectedTeam(team);
                 setPhase('RETENTION');
              }
           }
        }
        setLoading(false);
     });
     return () => unsub();
  }, []);

  const startRetentionPhase = (teamName) => {
    setSelectedTeam(teamName);
    setUserRetentions([]);
    setPhase('RETENTION');
  };

  const toggleRetention = (player) => {
    const isRetained = userRetentions.some(p => p.name === player.name);
    if (isRetained) {
      setUserRetentions(userRetentions.filter(p => p.name !== player.name));
    } else {
      if (userRetentions.length >= 6) return alert("Maximum 6 retentions allowed!");
      setUserRetentions([...userRetentions, player]);
    }
  };

  const calculateDeduction = () => {
    return userRetentions.reduce((total, _, index) => total + (RETENTION_SLABS[index] || 4), 0);
  };

  const finalizeSetupAndStart = () => {
    // Generate AI initial states
    const aiTeams = {};
    Object.keys(teamsData).forEach(key => {
      if (key !== selectedTeam) {
        const aiSquad = preRetentions[key] || [];
        const aiDeduction = aiSquad.reduce((tot, _, i) => tot + (RETENTION_SLABS[i] || 4), 0);
        aiTeams[key] = {
           name: key,
           purse: 120 - aiDeduction,
           squad: aiSquad.map(p => ({ ...p, price: RETENTION_SLABS[aiSquad.indexOf(p)] || 4 })),
           color: teamsData[key].color
        };
      }
    });

    const userStartingPurse = 120 - calculateDeduction();
    
    const initialState = {
      userTeam: selectedTeam,
      userPurse: userStartingPurse,
      userSquad: userRetentions.map((p, i) => ({ ...p, price: RETENTION_SLABS[i] || 4 })),
      aiTeams,
      rtmCards: 6 - userRetentions.length
    };

    localStorage.setItem('auction_v2_state', JSON.stringify(initialState));
    router.push('/mockauction/play');
  };

  const teams = Object.keys(teamsData).map(key => teamsData[key]);

  return (
    <div className="dash-v2">
      <Head>
        <title>Setup - Mock Auction | Cricket Decoded</title>
      </Head>

      <Navbar />

      <div className="dash-inner" style={{ paddingTop: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: '100px' }}>
        
        {loading ? (
            <div style={{marginTop: '100px', fontSize: '1.2rem', color: '#64748b'}}>Syncing your preferences...</div>
        ) : phase === 'FRANCHISE' ? (
          <>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <span className="dash-badge" style={{background: 'var(--black)', color: 'var(--white)'}}>Step 1 of 2</span>
              <h1 style={{ fontSize: '3rem', fontFamily: "'Playfair Display', serif", fontWeight: 900, marginTop: '15px', color: 'var(--black)' }}>
                Pick Your <em style={{ color: 'var(--emerald)' }}>Franchise.</em>
              </h1>
              <p style={{ color: 'var(--slate-500)', marginTop: '10px', fontSize: '1.1rem' }}>
                All teams start with a pristine wallet of <strong>₹120 Crores</strong> before retentions.
              </p>
            </div>

            <div className="team-grid">
              {teams.map((team, idx) => (
                <div 
                  key={idx} 
                  className="franchise-card"
                  onClick={() => startRetentionPhase(team.name)}
                  style={{ '--team-color': team.color }}
                >
                  <div className="fc-bg" style={{ background: `linear-gradient(135deg, ${team.color}15, transparent)` }}></div>
                  <div className="fc-logo-box" style={{ background: team.color }}>
                     <img 
                       src={`/teams/${team.name.toLowerCase()}.png`} 
                       alt={team.name} 
                       style={{ width: '50px', height: '50px', objectFit: 'contain', filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.2))' }} 
                     />
                  </div>
                  <h3 style={{color: 'var(--black)', fontSize: '1.4rem'}}>{team.name}</h3>
                  <p style={{color: 'var(--slate-500)'}}>Budget: ₹120 Cr</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div style={{width: '100%', maxWidth: '1000px'}}>
             <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <span className="dash-badge" style={{background: 'var(--black)', color: 'var(--white)'}}>Step 2 of 2</span>
              <h1 style={{ fontSize: '3rem', fontFamily: "'Playfair Display', serif", fontWeight: 900, marginTop: '15px', color: 'var(--black)' }}>
                Retention <em style={{ color: 'var(--emerald)' }}>Phase.</em>
              </h1>
              <p style={{ color: 'var(--slate-500)', marginTop: '10px', fontSize: '1.1rem' }}>
                Select up to 6 core players to retain for <strong>{selectedTeam}</strong>. Unused retention slots become RTM cards.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '30px' }}>
               <div className="retention-pool">
                  <h3 style={{fontSize: '1.5rem', color: 'var(--black)', marginBottom: '20px'}}>Available 2024 Core Squad</h3>
                  <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px'}}>
                     {(preRetentions[selectedTeam] || []).map((player, i) => {
                       const isSelected = userRetentions.some(p => p.name === player.name);
                       return (
                         <div 
                           key={i} 
                           onClick={() => toggleRetention(player)}
                           className={`retention-card ${isSelected ? 'selected' : ''}`}
                         >
                            <img src={player.imageUrl} alt={player.name} className="rc-img" />
                            <div className="rc-info">
                               <div className="rc-name">{player.name}</div>
                               <div className="rc-role">{player.role}</div>
                            </div>
                            {isSelected && <div className="rc-tick">✓</div>}
                         </div>
                       )
                     })}
                  </div>
               </div>

               <div className="retention-summary glass-panel" style={{background: '#fff', border: '1px solid #e2e8f0', padding: '30px', borderRadius: '20px', alignSelf: 'start', position: 'sticky', top: '100px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)'}}>
                  <div style={{textAlign: 'center', marginBottom: '20px'}}>
                     <img src={`/teams/${selectedTeam.toLowerCase()}.png`} style={{width: '60px', height: '60px'}} />
                     <h2 style={{color: 'var(--black)', marginTop: '10px'}}>{selectedTeam} Purse</h2>
                  </div>
                  
                  <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '1.1rem'}}>
                     <span style={{color: 'var(--slate-500)'}}>Initial Budget:</span>
                     <span style={{fontWeight: 700, color: 'var(--black)'}}>₹ 120.00 Cr</span>
                  </div>
                  <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #e2e8f0', fontSize: '1.1rem'}}>
                     <span style={{color: 'var(--red)'}}>Retentions (-):</span>
                     <span style={{fontWeight: 700, color: 'var(--red)'}}>₹ {calculateDeduction().toFixed(2)} Cr</span>
                  </div>
                  <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '30px', fontSize: '1.4rem'}}>
                     <span style={{color: 'var(--black)', fontWeight: 800}}>Final Purse:</span>
                     <span style={{fontWeight: 900, color: 'var(--emerald)'}}>₹ {(120 - calculateDeduction()).toFixed(2)} Cr</span>
                  </div>

                  <div style={{marginBottom: '30px'}}>
                     <h4 style={{color: 'var(--slate-500)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px'}}>Retained ({userRetentions.length}/6)</h4>
                     {userRetentions.length === 0 ? (
                        <p style={{color: 'var(--slate-400)', fontSize: '0.9rem', fontStyle: 'italic'}}>No players retained yet.</p>
                     ) : (
                        <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
                           {userRetentions.map((p, i) => (
                             <li key={i} style={{display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9', color: 'var(--black)', fontWeight: 600}}>
                               <span>{p.name}</span>
                               <span style={{color: 'var(--slate-500)'}}>-₹{RETENTION_SLABS[i] || 4} Cr</span>
                             </li>
                           ))}
                        </ul>
                     )}
                  </div>

                  <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '30px', padding: '15px', background: '#f8fafc', borderRadius: '10px'}}>
                     <span style={{color: 'var(--slate-600)', fontWeight: 600}}>RTM Cards Available:</span>
                     <span style={{fontWeight: 900, color: 'var(--black)'}}>{6 - userRetentions.length}</span>
                  </div>

                  <button onClick={finalizeSetupAndStart} className="btn-primary" style={{width: '100%', padding: '15px', fontSize: '1.1rem', borderRadius: '12px'}}>
                     Enter Auction Room 🔨
                  </button>
                  <button onClick={() => setPhase('FRANCHISE')} className="btn-ghost" style={{width: '100%', marginTop: '10px', color: 'var(--slate-500)'}}>
                     ← Back to Teams
                  </button>
               </div>
            </div>
          </div>
        )}

      </div>

      <style jsx>{`
        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 20px;
          width: 100%;
          max-width: 1200px;
        }
        .franchise-card {
           background: #fff;
           border: 1.5px solid #e2e8f0;
           border-radius: 20px;
           padding: 30px;
           text-align: center;
           position: relative;
           overflow: hidden;
           cursor: pointer;
           transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .franchise-card:hover {
           transform: translateY(-5px);
           border-color: var(--team-color);
           box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
        }
        .fc-bg {
           position: absolute;
           top: 0; left: 0; right: 0; bottom: 0;
           z-index: 0;
           pointer-events: none;
        }
        .fc-logo-box {
           width: 80px; height: 80px;
           margin: 0 auto 20px;
           border-radius: 50%;
           display: flex; align-items: center; justify-content: center;
           position: relative; z-index: 1;
           box-shadow: 0 8px 20px rgba(0,0,0,0.15);
           border: 4px solid #fff;
        }

        /* RETENTION UI */
        .retention-card {
           background: #fff;
           border: 1.5px solid #e2e8f0;
           border-radius: 16px;
           padding: 15px;
           display: flex; align-items: center; gap: 15px;
           cursor: pointer;
           transition: all 0.2s;
           position: relative;
        }
        .retention-card:hover { border-color: var(--emerald); background: #f0fdf4; }
        .retention-card.selected {
           border-color: var(--emerald);
           background: #ecfdf5;
           box-shadow: 0 10px 20px rgba(16,185,129,0.1);
        }
        .rc-img {
           width: 50px; height: 50px; border-radius: 10px; background: #cbd5e1; object-fit: cover;
        }
        .rc-info { flex: 1; }
        .rc-name { font-weight: 700; color: var(--black); font-size: 1.05rem; }
        .rc-role { font-size: 0.85rem; color: var(--slate-500); }
        .rc-tick {
           position: absolute; top: -10px; right: -10px; width: 24px; height: 24px;
           background: var(--emerald); color: #fff; border-radius: 50%;
           display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 900;
           border: 2px solid #fff;
        }

        @media (max-width: 900px) {
           .dash-inner > div { grid-template-columns: 1fr !important; }
           .retention-summary { position: relative !important; top: 0 !important; order: -1; }
        }
      `}</style>
    </div>
  );
}
