import React from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import { fixturesData } from '../data/fixtures';

export default function FixturesPage() {
  return (
    <div className="dash-layout" style={{background: '#f8fafc', color: '#1e293b', minHeight: '100vh'}}>
      <Head>
        <title>IPL 2026 Full Fixtures | Cricket Decoded</title>
      </Head>

      <Navbar />

      <main className="dash-inner" style={{paddingTop: '85px', maxWidth: '1400px', margin: '0 auto', position: 'relative'}}>
        
        {/* TOP BANNER AD */}
        <div style={{display: 'flex', justifyContent: 'center', marginBottom: '2rem'}}>
           <iframe src="//www.highperformanceformat.com/watchnew?key=049ed5c6c01b883957767c887fde882d" width="728" height="90" frameBorder="0" scrolling="no" title="ad-top"></iframe>
        </div>

        <div style={{textAlign: 'center', marginBottom: '4rem'}}>
          <span className="section-tag">📅 Tournament Schedule</span>
          <h1 className="hero-title" style={{fontSize: '3.5rem', fontWeight: 950}}>Full <em>Fixtures.</em></h1>
        </div>

        <div className="fixtures-content-wrap" style={{position: 'relative', minHeight: '1000px'}}>
          {/* STACKED STICKY SIDEBARS (3000px) */}
          <div className="sidebar-ad left-sidebar">
             <iframe src="//www.highperformanceformat.com/watchnew?key=aa6201d5fae0926236c836b46e69f60c" width="160" height="600" frameBorder="0" scrolling="no" title="ad-l1"></iframe>
             <div style={{marginTop: '20px'}}></div>
             <iframe src="//www.profitablecpmratenetwork.com/watchnew?key=7aca24a89379703b4856af696dd093ec" width="160" height="600" frameBorder="0" scrolling="no" title="ad-l2"></iframe>
             <div style={{marginTop: '20px'}}></div>
             <iframe src="//www.highperformanceformat.com/watchnew?key=aa6201d5fae0926236c836b46e69f60c" width="160" height="600" frameBorder="0" scrolling="no" title="ad-l3"></iframe>
             <div style={{marginTop: '20px'}}></div>
             <iframe src="//www.profitablecpmratenetwork.com/watchnew?key=7aca24a89379703b4856af696dd093ec" width="160" height="600" frameBorder="0" scrolling="no" title="ad-l4"></iframe>
             <div style={{marginTop: '20px'}}></div>
             <iframe src="//www.highperformanceformat.com/watchnew?key=aa6201d5fae0926236c836b46e69f60c" width="160" height="600" frameBorder="0" scrolling="no" title="ad-l5"></iframe>
          </div>

          <div className="sidebar-ad right-sidebar">
             <iframe src="//www.highperformanceformat.com/watchnew?key=7aca24a89379703b4856af696dd093ec" width="160" height="300" frameBorder="0" scrolling="no" title="ad-r1"></iframe>
             <div style={{marginTop: '20px'}}></div>
             <iframe src="//www.profitablecpmratenetwork.com/watchnew?key=7b63b4b297c7e53c1d003813c9724a13" width="160" height="300" frameBorder="0" scrolling="no" title="ad-r2"></iframe>
             <div style={{marginTop: '20px'}}></div>
             <iframe src="//www.highperformanceformat.com/watchnew?key=049ed5c6c01b883957767c887fde882d" width="160" height="300" frameBorder="0" scrolling="no" title="ad-r3"></iframe>
             <div style={{marginTop: '20px'}}></div>
             <iframe src="//www.profitablecpmratenetwork.com/watchnew?key=d60542bb90219e73c31c84525bd1da05" width="160" height="300" frameBorder="0" scrolling="no" title="ad-r4"></iframe>
             <div style={{marginTop: '20px'}}></div>
             <iframe src="//www.highperformanceformat.com/watchnew?key=7aca24a89379703b4856af696dd093ec" width="160" height="300" frameBorder="0" scrolling="no" title="ad-r5"></iframe>
             <div style={{marginTop: '20px'}}></div>
             <iframe src="//www.profitablecpmratenetwork.com/watchnew?key=7b63b4b297c7e53c1d003813c9724a13" width="160" height="300" frameBorder="0" scrolling="no" title="ad-r6"></iframe>
             <div style={{marginTop: '20px'}}></div>
             <iframe src="//www.highperformanceformat.com/watchnew?key=049ed5c6c01b883957767c887fde882d" width="160" height="300" frameBorder="0" scrolling="no" title="ad-r7"></iframe>
             <div style={{marginTop: '20px'}}></div>
             <iframe src="//www.profitablecpmratenetwork.com/watchnew?key=d60542bb90219e73c31c84525bd1da05" width="160" height="300" frameBorder="0" scrolling="no" title="ad-r8"></iframe>
             <div style={{marginTop: '20px'}}></div>
             <iframe src="//www.highperformanceformat.com/watchnew?key=7aca24a89379703b4856af696dd093ec" width="160" height="300" frameBorder="0" scrolling="no" title="ad-r9"></iframe>
             <div style={{marginTop: '20px'}}></div>
             <iframe src="//www.profitablecpmratenetwork.com/watchnew?key=7b63b4b297c7e53c1d003813c9724a13" width="160" height="300" frameBorder="0" scrolling="no" title="ad-r10"></iframe>
          </div>

          <div className="fixture-list" style={{maxWidth: '900px', margin: '0 auto'}}>
            {fixturesData.map((fixture) => (
              <div key={fixture.id} className="fixture-item observe visible" style={{background: 'white', borderRadius: '1.5rem', padding: '25px', marginBottom: '1.5rem', border: '1px solid #e2e8f0'}}>
                <div className="fixture-team-a">
                  <img src={fixture.logoA} className="fix-team-logo" alt={fixture.teamA} style={{width: '60px', height: '60px'}} />
                  <span className="fix-name" style={{fontWeight: 900, fontSize: '1.2rem'}}>{fixture.teamA}</span>
                </div>
                <div className="fix-center" style={{flexDirection: 'column', gap: '5px'}}>
                  <span className="fix-date" style={{fontWeight: 950, color: '#10b981', fontSize: '1.1rem'}}>{fixture.date}</span>
                  <span className="fix-venue" style={{fontSize: '0.8rem', color: '#64748b', fontWeight: 700}}>📍 {fixture.venue}</span>
                </div>
                <div className="fixture-team-b">
                  <span className="fix-name" style={{fontWeight: 900, fontSize: '1.2rem'}}>{fixture.teamB}</span>
                  <img src={fixture.logoB} className="fix-team-logo" alt={fixture.teamB} style={{width: '60px', height: '60px'}} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM BANNER AD */}
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '4rem', marginBottom: '4rem'}}>
           <iframe src="//www.profitablecpmratenetwork.com/watchnew?key=d60542bb90219e73c31c84525bd1da05" width="468" height="60" frameBorder="0" scrolling="no" title="ad-bottom"></iframe>
        </div>
      </main>

      <style jsx>{`
        .sidebar-ad { position: sticky; top: 110px; width: 160px; z-index: 50; display: flex; flex-direction: column; align-items: center; }
        .left-sidebar { float: left; margin-left: calc(50% - 680px); left: 0; }
        .right-sidebar { float: right; margin-right: calc(50% - 680px); right: 0; }
        @media (max-width: 1360px) { .sidebar-ad { display: none; } }
        
        .section-tag { background: #10b98115; color: #10b981; padding: 6px 16px; border-radius: 100px; font-size: 0.75rem; font-weight: 900; text-transform: uppercase; letter-spacing: 1px; display: inline-block; margin-bottom: 1rem; }
        .hero-title em { color: #10b981; font-style: normal; }
      `}</style>
    </div>
  );
}
