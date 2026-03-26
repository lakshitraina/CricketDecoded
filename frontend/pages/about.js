import React from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import AdComponent from '../components/AdComponent';

export default function AboutPage() {
  return (
    <div className="dash-layout">
      <Head>
        <title>About Us | Cricket Decoded</title>
      </Head>

      <Navbar />

      <div className="dash-inner">
        {/* HERO SECTION FOR ABOUT */}
        <section className="hero" style={{minHeight: "auto", padding: "4rem 2rem 2rem", position: "relative", overflow: "hidden"}}>
            <div className="hero-content" style={{maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4rem'}}>
                <div style={{flex: '1 1 500px', zIndex: 10, textAlign: 'left'}}>
                    <div className="live-badge" style={{marginBottom: "1.5rem", display: "inline-flex"}}>
                        <span className="live-dot"></span> THE LR COMPANY
                    </div>
                    
                    <h1 className="hero-title" style={{fontSize: "clamp(3rem, 6vw, 4.5rem)", marginBottom: "1rem", textAlign: "left" }}>
                        About <br/>
                        <em>CricketDecoded.</em>
                    </h1>
                    <p className="hero-sub" style={{maxWidth: '600px', fontSize: '1.1rem', lineHeight: '1.6', textAlign: 'left', marginLeft: 0}}>
                        Welcome to <strong>CricketDecoded</strong>, your ultimate destination for cricket match predictions, in-depth analysis, and real-time insights.
                    </p>
                </div>
                
                <div style={{flex: '1 1 400px', display: 'flex', justifyContent: 'center', position: 'relative'}}>
                    <div style={{
                        position: 'absolute',
                        width: '350px',
                        height: '350px',
                        background: 'radial-gradient(circle, rgba(16,185,129,0.2) 0%, rgba(16,185,129,0) 70%)',
                        zIndex: 0,
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        filter: 'blur(40px)'
                    }}></div>
                    <img src="/lrimg.png" alt="Lakshit Raina" style={{maxWidth: '100%', height: 'auto', maxHeight: '450px', zIndex: 1, position: 'relative', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))', objectFit: 'contain'}} />
                </div>
            </div>
        </section>

        {/* CONTENT SECION WITH BENTO CARDS */}
        <section style={{maxWidth: '1000px', margin: '0 auto', padding: '2rem'}}>
            <div className="glass-panel" style={{padding: '3rem', marginBottom: '2rem'}}>
                <h2 style={{fontSize: '2rem', marginBottom: '1.5rem', color: '#10b981'}}>Our Mission</h2>
                <p style={{lineHeight: '1.8', fontSize: '1.1rem', color: '#cbd5e1', marginBottom: '1.5rem'}}>
                    At CricketDecoded, we combine data-driven strategies, team analysis, pitch conditions, and player performance to provide accurate and reliable match predictions. Our platform is designed for cricket enthusiasts who want quick insights, winning probabilities, and expert-level breakdowns before every match.
                </p>
                
                <h3 style={{fontSize: '1.4rem', marginBottom: '1rem', color: 'white'}}>We focus on delivering:</h3>
                <ul style={{listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem'}}>
                    <li style={{background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '0.5rem', border: '1px solid rgba(255,255,255,0.1)'}}>🎯 Match Predictions & Win Probability</li>
                    <li style={{background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '0.5rem', border: '1px solid rgba(255,255,255,0.1)'}}>🪙 Toss & Pitch Analysis</li>
                    <li style={{background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '0.5rem', border: '1px solid rgba(255,255,255,0.1)'}}>🏏 Team Insights & Key Player Stats</li>
                    <li style={{background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '0.5rem', border: '1px solid rgba(255,255,255,0.1)'}}>📰 Latest Cricket News & Updates</li>
                </ul>
                <p style={{lineHeight: '1.8', fontSize: '1.1rem', color: '#cbd5e1', marginTop: '1.5rem'}}>
                    Our goal is to create a fast, user-friendly, and information-rich platform that helps users stay ahead in every game.
                </p>
            </div>

            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem'}}>
                <div className="glass-panel" style={{padding: '2rem'}}>
                    <h3 style={{fontSize: '1.5rem', marginBottom: '1rem', color: '#3b82f6'}}>Our Vision</h3>
                    <p style={{color: '#94a3b8', lineHeight: '1.7'}}>To build one of the most trusted cricket analytics platforms that delivers consistent insights, accurate predictions, and engaging content for fans worldwide.</p>
                </div>
                <div className="glass-panel" style={{padding: '2rem'}}>
                    <h3 style={{fontSize: '1.5rem', marginBottom: '1rem', color: '#8b5cf6'}}>Legal & Ownership</h3>
                    <p style={{color: '#f8fafc', fontWeight: 800, fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '0.5rem'}}>CricketDecoded operates under THE LR COMPANY.</p>
                    <p style={{color: '#94a3b8', lineHeight: '1.7'}}><strong>Owner:</strong> Lakshit Raina<br/><strong>Contact:</strong> <a href="mailto:zykto.official@gmail.com" style={{color: '#10b981', textDecoration: 'none'}}>zykto.official@gmail.com</a></p>
                </div>
            </div>

            <div style={{textAlign: 'center', padding: '2rem', background: 'rgba(0,0,0,0.3)', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.05)'}}>
                <h4 style={{color: '#64748b', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem', marginBottom: '1rem'}}>Disclaimer</h4>
                <p style={{color: '#64748b', fontSize: '0.9rem', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6'}}>
                    This website provides cricket predictions and analysis for informational and entertainment purposes only. We are not affiliated with any official cricket league, team, or organization.
                </p>
            </div>
            
            <div style={{marginTop: '4rem', textAlign: 'center'}}>
               <AdComponent adKey="481bb8d376b950fb640f010f57eccd74" type="native" />
            </div>
        </section>
      </div>

      <footer style={{padding: '4rem 2rem', background: '#0a0a0f', color: '#94a3b8', textAlign: 'center', marginTop: 'auto'}}>
        <p>&copy; 2026 Cricket Decoded. All rights reserved.</p>
      </footer>
    </div>
  );
}
