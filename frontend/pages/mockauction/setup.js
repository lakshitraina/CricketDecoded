import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import { teamsData } from '../../data/teams';

export default function AuctionSetup() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleTeamSelect = async (teamName) => {
    if (loading) return;
    setLoading(true);
    
    const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    try {
      const res = await fetch(`${API_BASE}/api/auction/init`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userTeam: teamName })
      });
      const data = await res.json();
      
      if (data.sessionId) {
        localStorage.setItem('auctionSession', data.sessionId);
        router.push(`/mockauction/play?session=${data.sessionId}`);
      } else {
        alert('Failed to start auction. Please try again.');
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      alert('Network Error connecting to Simulator API.');
      setLoading(false);
    }
  };

  const teams = Object.keys(teamsData).map(key => teamsData[key]);

  return (
    <div className="dash-v2">
      <Head>
        <title>Select Franchise - Mock Auction | Cricket Decoded</title>
      </Head>

      <Navbar />

      <div className="dash-inner" style={{ paddingTop: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="dash-badge">Step 1 of 2</span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginTop: '15px' }}>Pick Your <span style={{ color: 'var(--accent-green)', fontStyle: 'italic' }}>Franchise.</span></h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '10px' }}>
            You will be allocated a starting purse of <strong>₹100 Crores</strong>. 
            Choose the team you want to represent at the mega auction table.
          </p>
        </div>

        <div className="team-grid">
          {teams.map((team, idx) => (
            <div 
              key={idx} 
              className="franchise-card"
              onClick={() => handleTeamSelect(team.name)}
              style={{ '--team-color': team.color }}
            >
              <div className="fc-bg" style={{ background: `linear-gradient(135deg, ${team.color}22, ${team.color}00)` }}></div>
              <div className="fc-logo-box" style={{ background: team.color }}>
                 <img 
                   src={`/teams/${team.name.toLowerCase()}.png`} 
                   alt={team.name} 
                   style={{ width: '50px', height: '50px', objectFit: 'contain', filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.2))' }} 
                   onError={(e) => {
                     e.target.style.display = 'none';
                     e.target.nextSibling.style.display = 'block';
                   }}
                 />
                 <span style={{ fontSize: '1.5rem', fontWeight: 900, color: '#fff', display: 'none' }}>{team.name}</span>
              </div>
              <h3>{team.name}</h3>
              <p>Budget: ₹100.0 Cr</p>
              <button className="fc-btn" disabled={loading}>
                {loading ? 'Starting...' : 'Select Team'}
              </button>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
          width: 100%;
          max-width: 1200px;
          margin-bottom: 60px;
        }
        .franchise-card {
           background: rgba(255, 255, 255, 0.03);
           border: 1px solid rgba(255, 255, 255, 0.05);
           border-radius: 16px;
           padding: 24px;
           text-align: center;
           position: relative;
           overflow: hidden;
           cursor: pointer;
           transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .franchise-card:hover {
           transform: translateY(-5px);
           border-color: var(--team-color);
           box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
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
           border-radius: 20px;
           display: flex; align-items: center; justify-content: center;
           position: relative; z-index: 1;
           box-shadow: 0 8px 20px rgba(0,0,0,0.2);
        }
        .franchise-card h3 {
           font-size: 1.2rem; margin-bottom: 5px; position: relative; z-index: 1;
        }
        .franchise-card p {
           font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 20px; position: relative; z-index: 1;
        }
        .fc-btn {
           width: 100%;
           padding: 12px;
           background: rgba(255, 255, 255, 0.05);
           color: #fff;
           border: 1px solid rgba(255, 255, 255, 0.1);
           border-radius: 8px;
           font-weight: 700;
           cursor: pointer;
           position: relative; z-index: 1;
           transition: background 0.2s;
        }
        .franchise-card:hover .fc-btn {
           background: var(--team-color);
           border-color: var(--team-color);
        }
      `}</style>
    </div>
  );
}
