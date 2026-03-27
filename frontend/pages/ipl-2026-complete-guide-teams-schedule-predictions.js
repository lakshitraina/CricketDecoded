import React from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Ticker from '../components/Ticker';

export default function MegaGuideIPL2026() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "IPL 2026: Complete Guide, Teams, Schedule & Predictions",
    "description": "The ultimate guide to IPL 2026. Teams, captains, schedule highlights, and expert predictions for the 19th edition.",
    "image": "/ipl_2026_mega_guide_trophy.png",
    "datePublished": "2026-03-27T18:45:00Z",
    "author": {
      "@type": "Organization",
      "name": "Cricket Decoded"
    }
  };

  const teamsData = [
    { team: "RCB (Defending Champs)", captain: "Rajat Patidar", star: "Virat Kohli" },
    { team: "Mumbai Indians", captain: "Hardik Pandya", star: "Jasprit Bumrah" },
    { team: "CSK", captain: "Ruturaj Gaikwad", star: "Ravindra Jadeja" },
    { team: "Sunrisers Hyderabad", captain: "Pat Cummins", star: "Travis Head" },
    { team: "Kolkata Knight Riders", captain: "Shreyas Iyer", star: "Rinku Singh" },
    { team: "Gujarat Titans", captain: "Shubman Gill", star: "Rashid Khan" },
    { team: "Rajasthan Royals", captain: "Sanju Samson", star: "Jos Buttler" },
    { team: "Lucknow Super Giants", captain: "KL Rahul", star: "Nicholas Pooran" },
    { team: "Delhi Capitals", captain: "Rishabh Pant", star: "Kuldeep Yadav" },
    { team: "Punjab Kings", captain: "Shakib Al Hasan", star: "Arshdeep Singh" },
  ];

  return (
    <>
      <Head>
        <title>IPL 2026: Complete Guide, Teams, Schedule & Predictions</title>
        <meta name="description" content="TATA IPL 2026 Ultimate Guide. Get all details on teams, squads, full schedule, and winner predictions. Start the season prepared!" />
        <meta name="keywords" content="IPL 2026 complete guide, IPL 2026 teams list, IPL 2026 predictions, IPL 2026 schedule" />
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
            <h1 className="main-title">IPL 2026: The Ultimate Guide to Teams, Schedule & Predictions</h1>
          </header>

          <section className="hero-banner">
             <img src="/ipl_2026_mega_guide_trophy.png" alt="IPL 2026 Mega Guide" className="hero-img" />
             <p className="img-caption">The Quest for Glory: 10 Teams, 1 Trophy, 74 Matches</p>
          </section>

          <section className="content-block">
            <p className="lead-text">
              Welcome to the 19th edition of the world's most lucrative and exciting cricket league! <strong>TATA IPL 2026</strong> promises to be bigger than ever, with 10 teams battling it out across 74 matches for the ultimate prize. Whether you are a die-hard RCB fan or a neutral spectator, this mega guide has everything you need to navigate the season.
            </p>
          </section>

          {/* NATIVE AD */}
          <div className="ad-hybrid">
             <script async={true} data-cfasync="false" src="https://pl28986520.profitablecpmratenetwork.com/481bb8d376b950fb640f010f57eccd74/invoke.js"></script>
             <div id="container-481bb8d376b950fb640f010f57eccd74"></div>
          </div>

          <section className="quick-links glass-panel" style={{margin: '40px 0'}}>
             <h2 className="section-title" style={{textAlign: 'left', margin: '0 0 15px'}}>Explore The Hubs 🚀</h2>
             <div className="link-grid" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px'}}>
                <a href="/ipl-2026-full-schedule" className="hub-link">📅 Full Schedule</a>
                <a href="/rcb-squad-2026-full-team-players-list" className="hub-link">🦁 RCB Full Squad</a>
                <a href="/ipl-2026-ticket-booking-prices-how-to-book" className="hub-link">🎟️ Ticket Booking</a>
                <a href="/tomorrow-ipl-match-2026-prediction" className="hub-link">🔥 Match Predictions</a>
             </div>
          </section>

          <section className="teams-overview">
             <h2 className="section-title">Participating Teams & Captaincy</h2>
             <div className="xi-table-box">
                <table className="xi-table">
                   <thead>
                      <tr>
                         <th>Team Name</th>
                         <th>Captain</th>
                         <th>Player to Watch</th>
                      </tr>
                   </thead>
                   <tbody>
                      {teamsData.map((t, idx) => (
                        <tr key={idx}>
                           <td style={{fontWeight: '900'}}>{t.team}</td>
                           <td style={{color: '#10b981', fontWeight: '800'}}>{t.captain}</td>
                           <td style={{fontWeight: '600'}}>{t.star}</td>
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

          <section className="predictions-section glass-panel">
             <h2 className="section-title" style={{textAlign: 'left', marginBottom: '20px'}}>IPL 2026 Predictions</h2>
             <p><strong>Top 4 Contenders:</strong> RCB, SRH, Mumbai Indians, KKR.</p>
             <p><strong>Dark Horse:</strong> Gujarat Titans (with Shubman Gill in peak form).</p>
             <p><strong>Purple Cap Prediction:</strong> Jasprit Bumrah / Josh Hazlewood.</p>
             <p><strong>Orange Cap Prediction:</strong> Virat Kohli / Travis Head.</p>
          </section>

          <div className="final-prediction-hub">
             <div className="final-card">
                <div className="predictor-badge">EXPERT VERDICT</div>
                <h2 style={{color: '#10b981', marginTop: '20px'}}>RCB for the Double?</h2>
                <p style={{color: '#94a3b8'}}>While the competition is fierce, the balanced squad of Royal Challengers Bengaluru makes them strong favorites to defend their title in 2026.</p>
                <a href="https://www.profitablecpmratenetwork.com/vs0tiypek0?key=ef7969d3fb5bb7720a91f4d28a5cf283" target="_blank" className="ad-btn" style={{marginTop: '20px'}}>JOIN THE FANTASY LEAGUE ✨</a>
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
        .ad-btn { background: #10b981; color: #fff; padding: 15px 30px; border-radius: 50px; font-weight: 900; text-decoration: none; display: inline-block; box-shadow: 0 10px 30px rgba(16,185,129,0.3); }

        .hero-banner { border-radius: 24px; overflow: hidden; margin-bottom: 40px; box-shadow: 0 20px 50px rgba(0,0,0,0.1); }
        .hero-img { width: 100%; height: auto; display: block; }
        .img-caption { text-align: center; color: #64748b; font-size: 0.8rem; margin-top: 10px; font-style: italic; }

        .lead-text { font-size: 1.25rem; line-height: 1.8; color: #334155; text-align: center; }

        .hub-link { background: #fff; padding: 15px; border-radius: 12px; text-decoration: none; color: #0f172a; font-weight: 800; border: 1px solid #e2e8f0; transition: all 0.3s ease; text-align: center; }
        .hub-link:hover { border-color: #10b981; color: #10b981; transform: translateY(-3px); }

        .xi-table-box { background: #fff; border-radius: 20px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.03); }
        .xi-table { width: 100%; border-collapse: collapse; }
        .xi-table th { padding: 18px; background: #f8fafc; font-weight: 900; text-align: left; border-bottom: 1px solid #e2e8f0; font-size: 0.8rem; text-transform: uppercase; color: #64748b; }
        .xi-table td { padding: 14px 18px; border-bottom: 1px solid #f1f5f9; font-weight: 600; font-size: 0.95rem; }

        .final-card { padding: 40px; border-radius: 24px; background: #0f172a; color: #fff; text-align: center; position: relative; }
        .predictor-badge { position: absolute; top: -15px; left: 50%; transform: translateX(-50%); background: #10b981; padding: 6px 18px; border-radius: 100px; font-weight: 900; font-size: 0.7rem; }

        .sticky-ad-footer { position: fixed; bottom: 0; left: 0; right: 0; background: rgba(255,255,255,0.95); backdrop-filter: blur(10px); padding: 10px; display: flex; justify-content: center; z-index: 1000; border-top: 1px solid #e2e8f0; }

        @media (max-width: 768px) {
           .main-title { font-size: 2.2rem; }
           .link-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
