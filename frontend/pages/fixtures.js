import React from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import { fixturesData } from '../data/fixtures';

export default function FixturesPage() {
  return (
    <div className="dash-layout">
      <Head>
        <title>IPL 2026 Full Fixtures | Cricket Decoded</title>
      </Head>

      <Navbar />

      <div className="dash-inner">
        <div style={{textAlign: 'center', marginBottom: '4rem'}}>
          <span className="section-tag">📅 Tournament Schedule</span>
          <h1 className="hero-title">Full <em>Fixtures.</em></h1>
        </div>

        <div className="fixture-list">
          {fixturesData.map((fixture) => (
            <div key={fixture.id} className="fixture-item observe visible">
              <div className="fixture-team-a">
                <img src={fixture.logoA} className="fix-team-logo" alt={fixture.teamA} />
                <span className="fix-name">{fixture.teamA}</span>
              </div>
              <div className="fix-center">
                <span className="fix-date" style={{fontWeight: 800, color: '#10b981'}}>{fixture.date}</span>
                <span className="fix-venue" style={{fontSize: '0.85rem', color: '#64748b', display: 'block', marginTop: '0.2rem'}}>📍 {fixture.venue}</span>
              </div>
              <div className="fixture-team-b">
                <span className="fix-name">{fixture.teamB}</span>
                <img src={fixture.logoB} className="fix-team-logo" alt={fixture.teamB} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
