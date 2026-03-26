import React from 'react';
import Link from 'next/link';

export default function MatchCard({ match }) {
  const { team1, team2, date, time, venue, slug, winProbability } = match;

  return (
    <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', transition: 'transform 0.3s ease', cursor: 'pointer' }}
         onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
         onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px', color: 'var(--text-secondary)' }}>
        <span>{date} • {time}</span>
        <span style={{ background: 'rgba(255,255,255,0.05)', padding: '4px 8px', borderRadius: '4px' }}>T20</span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{team1}</h3>
        <span style={{ color: 'var(--text-secondary)', fontSize: '14px', fontWeight: '600' }}>VS</span>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{team2}</h3>
      </div>

      <p style={{ fontSize: '14px', color: 'var(--text-secondary)', textAlign: 'center' }}>📍 {venue}</p>

      {/* Win Probability Bar */}
      <div style={{ width: '100%', height: '8px', borderRadius: '4px', overflow: 'hidden', display: 'flex', marginTop: '12px' }}>
         <div style={{ width: `${winProbability.team1}%`, backgroundColor: 'var(--accent-green)' }} title={`${team1}: ${winProbability.team1}%`}></div>
         <div style={{ width: `${winProbability.team2}%`, backgroundColor: '#e2e8f0' }} title={`${team2}: ${winProbability.team2}%`}></div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginTop: '4px', color: 'var(--text-secondary)' }}>
        <span>{team1} {winProbability.team1}%</span>
        <span>{team2} {winProbability.team2}%</span>
      </div>

      <Link href={`/${slug}`} legacyBehavior>
        <a className="btn-primary" style={{ width: '100%', marginTop: '16px' }}>View Detailed Analysis</a>
      </Link>
    </div>
  );
}
