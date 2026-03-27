import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import AdComponent from '../components/AdComponent';
import { fixturesData } from '../data/fixtures';

export default function PredictionsPage() {
  const router = useRouter();

  useEffect(() => {
    // Scroll Reveal Observer
    const obs = new IntersectionObserver(entries => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), 80);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    
    document.querySelectorAll('.observe').forEach((el) => obs.observe(el));
    
    document.querySelectorAll('.pred-card').forEach((el, i) => {
      el.style.transitionDelay = (i % 4) * 0.08 + 's';
    });
    
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <Head>
        <title>Match Predictions | Cricket Decoded</title>
      </Head>
      
      <Navbar />

      <section className="hero" style={{minHeight: "auto", padding: "4rem 2rem 1rem", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", position: "relative"}}>
        
        {/* TOP BANNER AD */}
        <div style={{display: 'flex', justifyContent: 'center', marginBottom: '3rem'}}>
           <iframe src="//www.highperformanceformat.com/watchnew?key=049ed5c6c01b883957767c887fde882d" width="728" height="90" frameBorder="0" scrolling="no" title="ad-top"></iframe>
        </div>

        <div style={{textAlign: "center", width: "100%", maxWidth: "1200px", position: "relative", zIndex: 10, marginBottom: "0.5rem"}}>
          <h1 className="hero-title observe" style={{fontSize: "clamp(3rem, 6vw, 5rem)", marginBottom: "1rem"}}>
            Match <em>Predictions</em>
          </h1>
        </div>

        <div className="pred-content-layout" style={{maxWidth: '1450px', margin: '0 auto', position: 'relative', width: '100%'}}>
          
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

          <div className="pred-inner" style={{flex: 1, maxWidth: '950px', margin: '0 auto'}}>
            <div className="pred-cards" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem'}}>
            {fixturesData.map((fixture) => (
              <div key={fixture.id} className="pred-card observe">
                <div className="pred-card-header">
                  <div className="pred-top-row">
                     <div className="team-meta">
                        <img src={fixture.logoA} alt={fixture.teamA} />
                        <span>{fixture.teamA}</span>
                     </div>
                     <div className="match-badge">
                        <span>MATCH {fixture.id}</span>
                        <small>VS</small>
                     </div>
                     <div className="team-meta reversed">
                        <span>{fixture.teamB}</span>
                        <img src={fixture.logoB} alt={fixture.teamB} />
                     </div>
                  </div>
                  
                  <div className="pred-venue-row">
                    {fixture.venue} • {fixture.date}
                  </div>

                  <div className="pred-factors">
                     {fixture.factors.map((tag, i) => (
                       <span key={i} className="factor-pill">{tag}</span>
                     ))}
                  </div>
                </div>

                <div className="pred-body">
                   <div className="win-labels">
                      <span style={{color: fixture.colorA}}>{fixture.teamA} ({fixture.probA}%)</span>
                      <span style={{color: fixture.colorB}}>{fixture.teamB} ({fixture.probB}%)</span>
                   </div>
                   <div className="win-bar-wrap">
                      <div className="win-bar-fill" style={{width: `${fixture.probA}%`, background: fixture.colorA}}></div>
                      <div className="win-bar-fill" style={{width: `${fixture.probB}%`, background: fixture.colorB}}></div>
                   </div>

                   <div className="tactical-box">
                      <h4>⚡ Tactical Overview</h4>
                      <p>{fixture.insight}</p>
                   </div>
                </div>
                
                <button 
                  onClick={() => router.push('/prediction/' + fixture.id)} 
                  className="btn-detailed"
                >
                  View Detailed Analysis →
                </button>
              </div>
            ))}
          </div>
          
          <div style={{marginTop: '4rem', textAlign: 'center'}}>
             <AdComponent adKey="7b63b4b297c7e53c1d003813c9724a13" height={250} width={300} />
          </div>
         </div>
       </div>
      </section>

      <style jsx>{`
        .sidebar-ad { position: sticky; top: 110px; width: 160px; z-index: 50; display: flex; flex-direction: column; align-items: center; }
        .left-sidebar { float: left; margin-left: calc(50% - 680px); left: 0; }
        .right-sidebar { float: right; margin-right: calc(50% - 680px); right: 0; }
        @media (max-width: 1360px) { .sidebar-ad { display: none; } }
        .hero-title em { color: #10b981; font-style: normal; }
      `}</style>
    </>
  );
}
