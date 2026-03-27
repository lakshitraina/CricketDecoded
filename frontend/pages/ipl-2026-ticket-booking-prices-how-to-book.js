import React from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Ticker from '../components/Ticker';

export default function TicketBookingIPL2026() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "IPL 2026 Ticket Booking – Prices, Dates & How to Book",
    "description": "Comprehensive guide to IPL 2026 ticket booking. Prices by category, official partners, and step-by-step booking instructions.",
    "image": "/ipl_2026_ticket_booking_visual.png",
    "datePublished": "2026-03-27T18:35:00Z",
    "author": {
      "@type": "Organization",
      "name": "Cricket Decoded"
    }
  };

  const pricingData = [
    { category: "General Stands", price: "₹800 - ₹2,500", availability: "High" },
    { category: "Premium / Club", price: "₹4,500 - ₹8,000", availability: "Medium" },
    { category: "VIP Boxes", price: "₹15,000 - ₹45,000", availability: "Limited" },
    { category: "Hospitality", price: "₹60,000+", availability: "Invitation" },
  ];

  return (
    <>
      <Head>
        <title>IPL 2026 Ticket Booking – Prices, Dates & How to Book Online</title>
        <meta name="description" content="Book IPL 2026 tickets online. Check the latest prices, booking dates, and official partners like JioHotstar & Paytm Insider." />
        <meta name="keywords" content="IPL 2026 ticket booking, IPL 2026 ticket price, how to book IPL tickets, IPL 2026 online tickets" />
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
            <h1 className="main-title">IPL 2026 Ticket Booking – Prices, Dates & How to Book Online</h1>
          </header>

          <section className="hero-banner">
             <img src="/ipl_2026_ticket_booking_visual.png" alt="IPL 2026 Ticket Booking" className="hero-img" />
             <p className="img-caption">Step into the Action: Official IPL 2026 Ticketing Guide</p>
          </section>

          <section className="content-block">
            <p className="lead-text">
              The cricket fever is back! With the IPL 2026 season kicking off tomorrow, fans are scrambling to secure their spots in the stadiums. From the high-intensity atmosphere of <strong>Wankhede</strong> to the sea of red at <strong>Chinnaswamy</strong>, here is how you can book your TATA IPL 2026 tickets online.
            </p>
          </section>

          {/* NATIVE AD */}
          <div className="ad-hybrid">
             <script async={true} data-cfasync="false" src="https://pl28986520.profitablecpmratenetwork.com/481bb8d376b950fb640f010f57eccd74/invoke.js"></script>
             <div id="container-481bb8d376b950fb640f010f57eccd74"></div>
          </div>

          <section className="pricing-section">
             <h2 className="section-title">IPL 2026 Ticket Prices by Category</h2>
             <div className="xi-table-box">
                <table className="xi-table">
                   <thead>
                      <tr>
                         <th>Stand Category</th>
                         <th>Price Range</th>
                         <th>Availability</th>
                      </tr>
                   </thead>
                   <tbody>
                      {pricingData.map((p, idx) => (
                        <tr key={idx}>
                           <td style={{fontWeight: '900'}}>{p.category}</td>
                           <td style={{color: '#10b981', fontWeight: '800'}}>{p.price}</td>
                           <td style={{fontWeight: '600', color: p.availability === 'High' ? '#10b981' : '#ef4444'}}>{p.availability}</td>
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

          <section className="guide-section glass-panel">
             <h2 className="section-title" style={{textAlign: 'left', marginBottom: '20px'}}>How to Book Online (Step-by-Step)</h2>
             <ol className="step-list">
                <li>Visit the official partners: <strong>JioHotstar</strong>, <strong>Paytm Insider</strong>, or <strong>BookMyShow</strong>.</li>
                <li>Select the "IPL 2026" tab from the sports section.</li>
                <li>Choose your preferred match and stadium.</li>
                <li>Select your stand from the interactive seat map.</li>
                <li>Complete the payment and receive your E-Ticket via email.</li>
             </ol>
             <div className="dew-warning" style={{marginTop: '25px'}}>
                ⚠️ <strong>Note:</strong> PHYSICAL TICKETS are mandatory at some venues like Eden Gardens. Ensure you check the redemption counter details.
             </div>
          </section>

          <div className="final-prediction-hub">
             <div className="final-card">
                <div className="predictor-badge">OFFICIAL PARTNERS</div>
                <div className="partner-logos" style={{display: 'flex', justifyContent: 'center', gap: '20px', margin: '30px 0'}}>
                   <span style={{fontSize: '1.2rem', fontWeight: '900'}}>JioHotstar</span>
                   <span style={{fontSize: '1.2rem', fontWeight: '900'}}>Paytm Insider</span>
                   <span style={{fontSize: '1.2rem', fontWeight: '900'}}>BookMyShow</span>
                </div>
                <a href="https://www.profitablecpmratenetwork.com/vs0tiypek0?key=ef7969d3fb5bb7720a91f4d28a5cf283" target="_blank" className="ad-btn">BOOK NOW & SAVE ✨</a>
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

        .xi-table-box { background: #fff; border-radius: 20px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.03); }
        .xi-table { width: 100%; border-collapse: collapse; }
        .xi-table th { padding: 18px; background: #f8fafc; font-weight: 900; text-align: left; border-bottom: 1px solid #e2e8f0; font-size: 0.8rem; text-transform: uppercase; color: #64748b; }
        .xi-table td { padding: 14px 18px; border-bottom: 1px solid #f1f5f9; font-weight: 600; font-size: 0.95rem; }

        .step-list { padding-left: 20px; line-height: 2; font-size: 1.1rem; color: #334155; }
        .dew-warning { background: #fef2f2; color: #991b1b; padding: 20px; border-radius: 12px; border: 1px solid #fee2e2; font-size: 0.95rem; }

        .final-card { padding: 40px; border-radius: 24px; background: #0f172a; color: #fff; text-align: center; position: relative; }
        .predictor-badge { position: absolute; top: -15px; left: 50%; transform: translateX(-50%); background: #10b981; padding: 6px 18px; border-radius: 100px; font-weight: 900; font-size: 0.7rem; }

        .sticky-ad-footer { position: fixed; bottom: 0; left: 0; right: 0; background: rgba(255,255,255,0.95); backdrop-filter: blur(10px); padding: 10px; display: flex; justify-content: center; z-index: 1000; border-top: 1px solid #e2e8f0; }

        @media (max-width: 768px) {
           .main-title { font-size: 2.2rem; }
        }
      `}</style>
    </>
  );
}
