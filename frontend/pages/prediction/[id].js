import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import AdComponent from '../../components/AdComponent';
import { fixturesData } from '../../data/fixtures';
import { teamsData } from '../../data/teams';

export default function PredictionDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [filterMode, setFilterMode] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const matchId = parseInt(id) || 1;
  const fixture = fixturesData.find(f => f.id === matchId) || fixturesData[0];
  
  const teamAInfo = teamsData[fixture.teamA];
  const teamBInfo = teamsData[fixture.teamB];

  // Logic from user's template
  const baseToss = (matchId * 13) % 100 > 50 ? 'Chase' : 'Bat 1st';
  const weatherRisk = (matchId * 7) % 30; 
  const projectScore = 150 + ((matchId * 23) % 70);

  const rawSquadA = teamAInfo.players.map(p => ({ ...p, team: teamAInfo.name, color: teamAInfo.color, icon: fixture.logoA }));
  const rawSquadB = teamBInfo.players.map(p => ({ ...p, team: teamBInfo.name, color: teamBInfo.color, icon: fixture.logoB }));
  
  let combinedSquads = [...rawSquadA, ...rawSquadB];
  
  const getFantasyPoints = (name) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash += name.charCodeAt(i);
    return (hash % 70) + 20; 
  };

  combinedSquads = combinedSquads.sort((a,b) => getFantasyPoints(b.name) - getFantasyPoints(a.name));

  if (filterMode !== 'All') {
    combinedSquads = combinedSquads.filter(s => s.role.includes(filterMode));
  }

  if (searchTerm) {
    combinedSquads = combinedSquads.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }

  if (!router.isReady) return null;

  return (
    <div className="dash-v2">
      <Head>
        <title>{fixture.teamA} vs {fixture.teamB} - Analysis | Cricket Decoded</title>
      </Head>

      <Navbar />

      <div className="dash-inner" style={{paddingTop: '8rem'}}>
        <div className="dash-header-v2">
          <div className="dh-left">
            <h1>Match Dashboard: {fixture.teamA} vs {fixture.teamB}</h1>
            <p>Detailed analysis at {fixture.venue} ✨</p>
          </div>
          <div className="dh-right">
             <div className="pill-tag">✨ "{fixture.factors[0]}" 🪙</div>
             <button className="btn-back-v2" onClick={() => router.push('/predictions')}>← Back to List</button>
          </div>
        </div>

        <div className="grid-stats-v2">
           {/* Card 1 */}
           <div className="stat-card-v2">
              <div className="sc-top">
                 <div className="sc-icon">🏛️</div>
                 <span>WIN PROBABILITY</span>
              </div>
              <div className="sc-mid">
                 <label>TEAM {fixture.teamA}</label>
                 <div className="val" style={{color: fixture.colorA}}>{fixture.probA}%</div>
              </div>
           </div>
           
           {/* Card 2 */}
           <div className="stat-card-v2">
              <div className="sc-top">
                 <div className="sc-icon">📈</div>
                 <span>WIN PROBABILITY</span>
              </div>
              <div className="sc-mid">
                 <label>TEAM {fixture.teamB}</label>
                 <div className="val" style={{color: fixture.colorB}}>{fixture.probB}%</div>
              </div>
           </div>

           {/* Card 3 */}
           <div className="stat-card-v2">
              <div className="sc-top">
                 <div className="sc-icon">📊</div>
                 <span>PROJECTED SCORE</span>
              </div>
              <div className="sc-mid">
                 <label>1ST INNINGS TOTAL</label>
                 <div className="val" style={{color: '#ef4444'}}>{projectScore} - {projectScore + 15}</div>
              </div>
           </div>

           {/* Card 4 */}
           <div className="stat-card-v2">
              <div className="sc-top">
                 <div className="sc-icon">🏟️</div>
                 <span>2 INNINGS</span>
              </div>
              <div className="sc-mid">
                 <label>PITCH RATING</label>
                 <div className="val" style={{color: '#3b82f6'}}>Grip / 5.8</div>
              </div>
           </div>

           {/* Card 5 */}
           <div className="stat-card-v2">
              <div className="sc-top">
                 <div className="sc-icon">💳</div>
                 <span>WEATHER RISK</span>
              </div>
              <div className="sc-mid">
                 <label>CHANCE OF RAIN</label>
                 <div className="val" style={{color: '#f59e0b'}}>{weatherRisk}%</div>
              </div>
           </div>

           {/* Card 6 */}
           <div className="stat-card-v2">
              <div className="sc-top">
                 <div className="sc-icon">⏱️</div>
                 <span>EXCELLENT</span>
              </div>
              <div className="sc-mid">
                 <label>TOSS ADVANTAGE</label>
                 <div className="val" style={{color: '#8b5cf6'}}>{baseToss}</div>
              </div>
           </div>
        </div>

        <div className="viz-grid">
           <div className="viz-card">
              <h3>Team Strengths by Category</h3>
              <div className="donut-wrap">
                 <svg viewBox="0 0 36 36" className="donut" style={{width: '100%', height: '100%'}}>
                    <path style={{stroke: '#e2e8f0', strokeWidth: '3.8'}} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" />
                    <path style={{stroke: fixture.colorA, strokeWidth: '3.8', strokeDasharray: '70, 100'}} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" />
                    <path style={{stroke: fixture.colorB, strokeWidth: '3.8', strokeDasharray: '30, 100', strokeDashoffset: '-70'}} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" />
                 </svg>
                 <div className="donut-inner">100%</div>
              </div>
           </div>
           
           <div className="viz-card">
              <h3>Head to Head ({fixture.teamA} vs {fixture.teamB})</h3>
              <div style={{height: '200px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem'}}>
                 <div style={{width: '40px', height: '60%', background: fixture.colorA, borderRadius: '4px 4px 0 0'}}></div>
                 <div style={{width: '40px', height: '40%', background: fixture.colorB, borderRadius: '4px 4px 0 0'}}></div>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-around', marginTop: '1rem', fontSize: '0.8rem', fontWeight: 800}}>
                 <span>{fixture.teamA}</span>
                 <span>{fixture.teamB}</span>
              </div>
           </div>
        </div>

        <div className="dash-list-card" style={{maxWidth: '1100px', margin: '0 auto'}}>
           <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem'}}>
              <h2 style={{fontSize: '1.6rem', fontWeight: 900}}>Fantasy Picks & Squads</h2>
              <div style={{display: 'flex', gap: '1rem', flex: '1', justifyContent: 'flex-end', minWidth: '300px'}}>
                 <input 
                   type="text" 
                   placeholder="Search players..." 
                   className="dash-search"
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                 />
                 <select className="dash-filter" value={filterMode} onChange={(e) => setFilterMode(e.target.value)}>
                    <option value="All">All Roles</option>
                    <option value="Batter">Batters</option>
                    <option value="Bowler">Bowlers</option>
                    <option value="All-Rounder">All-Rounders</option>
                 </select>
              </div>
           </div>

           <div className="player-list-v2">
              {combinedSquads.map((player, idx) => (
                <div key={idx} className="player-row-v2">
                  <div className="pr-left">
                    <div className="pr-logo-box">
                      <img src={player.icon} alt="team" />
                    </div>
                    <div className="pr-info">
                       <div className="pr-name">{player.name.toUpperCase()}</div>
                       <div className="pr-meta">
                          {player.team} • {player.role.toUpperCase()} • 
                          <span className="team-badge" style={{background: player.color + '11', color: player.color}}>
                             {player.team}
                          </span>
                       </div>
                    </div>
                  </div>
                  <div className="pr-points">
                     + {getFantasyPoints(player.name).toFixed(1)} pts
                  </div>
                </div>
              ))}
           </div>
        </div>

        <div style={{marginTop: '3rem'}}>
           <AdComponent adKey="481bb8d376b950fb640f010f57eccd74" type="native" />
        </div>
      </div>

      <style jsx>{`
        .green { color: #10b981; }
        .red { color: #ef4444; }
      `}</style>
    </div>
  );
}
