import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import html2canvas from 'html2canvas';

export default function AuctionSummary() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [grade, setGrade] = useState({ score: 0, label: 'B', color: '#64748b' });
  const exportRef = useRef(null);

  useEffect(() => {
    const raw = localStorage.getItem('auction_summary_payload');
    if (!raw) {
      router.push('/mockauction');
      return;
    }
    const parsed = JSON.parse(raw);
    setData(parsed);
    calculateGrade(parsed.userSquad, parsed.userPurse);
  }, []);

  const calculateGrade = (squad, remaining) => {
    let s = 0;
    const batters = squad.filter(p => p.role.includes('Batter')).length;
    const bowlers = squad.filter(p => p.role.includes('Bowler')).length;
    const wks = squad.filter(p => p.role.includes('Wicket')).length;
    const allrounders = squad.filter(p => p.role.includes('All')).length;
    const marquee = squad.filter(p => p.set === 1).length;

    if (batters + allrounders >= 7) s += 25;
    if (bowlers + allrounders >= 6) s += 25;
    if (wks >= 1) s += 15;
    
    // Purse Efficiency (Spent more than 100 Cr out of 120 Cr)
    const spent = 120 - remaining;
    if (spent > 100) s += 15;
    else s += (spent / 100) * 15;

    // Star Power
    if (marquee >= 2) s += 20;
    else if (marquee === 1) s += 10;

    let label = 'C';
    let color = '#ef4444';
    if (s >= 90) { label = 'S'; color = '#f59e0b'; }
    else if (s >= 80) { label = 'A+'; color = '#10b981'; }
    else if (s >= 70) { label = 'A'; color = '#10b981'; }
    else if (s >= 50) { label = 'B'; color = '#3b82f6'; }

    setGrade({ score: Math.round(s), label, color });
  };

  const handleDownload = async () => {
     if (!exportRef.current) return;
     const canvas = await html2canvas(exportRef.current, {
        backgroundColor: '#0f172a',
        scale: 2
     });
     const link = document.createElement('a');
     link.download = `my-ipl-squad-${data.userTeam}.png`;
     link.href = canvas.toDataURL('image/png');
     link.click();
  };

  if (!data) return null;

  const groupedSquad = {
     'Batters': data.userSquad.filter(p => p.role.includes('Batter')),
     'Wicket Keepers': data.userSquad.filter(p => p.role.includes('Wicket')),
     'All Rounders': data.userSquad.filter(p => p.role.includes('All')),
     'Bowlers': data.userSquad.filter(p => p.role.includes('Bowler'))
  };

  return (
    <div className="summary-page" style={{background: '#020617', minHeight: '100vh', color: 'white', fontFamily: "'DM Sans', sans-serif"}}>
      <Head><title>Squad Summary | Cricket Decoded</title></Head>
      <Navbar />

      <div className="container" style={{maxWidth: '1100px', margin: '0 auto', paddingTop: '120px', paddingBottom: '100px', paddingLeft: '20px', paddingRight: '20px'}}>
        
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px'}}>
           <div>
              <h1 style={{fontSize: '3rem', fontWeight: 900, fontFamily: "'Playfair Display', serif", marginBottom: '10px'}}>Auction <span style={{color: '#10b981'}}>Complete.</span></h1>
              <p style={{color: '#94a3b8', fontSize: '1.2rem'}}>Behold your dream squad for the 2026 IPL Season.</p>
           </div>
           <div style={{display: 'flex', gap: '15px'}}>
              <button onClick={handleDownload} className="btn-secondary" style={{padding: '12px 24px', border: '1px solid #10b981', color: '#10b981', background: 'transparent', borderRadius: '12px', fontWeight: 800, cursor: 'pointer'}}>Download Squad Image</button>
              <button onClick={() => router.push('/mockauction')} className="btn-primary" style={{padding: '12px 24px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 800, cursor: 'pointer'}}>Play Again</button>
           </div>
        </div>

        <div ref={exportRef} className="squad-poster" style={{background: 'linear-gradient(135deg, #0f172a 0%, #020617 100%)', borderRadius: '32px', padding: '50px', border: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden'}}>
            
            {/* GRADIENT BLOBS */}
            <div style={{position:'absolute', top:'-100px', right:'-100px', width:'300px', height:'300px', background:'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)'}}></div>
            <div style={{position:'absolute', bottom:'-100px', left:'-100px', width:'300px', height:'300px', background:'radial-gradient(circle, rgba(245,158,11,0.05) 0%, transparent 70%)'}}></div>

            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '50px', position: 'relative', zIndex: 2}}>
               <div style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
                  <img src={`/teams/${data.userTeam.toLowerCase()}.png`} style={{width: '80px', height: '80px', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))'}} />
                  <div>
                     <h2 style={{fontSize: '2rem', fontWeight: 900, marginBottom: '5px'}}>{data.userTeam}</h2>
                     <div style={{color: '#10b981', fontWeight: 800, letterSpacing: '2px', fontSize: '0.9rem'}}>IPL 2026 SQUAD</div>
                  </div>
               </div>
               
               <div style={{textAlign: 'right'}}>
                  <div style={{fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '5px'}}>Team Strength</div>
                  <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                     <div style={{fontSize: '3.5rem', fontWeight: 900, color: grade.color}}>{grade.label}</div>
                     <div style={{height: '40px', width: '2px', background: 'rgba(255,255,255,0.1)'}}></div>
                     <div style={{textAlign: 'left'}}>
                        <div style={{fontSize: '1.2rem', fontWeight: 800}}>{grade.score}/100</div>
                        <div style={{fontSize: '0.7rem', color: '#64748b'}}>Balance Rating</div>
                     </div>
                  </div>
               </div>
            </div>

            <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '40px', position: 'relative', zIndex: 2}}>
                {Object.entries(groupedSquad).map(([role, players]) => (
                   <div key={role}>
                      <h3 style={{fontSize: '0.9rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '10px'}}>{role} ({players.length})</h3>
                      <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                         {players.length === 0 ? (
                            <div style={{fontSize: '0.8rem', color: '#475569', fontStyle: 'italic'}}>None selected</div>
                         ) : (
                            players.map((p, i) => (
                               <div key={i} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.03)'}}>
                                  <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                                     <div style={{width: '30px', height: '30px', borderRadius: '50%', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 900, color: '#10b981', border: '1px solid rgba(16,185,129,0.3)'}}>{i+1}</div>
                                     <div style={{fontWeight: 700, fontSize: '0.95rem'}}>{p.name}</div>
                                  </div>
                                  <div style={{fontWeight: 900, color: '#f59e0b', fontSize: '0.9rem'}}>₹{p.price} Cr</div>
                               </div>
                            ))
                         )}
                      </div>
                   </div>
                ))}
            </div>

            <div style={{marginTop: '50px', pt: '30px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 2}}>
                <div style={{display: 'flex', gap: '40px'}}>
                   <div>
                      <div style={{fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', mb: '5px'}}>Total Spent</div>
                      <div style={{fontSize: '1.4rem', fontWeight: 900, color: '#fff'}}>₹{(120 - data.userPurse).toFixed(2)} Cr</div>
                   </div>
                   <div>
                      <div style={{fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', mb: '5px'}}>Remaining</div>
                      <div style={{fontSize: '1.4rem', fontWeight: 900, color: '#f59e0b'}}>₹{data.userPurse.toFixed(2)} Cr</div>
                   </div>
                </div>
                <div style={{textAlign: 'right'}}>
                   <div style={{fontSize: '1.2rem', fontWeight: 900, fontStyle: 'italic', color: '#10b981'}}>Cricket<span style={{color: '#fff'}}>Decoded</span></div>
                   <div style={{fontSize: '0.7rem', color: '#64748b'}}>CricketDecoded.com/mockauction</div>
                </div>
            </div>

        </div>

      </div>

      <style jsx>{`
        .btn-secondary:hover { background: rgba(16,185,129,0.05) !important; transform: translateY(-2px); }
        .btn-primary:hover { filter: brightness(1.1); transform: translateY(-2px); }
        .squad-poster { transition: transform 0.3s; }
      `}</style>
    </div>
  );
}
