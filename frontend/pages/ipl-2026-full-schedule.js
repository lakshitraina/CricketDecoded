import React from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Ticker from '../components/Ticker';

export default function IPL2026Schedule() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "IPL 2026 Full Schedule: Match List, Time Table & PDF Download",
    "description": "Get the official IPL 2026 schedule with full match dates, venues, and 07:30 PM / 03:30 PM IST timings. Download the PDF.",
    "image": "/ipl_2026_full_schedule_fixtures.png",
    "datePublished": "2026-03-27T18:00:00Z",
    "author": {
      "@type": "Organization",
      "name": "Cricket Decoded"
    }
  };

  const scheduleData = [
    { no: 1, date: "March 28", fixture: "RCB vs SRH", venue: "Bengaluru", time: "07:30 PM" },
    { no: 2, date: "March 29", fixture: "MI vs KKR", venue: "Mumbai", time: "07:30 PM" },
    { no: 3, date: "March 30", fixture: "RR vs CSK", venue: "Guwahati", time: "07:30 PM" },
    { no: 4, date: "March 31", fixture: "PBKS vs GT", venue: "New Chandigarh", time: "07:30 PM" },
    { no: 5, date: "April 01", fixture: "LSG vs DC", venue: "Lucknow", time: "07:30 PM" },
    { no: 6, date: "April 02", fixture: "KKR vs SRH", venue: "Kolkata", time: "07:30 PM" },
    { no: 7, date: "April 03", fixture: "CSK vs PBKS", venue: "Chennai", time: "07:30 PM" },
    { no: 8, date: "April 04", fixture: "DC vs MI", venue: "Delhi", time: "03:30 PM" },
    { no: 9, date: "April 04", fixture: "GT vs RR", venue: "Ahmedabad", time: "07:30 PM" },
    { no: 10, date: "April 05", fixture: "SRH vs LSG", venue: "Hyderabad", time: "03:30 PM" },
    { no: 11, date: "April 05", fixture: "RCB vs CSK", venue: "Bengaluru", time: "07:30 PM" },
    { no: 12, date: "April 06", fixture: "KKR vs PBKS", venue: "Kolkata", time: "07:30 PM" },
    { no: 13, date: "April 07", fixture: "RR vs MI", venue: "Guwahati", time: "07:30 PM" },
    { no: 14, date: "April 08", fixture: "DC vs GT", venue: "Delhi", time: "07:30 PM" },
    { no: 15, date: "April 09", fixture: "KKR vs LSG", venue: "Kolkata", time: "07:30 PM" },
  ];

  return (
    <>
      <Head>
        <title>IPL 2026 Full Schedule: Match List, Time Table & PDF Download</title>
        <meta name="description" content="Get the official IPL 2026 schedule with full match dates, venues, and 07:30 PM IST timings. Download TATA IPL 2026 PDF." />
        <meta name="keywords" content="IPL 2026 schedule, IPL match list 2026, IPL 2026 PDF download, IPL time table" />
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
           <iframe src="//www.highperformanceformat.com/watchnew?key=7b63b4b297c7e53c1d003813c9724a13" width="160" height="300" frameBorder="0" scrolling="no" title="ad-right-2"></iframe>
        </div>

        <article className="hub-container">
          
          {/* TOP BANNER AD */}
          <div className="ad-container ad-728-90" style={{marginTop: '0'}}>
             <iframe src="//www.highperformanceformat.com/watchnew?key=049ed5c6c01b883957767c887fde882d" width="728" height="90" frameBorder="0" scrolling="no" title="ad-banner-top"></iframe>
          </div>

          <header className="hub-header">
            <h1 className="main-title">IPL 2026 Full Schedule, Time Table, Fixtures & PDF Download</h1>
          </header>

          <section className="hero-banner">
             <img src="/ipl_2026_full_schedule_fixtures.png" alt="IPL 2026 Schedule" className="hero-img" />
             <p className="img-caption">Official TATA IPL 2026 Match List & Venues</p>
          </section>

          <section className="content-block">
            <p className="lead-text">
              The wait is officially over! The BCCI has released the <strong>IPL 2026 Full Schedule</strong>, and the cricket fever is set to take over the nation starting tomorrow, March 28, 2026. This 19th edition features 74 matches played across 10 iconic venues.
            </p>
          </section>

          {/* NATIVE AD */}
          <div className="ad-hybrid">
             <script async={true} data-cfasync="false" src="https://pl28986520.profitablecpmratenetwork.com/481bb8d376b950fb640f010f57eccd74/invoke.js"></script>
             <div id="container-481bb8d376b950fb640f010f57eccd74"></div>
          </div>

          <section className="schedule-section">
             <h2 className="section-title">IPL 2026 Match List: Timings & Venues</h2>
             <div className="xi-table-box">
                <table className="xi-table">
                   <thead>
                      <tr>
                         <th style={{width: '60px'}}>No.</th>
                         <th>Date</th>
                         <th>Fixture</th>
                         <th>Venue</th>
                         <th>Time (IST)</th>
                      </tr>
                   </thead>
                   <tbody>
                      {scheduleData.map((m) => (
                        <tr key={m.no}>
                           <td>{m.no}</td>
                           <td>{m.date}</td>
                           <td style={{color: '#10b981', fontWeight: '900'}}>{m.fixture}</td>
                           <td>{m.venue}</td>
                           <td style={{fontWeight: '800'}}>{m.time}</td>
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

          <section className="download-hub">
             <div className="toss-card">
                <h3>📥 Download IPL 2026 PDF</h3>
                <p>Carry the full fixtures list on your phone. Offline access to all 74 matches.</p>
                <div style={{marginTop: '20px'}}>
                   <a href="#" className="download-btn-premium">DOWNLOAD SCHEDULE PDF</a>
                </div>
             </div>
          </section>

          <section className="venue-list">
             <h2 className="section-title">IPL 2026 Stadiums & Home Grounds</h2>
             <div className="stat-grid-modern">
                <div className="stat-box"><h4>Bengaluru</h4><p>M. Chinnaswamy</p></div>
                <div className="stat-box"><h4>Mumbai</h4><p>Wankhede Stadium</p></div>
                <div className="stat-box"><h4>Kolkata</h4><p>Eden Gardens</p></div>
                <div className="stat-box"><h4>Ahmedabad</h4><p>Narendra Modi</p></div>
             </div>
          </section>

          <div className="final-prediction-hub">
             <div className="final-card">
                <div className="predictor-badge">QUICK TIP</div>
                <p style={{marginTop: '30px', color: '#94a3b8'}}>Save this page to your bookmarks! We will update the points table and playoff scenarios live as the tournament progresses.</p>
                <a href="https://www.profitablecpmratenetwork.com/vs0tiypek0?key=ef7969d3fb5bb7720a91f4d28a5cf283" target="_blank" className="ad-btn" style={{marginTop: '20px'}}>GET LIVE UPDATES ✨</a>
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
        .section-title { font-family: 'Playfair Display', serif; font-size: 2rem; font-weight: 900; margin: 40px 0 20px; text-align: center; }

        .ad-container { display: flex; justify-content: center; margin: 30px 0; overflow: hidden; background: #fff; border-radius: 12px; }
        .ad-btn { background: #10b981; color: #fff; padding: 15px 30px; border-radius: 50px; font-weight: 900; text-decoration: none; display: inline-block; }

        .hero-banner { border-radius: 24px; overflow: hidden; margin-bottom: 40px; box-shadow: 0 20px 50px rgba(0,0,0,0.1); }
        .hero-img { width: 100%; height: auto; display: block; }
        .img-caption { text-align: center; color: #64748b; font-size: 0.8rem; margin-top: 10px; font-style: italic; }

        .lead-text { font-size: 1.25rem; line-height: 1.8; color: #334155; text-align: center; }

        .xi-table-box { background: #fff; border-radius: 20px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.03); }
        .xi-table { width: 100%; border-collapse: collapse; }
        .xi-table th { padding: 18px; background: #f8fafc; font-weight: 900; text-align: left; border-bottom: 1px solid #e2e8f0; font-size: 0.75rem; text-transform: uppercase; color: #64748b; }
        .xi-table td { padding: 14px 18px; border-bottom: 1px solid #f1f5f9; font-weight: 600; font-size: 0.9rem; }

        .toss-card { background: #10b981; color: #fff; padding: 40px; border-radius: 24px; text-align: center; margin: 40px 0; box-shadow: 0 20px 50px rgba(16,185,129,0.3); }
        .download-btn-premium { background: #fff; color: #10b981; padding: 12px 24px; border-radius: 8px; font-weight: 900; text-decoration: none; display: inline-block; box-shadow: 0 5px 15px rgba(0,0,0,0.1); }

        .stat-grid-modern { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin: 20px 0; }
        .stat-box { background: #fff; padding: 15px; border-radius: 12px; text-align: center; border: 1px solid #e2e8f0; }
        .stat-box h4 { font-size: 0.65rem; color: #94a3b8; text-transform: uppercase; margin-bottom: 5px; }
        .stat-box p { font-size: 0.9rem; font-weight: 800; }

        .final-card { padding: 40px; border-radius: 24px; background: #0f172a; color: #fff; text-align: center; position: relative; }
        .predictor-badge { position: absolute; top: -15px; left: 50%; transform: translateX(-50%); background: #10b981; padding: 6px 18px; border-radius: 100px; font-weight: 900; font-size: 0.7rem; }

        .sticky-ad-footer { position: fixed; bottom: 0; left: 0; right: 0; background: rgba(255,255,255,0.95); backdrop-filter: blur(10px); padding: 10px; display: flex; justify-content: center; z-index: 1000; border-top: 1px solid #e2e8f0; }

        @media (max-width: 768px) {
           .main-title { font-size: 2rem; }
           .stat-grid-modern { grid-template-columns: 1fr 1fr; }
           .xi-table th:nth-child(1), .xi-table td:nth-child(1) { display: none; }
        }
      `}</style>
    </>
  );
}
