import React, { useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import AdComponent from '../components/AdComponent';

export default function AboutPage() {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), 80);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.observe').forEach(el => obs.observe(el));

    document.querySelectorAll('.bento-card').forEach((el, i) => {
      el.style.transitionDelay = (i % 4) * 0.08 + 's';
    });

    return () => obs.disconnect();
  }, []);

  return (
    <>
      <Head>
        <title>About Us | Cricket Decoded</title>
      </Head>

      <Navbar />

      <main>
        {/* HERO SECTION (Exactly like Home Page) */}
        <section className="hero">
          <div className="hero-content">
            <div className="live-pill">
              <span className="live-dot" style={{background: 'var(--emerald)'}}></span> 
              THE LR COMPANY
            </div>

            <h1 className="hero-title" style={{fontSize: "clamp(3.5rem, 6vw, 5rem)"}}>
              About.<br />
              <em>CricketDecoded.</em>
            </h1>

            <p className="hero-sub" style={{ marginBottom: "1rem" }}>
              Welcome to <strong>CricketDecoded</strong>, your ultimate destination for cricket match predictions, in-depth analysis, and real-time insights.
            </p>
            <p className="hero-sub" style={{ marginBottom: "2rem" }}>
              We combine data-driven strategies, team analysis, pitch conditions, and player performance to provide accurate and reliable match predictions.
            </p>
          </div>

          <div className="hero-visual">
            <img src="/lrimg.png" className="hero-main-img" alt="Lakshit Raina" />
          </div>
        </section>

        {/* CONTENT SECTION (Light Mode like Home Page) */}
        <section className="features-section" style={{ padding: "5rem 2rem", background: "#f8fafc" }}>
          <div className="section-header">
            <span className="section-tag">Value Proposition</span>
            <h2>We Focus On <br/><em>Delivering.</em></h2>
            <p style={{marginTop: '1rem', color: 'var(--slate-500)', fontSize: '1.1rem', maxWidth: '600px', margin: '1rem auto 0'}}>Our goal is to create a fast, user-friendly, and information-rich platform that helps users stay ahead in every game.</p>
          </div>

          <div className="features-grid" style={{maxWidth: '1200px', margin: '0 auto'}}>
            <div className="bento-card observe">
              <div className="bento-icon">🎯</div>
              <h3>Match Predictions & Win Probability</h3>
              <p>Get data-driven insights and AI-powered win probabilities before every match starts.</p>
            </div>
            
            <div className="bento-card observe">
              <div className="bento-icon">🪙</div>
              <h3>Toss & Pitch Analysis</h3>
              <p>Understand the ground conditions, average scores, and how the toss impacts the game.</p>
            </div>
            
            <div className="bento-card observe">
              <div className="bento-icon">🏏</div>
              <h3>Team Insights & Key Player Stats</h3>
              <p>Deep dive into head-to-head records, player forms, and historical team performance.</p>
            </div>
            
            <div className="bento-card observe">
              <div className="bento-icon">📰</div>
              <h3>Latest Cricket News & Updates</h3>
              <p>Stay informed with the newest updates and breaking stories from the cricket universe.</p>
            </div>
          </div>
        </section>

        <section style={{ padding: "5rem 2rem", background: "var(--white)" }}>
           <div className="features-grid" style={{ maxWidth: '1200px', margin: '0 auto', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))' }}>
              <div className="bento-card observe" style={{ background: '#f8fafc', border: '1px solid rgba(16,185,129,0.1)' }}>
                  <h3 style={{ fontSize: '1.8rem', color: 'var(--black)', marginBottom: '1rem' }}>Our Vision</h3>
                  <p style={{ color: 'var(--slate-500)', fontSize: '1.1rem', lineHeight: '1.8' }}>
                      To build one of the most trusted cricket analytics platforms that delivers consistent insights, accurate predictions, and engaging content for fans worldwide.
                  </p>
              </div>

              <div className="bento-card observe" style={{ background: '#f8fafc', border: '1px solid rgba(16,185,129,0.1)' }}>
                  <h3 style={{ fontSize: '1.8rem', color: 'var(--black)', marginBottom: '1rem' }}>Legal & Ownership</h3>
                  <p style={{ color: 'var(--slate-500)', fontSize: '1.1rem', lineHeight: '1.8' }}>
                      CricketDecoded operates under <strong>THE LR COMPANY</strong>.
                  </p>
                  <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.8rem', borderBottom: '1px solid #e2e8f0' }}>
                          <span style={{ color: 'var(--slate-500)', fontWeight: 600 }}>Owner</span>
                          <span style={{ color: 'var(--black)', fontWeight: 700 }}>Lakshit Raina</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.8rem' }}>
                          <span style={{ color: 'var(--slate-500)', fontWeight: 600 }}>Contact Email</span>
                          <a href="mailto:zykto.official@gmail.com" style={{ color: 'var(--emerald)', fontWeight: 700, textDecoration: 'none' }}>zykto.official@gmail.com</a>
                      </div>
                  </div>
              </div>
           </div>
           
           <div className="bento-card observe" style={{ maxWidth: '1200px', margin: '3rem auto 0', background: '#fff1f2', border: '1px solid #ffe4e6', textAlign: 'center' }}>
               <h4 style={{ color: '#e11d48', fontSize: '1.2rem', marginBottom: '1rem' }}>Disclaimer</h4>
               <p style={{ color: '#475569', fontSize: '1rem', lineHeight: '1.6', maxWidth: '800px', margin: '0 auto' }}>
                   This website provides cricket predictions and analysis for informational and entertainment purposes only. We are not affiliated with any official cricket league, team, or organization.
               </p>
           </div>
           
           <div style={{ maxWidth: '1200px', margin: '4rem auto 0', textAlign: 'center' }}>
               <AdComponent slotId="about-bottom" />
           </div>
        </section>

      </main>

      <footer style={{ background: 'var(--black)', color: 'var(--white)', padding: '4rem 2rem', textAlign: 'center' }}>
        <p style={{ color: 'var(--slate-400)' }}>&copy; 2026 Cricket Decoded. All rights reserved.</p>
      </footer>
    </>
  );
}
