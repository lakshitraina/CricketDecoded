import React from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Ticker from '../components/Ticker';

export default function RCBSquad2026() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "RCB Squad 2026 – Full Team Players List & Analysis",
    "description": "Full squad list of Royal Challengers Bengaluru for IPL 2026. Players list, captaincy analysis, and salary details.",
    "image": "/rcb_squad_2026_team_poster.png",
    "datePublished": "2026-03-27T18:30:00Z",
    "author": {
      "@type": "Organization",
      "name": "Cricket Decoded"
    }
  };

  const squadData = [
    { name: "Rajat Patidar", role: "Batter (Captain)", price: "Retained", type: "Indian" },
    { name: "Virat Kohli", role: "Batter", price: "Retained", type: "Indian" },
    { name: "Josh Hazlewood", role: "Bowler", price: "₹12.50 Cr", type: "Overseas" },
    { name: "Venkatesh Iyer", role: "All-Rounder", price: "₹11.00 Cr", type: "Indian" },
    { name: "Phil Salt", role: "WK-Batter", price: "₹8.50 Cr", type: "Overseas" },
    { name: "Bhuvneshwar Kumar", role: "Bowler", price: "₹6.25 Cr", type: "Indian" },
    { name: "Jitesh Sharma", role: "WK-Batter", price: "₹4.75 Cr", type: "Indian" },
    { name: "Tim David", role: "All-Rounder", price: "₹7.00 Cr", type: "Overseas" },
    { name: "Liam Livingstone", role: "All-Rounder", price: "₹9.25 Cr", type: "Overseas" },
    { name: "Nitish Kumar Reddy", role: "All-Rounder", price: "₹3.50 Cr", type: "Indian" },
    { name: "Rasikh Dar", role: "Bowler", price: "₹2.00 Cr", type: "Indian" },
    { name: "Jacob Duffy", role: "Bowler", price: "₹1.50 Cr", type: "Overseas" },
    { name: "Yash Dayal", role: "Bowler", price: "₹4.00 Cr", type: "Indian" },
    { name: "Mayank Dagar", role: "Spinner", price: "₹2.20 Cr", type: "Indian" },
    { name: "Swapnil Singh", role: "Spinner", price: "₹0.50 Cr", type: "Indian" },
  ];

  return (
    <>
      <Head>
        <title>RCB Squad 2026 Full Team Players List & Analysis | Defending Champs</title>
        <meta name="description" content="Official RCB Squad 2026. Check the full players list, auction prices, and team analysis. Captain Rajat Patidar leads the defense." />
        <meta name="keywords" content="RCB squad 2026, RCB players list, Rajat Patidar captain, Virat Kohli price, RCB auction 2026" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        
        {/* ADS: POP-UNDER */}
        <script src="https://pl28986518.profitablecpmratenetwork.com/e5/06/71/e50671db127d3e85ae433026ca75f547.js" async={true}></script>
      </Head>

      <Ticker />
      <Navbar />

      <main className="match-hub-page">
        {/* SIDEBAR ADS */}
        <div className="sidebar-ad left-sidebar">
           <iframe src="//www.highperformanceformat.com/watchnew?key=aa6201d5fae0926236c836b46e69f60c" width="160" height="600" frameBorder="0" scrolling="no" title="ad-left"></iframe>
        </div>
        <div className="sidebar-ad right-sidebar">
           <iframe src="//www.highperformanceformat.com/watchnew?key=7aca24a89379703b4856af696dd093ec" width="160" height="300" frameBorder="0" scrolling="no" title="ad-right"></iframe>
           <div style={{marginTop: '20px'}}></div>
           <iframe src="//www.profitablecpmratenetwork.com/watchnew?key=7b63b4b297c7e53c1d003813c9724a13" width="160" height="300" frameBorder="0" scrolling="no" title="ad-right-2"></iframe>
        </div>

        <article className="hub-container">
          
          {/* TOP BANNER AD */}
          <div className="ad-container ad-728-90" style={{marginTop: '0'}}>
             <iframe src="//www.highperformanceformat.com/watchnew?key=049ed5c6c01b883957767c887fde882d" width="728" height="90" frameBorder="0" scrolling="no" title="ad-banner-top"></iframe>
          </div>

          <header className="hub-header">
            <h1 className="main-title">RCB Squad 2026 – Full Team Players List & Analysis</h1>
          </header>

          <section className="hero-banner">
             <img src="/rcb_squad_2026_team_poster.png" alt="RCB Squad 2026 Poster" className="hero-img" />
             <p className="img-caption">Defending the Crown: The Royal Challengers Bengaluru 2026 Class</p>
          </section>

          <section className="content-block">
            <p className="lead-text">
              The champions are back! After a historic 2025 campaign, <strong>Royal Challengers Bengaluru (RCB)</strong> have assembled a powerhouse squad to defend their status as the kings of the IPL. Led by the tactical brilliance of <strong>Rajat Patidar</strong> and the legendary presence of <strong>Virat Kohli</strong>, the 2026 squad is a perfect blend of experienced maestros and young dynamos.
            </p>
          </section>

          {/* NATIVE AD */}
          <div className="ad-hybrid">
             <script async={true} data-cfasync="false" src="https://pl28986520.profitablecpmratenetwork.com/481bb8d376b950fb640f010f57eccd74/invoke.js"></script>
             <div id="container-481bb8d376b950fb640f010f57eccd74"></div>
          </div>

          <section className="squad-section">
             <h2 className="section-title">RCB Full Player List & Salaries (IPL 2026)</h2>
             <div className="xi-table-box">
                <table className="xi-table">
                   <thead>
                      <tr>
                         <th>Player Name</th>
                         <th>Role</th>
                         <th>Price</th>
                         <th>Category</th>
                      </tr>
                   </thead>
                   <tbody>
                      {squadData.map((p, idx) => (
                        <tr key={idx}>
                           <td style={{fontWeight: '900', color: p.type === 'Overseas' ? '#ef4444' : '#10b981'}}>{p.name} {p.type === 'Overseas' && '✈️'}</td>
                           <td>{p.role}</td>
                           <td style={{fontWeight: '800'}}>{p.price}</td>
                           <td>{p.type}</td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </section>

          {/* MID AD BANNER */}
          <div className="ad-container ad-468-60">
             <iframe src="//www.profitablecpmratenetwork.com/watchnew?key=d60542bb90219e73c31c84525bd1da05" width="468" height="60" frameBorder="0" scrolling="no" title="ad-mid"></iframe>
          </div>

          <section className="analysis-grid" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', margin: '40px 0'}}>
             <div className="info-card glass-panel">
                <h3 style={{color: '#ef4444'}}>🔥 Strengths</h3>
                <p><strong>Opening Explosivity:</strong> Kohli and Salt are a nightmare for any Powerplay attack.</p>
                <p><strong>Death Bowling:</strong> The Hazlewood-Bhuvi tandem is arguably the most economical in the league.</p>
             </div>
             <div className="info-card glass-panel">
                <h3 style={{color: '#f59e0b'}}>⚠️ Challenges</h3>
                <p><strong>Spin Depth:</strong> While Swapnil and Dagar are reliable, the lack of a marquee wrist-spinner could be a factor on dry tracks.</p>
             </div>
          </section>

          <div className="final-prediction-hub">
             <div className="final-card">
                <div className="predictor-badge">VERDICT</div>
                <h2 style={{color: '#10b981', marginTop: '20px'}}>Championship Contenders</h2>
                <p style={{color: '#94a3b8'}}>RCB has arguably the most balanced XI in IPL 2026. If Hazlewood recovers quickly, they remain favorites for a second consecutive trophy.</p>
                <a href="https://www.profitablecpmratenetwork.com/vs0tiypek0?key=ef7969d3fb5bb7720a91f4d28a5cf283" target="_blank" className="ad-btn" style={{marginTop: '20px'}}>BET ON RCB ✨</a>
             </div>
          </div>

        </article>

        <div className="sticky-ad-footer">
            <iframe src="//www.highperformanceformat.com/watchnew?key=11ced7a4967abfdc7f36246089b2f1d7" width="320" height="50" frameBorder="0" scrolling="no" title="ad-footer"></iframe>
        </div>

        {/* SOCIAL BAR SCRIPT */}
        <script src="https://pl28986521.profitablecpmratenetwork.com/5b/cb/a9/5bcba988f2cf28133bbb19565e8d0a29.js" async={true}></script>
      </main>

      <style jsx>{`
        .match-hub-page {
          background: #f8fafc;
          color: #1e293b;
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
        }
        .hub-container {
          max-width: 850px;
          margin: 0 auto;
          padding: 85px 20px 100px;
          position: relative;
        }
        
        .sidebar-ad { position: fixed; top: 100px; width: 160px; z-index: 50; display: flex; flex-direction: column; align-items: center; }
        .left-sidebar { left: calc(50% - 630px); }
        .right-sidebar { right: calc(50% - 630px); }

        @media (max-width: 1260px) { .sidebar-ad { display: none; } }

        .main-title { font-family: 'Playfair Display', serif; font-size: 3rem; font-weight: 950; text-align: center; margin: 40px 0; letter-spacing: -1.5px; line-height: 1.1; }
        .section-title { font-family: 'Playfair Display', serif; font-size: 2rem; font-weight: 900; margin: 40px 0 25px; text-align: center; }

        .ad-container { display: flex; justify-content: center; margin: 30px 0; overflow: hidden; background: #fff; border-radius: 12px; }
        .ad-btn { background: #10b981; color: #fff; padding: 15px 30px; border-radius: 50px; font-weight: 900; text-decoration: none; display: inline-block; }

        .hero-banner { border-radius: 24px; overflow: hidden; margin-bottom: 40px; box-shadow: 0 20px 50px rgba(0,0,0,0.1); }
        .hero-img { width: 100%; height: auto; display: block; }
        .img-caption { text-align: center; color: #64748b; font-size: 0.8rem; margin-top: 10px; font-style: italic; }

        .lead-text { font-size: 1.25rem; line-height: 1.8; color: #334155; text-align: center; }

        .xi-table-box { background: #fff; border-radius: 20px; border: 1px solid #e2e8f0; overflow: hidden; }
        .xi-table { width: 100%; border-collapse: collapse; }
        .xi-table th { padding: 18px; background: #f8fafc; font-weight: 900; text-align: left; border-bottom: 1px solid #e2e8f0; font-size: 0.8rem; text-transform: uppercase; color: #64748b; }
        .xi-table td { padding: 14px 18px; border-bottom: 1px solid #f1f5f9; font-weight: 600; font-size: 0.95rem; }

        .info-card { padding: 25px; border-radius: 20px; background: #fff; border: 1px solid rgba(0,0,0,0.05); }

        .final-card { padding: 40px; border-radius: 24px; background: #0f172a; color: #fff; text-align: center; position: relative; }
        .predictor-badge { position: absolute; top: -15px; left: 50%; transform: translateX(-50%); background: #10b981; padding: 6px 18px; border-radius: 100px; font-weight: 900; font-size: 0.7rem; }

        .sticky-ad-footer { position: fixed; bottom: 0; left: 0; right: 0; background: rgba(255,255,255,0.95); backdrop-filter: blur(10px); padding: 10px; display: flex; justify-content: center; z-index: 1000; border-top: 1px solid #e2e8f0; }

        @media (max-width: 768px) {
           .main-title { font-size: 2.2rem; }
           .analysis-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
