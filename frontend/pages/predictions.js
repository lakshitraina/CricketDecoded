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
        <div style={{textAlign: "center", width: "100%", maxWidth: "1200px", position: "relative", zIndex: 10, marginBottom: "0.5rem"}}>
          <h1 className="hero-title observe" style={{fontSize: "clamp(3rem, 6vw, 5rem)", marginBottom: "1rem"}}>
            Match <em>Predictions</em>
          </h1>
        </div>

        <div className="pred-inner" style={{width: "100%", maxWidth: "1200px", zIndex: 10}}>
          <AdComponent adKey="d60542bb90219e73c31c84525bd1da05" height={60} width={468} />
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
      </section>
    </>
  );
}
