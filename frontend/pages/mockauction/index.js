import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function MockAuctionLanding() {
  const router = useRouter();

  return (
    <div className="auction-landing-root">
      <Head>
        <title>IPL Mock Auction Simulator - Build Your Dream Team</title>
        <meta name="description" content="Build your dream IPL squad in this interactive simulator. Outsmart AI franchises, use RTM cards, and master purse strategy." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet" />
      </Head>

      {/* NAV */}
      <nav>
        <Link href="/" className="nav-logo">Cricket<span>Decoded.</span></Link>
        <ul className="nav-links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/predictions">Predictions</Link></li>
          <li><Link href="/blog">News & Blogs</Link></li>
          <li><Link href="/#fixtures">Fixtures</Link></li>
          <li><span style={{color:'var(--green)', cursor: 'default'}}>Mock Auction</span></li>
        </ul>
        <button onClick={() => router.push('/mockauction/setup')} className="nav-cta border-none cursor-pointer">START AUCTION</button>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-badge">✦ IPL 2026 Season Live</div>
        <h1>
          Mock
          <em>Auction.</em>
        </h1>
        <p className="hero-sub">Build your dream IPL squad. Outsmart AI franchises, use RTM cards, and master purse strategy — all in one realistic simulation.</p>
        <div className="hero-actions">
          <button onClick={() => router.push('/mockauction/setup')} className="btn-primary cursor-pointer border-none">🏏 Start Auction ✨</button>
          <a href="#modes" className="btn-secondary">View Game Modes ↓</a>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <div className="stat-num">10</div>
            <div className="stat-label">IPL Franchises</div>
          </div>
          <div className="stat">
            <div className="stat-num">50+</div>
            <div className="stat-label">Players Available</div>
          </div>
          <div className="stat">
            <div className="stat-num">AI</div>
            <div className="stat-label">Smart Bidding</div>
          </div>
          <div className="stat">
            <div className="stat-num">0ms</div>
            <div className="stat-label">Score Delay</div>
          </div>
        </div>
      </section>

      {/* GAME MODES */}
      <section id="modes">
        <div className="section">
          <p className="section-label">⚡ Game Modes</p>
          <h2 className="section-title">Choose Your<br /><em>Arena.</em></h2>
          <p className="section-desc">From solo simulation to live battles with friends — every mode is built to feel like the real thing.</p>
          <div className="modes-grid">
            <div className="mode-card featured">
              <span className="mode-badge">Most Popular</span>
              <div className="mode-icon">🏆</div>
              <div className="mode-title">Classic Auction</div>
              <p className="mode-desc">Full IPL simulation against intelligent AI franchises. Manage your purse, build a team, and experience the Mega Auction.</p>
              <div className="mode-tags">
                <span className="mode-tag">AI Opponents</span>
                <span className="mode-tag">Dynamic Purse</span>
                <span className="mode-tag">Simulated DB</span>
              </div>
              <button className="mode-link border-none bg-transparent cursor-pointer" onClick={() => router.push('/mockauction/setup')} style={{color:'var(--green)'}}>Play Now →</button>
            </div>
            
            <div className="mode-card" style={{opacity: 0.7}}>
              <span className="mode-badge live" style={{background: 'var(--gray-600)'}}>Coming Soon</span>
              <div className="mode-icon">👥</div>
              <div className="mode-title">Multiplayer Auction</div>
              <p className="mode-desc">Compete with friends in real-time. Create private rooms, choose your franchise and battle for the best squad.</p>
              <div className="mode-tags">
                <span className="mode-tag">Real-time</span>
                <span className="mode-tag">WebSockets</span>
              </div>
            </div>
            
            <div className="mode-card" style={{opacity: 0.7}}>
              <div className="mode-icon">⭐</div>
              <div className="mode-title">Legends Auction</div>
              <p className="mode-desc">A special mode featuring the all-time greatest IPL players. Build a team of legends.</p>
              <div className="mode-tags">
                <span className="mode-tag">All-time Players</span>
              </div>
            </div>
            
            <div className="mode-card" style={{opacity: 0.7}}>
              <div className="mode-icon">⚡</div>
              <div className="mode-title">Quick Auction</div>
              <p className="mode-desc">Short on time? This accelerated format simulates the full auction automatically using probabilities.</p>
              <div className="mode-tags">
                <span className="mode-tag">Auto-Simulate</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-section">
        <div className="how-inner">
          <p className="section-label" style={{color:'var(--green)'}}>⚡ How It Works</p>
          <h2 className="section-title" style={{color:'white'}}>Four Steps to<br /><em style={{color:'var(--green)'}}>Your Dream XI.</em></h2>
          <p className="section-desc">The auction follows standard mega auction budgeting with intelligent counter-bidding dynamics.</p>
          <div className="steps-grid">
            <div className="step">
              <div className="step-num">01</div>
              <div className="step-title">Pick Your Franchise</div>
              <div className="step-desc">Choose from all 10 IPL teams. Each comes pre-loaded with their real 100 Crore budget.</div>
            </div>
            <div className="step">
              <div className="step-num">02</div>
              <div className="step-title">Bid & Counter-bid</div>
              <div className="step-desc">AI opponents analyse their virtual purses and team needs before deciding to counter — just like a real auction table.</div>
            </div>
            <div className="step">
              <div className="step-num">03</div>
              <div className="step-title">Strategic Passes</div>
              <div className="step-desc">Save your purse for the big guns. Unsold players will be swept up by AI teams at base price.</div>
            </div>
            <div className="step">
              <div className="step-num">04</div>
              <div className="step-title">Analyse Your Squad</div>
              <div className="step-desc">Review your team composition and compare with the AI squads once the session is complete.</div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features-section">
        <div className="features-inner">
          <p className="section-label">⚡ Features</p>
          <h2 className="section-title">Built for<br /><em>Real Fans.</em></h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <div className="feature-title">Weighted Probability AI</div>
              <p className="feature-desc">Our bidding algorithm adapts dynamically. The higher the price goes, the less likely the AI is to counter!</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <div className="feature-title">Purse Economy Logic</div>
              <p className="feature-desc">Virtual management of 10 different franchise purses to ensure realistic spending stops.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🃏</div>
              <div className="feature-title">Dynamic MongoDB State</div>
              <p className="feature-desc">Your auction session and squad history are securely backed remotely in real-time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <p className="section-label">⚡ Ready?</p>
        <h2 className="section-title">Your Franchise.<br /><em>Your Rules.</em></h2>
        <p className="section-desc">Join thousands of fans already building their dream IPL squads. Free to play, no sign-up required.</p>
        <div className="cta-actions" style={{marginBottom: '3rem'}}>
          <button onClick={() => router.push('/mockauction/setup')} className="btn-primary cursor-pointer border-none">🏏 Play Classic Auction ✨</button>
        </div>
        
        {/* Adsterra Sticky Native - Monetization Requirement */}
        <div style={{maxWidth: '800px', margin: '0 auto', background: 'rgba(255,255,255,0.8)', padding: '1rem', borderRadius: '12px'}}>
           <div id="container-481bb8d376b950fb640f010f57eccd74"></div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-logo">Cricket<span>Decoded.</span></div>
        <p>© 2026 CricketDecoded. Mock Auction feature.</p>
        <p style={{fontSize:'12px', color:'var(--gray-400)'}}>This is a simulation and not affiliated with any official cricket league.</p>
      </footer>

      <style jsx global>{`
        .auction-landing-root {
          --green: #1DB954;
          --green-dark: #17a046;
          --green-light: #e8f9ef;
          --black: #0d0d0d;
          --gray-100: #f7faf8;
          --gray-200: #eef3f0;
          --gray-400: #9aab9f;
          --gray-600: #5a6b60;
          --white: #ffffff;
          --gold: #f0a500;
          --red: #e63946;
          --radius: 18px;
          
          font-family: 'DM Sans', sans-serif;
          background: var(--white);
          color: var(--black);
        }

        .auction-landing-root nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 18px 48px;
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(0,0,0,0.06);
        }
        .auction-landing-root .nav-logo {
          font-family: 'DM Sans', sans-serif;
          font-size: 18px; font-weight: 600; color: var(--black); text-decoration: none;
        }
        .auction-landing-root .nav-logo span { color: var(--green); font-style: italic; font-family: 'Playfair Display', serif; }
        .auction-landing-root .nav-links { display: flex; gap: 32px; list-style: none; margin: 0; padding: 0; }
        .auction-landing-root .nav-links a { font-size: 13px; font-weight: 500; color: var(--gray-600); text-decoration: none; letter-spacing: 0.08em; text-transform: uppercase; transition: color 0.2s; }
        .auction-landing-root .nav-links a:hover { color: var(--black); }
        .auction-landing-root .nav-cta {
          background: var(--black); color: var(--white);
          padding: 10px 22px; border-radius: 100px;
          font-size: 13px; font-weight: 600; text-decoration: none;
          transition: background 0.2s, transform 0.15s;
        }
        .auction-landing-root .nav-cta:hover { background: var(--green); transform: translateY(-1px); }

        /* HERO */
        .auction-landing-root .hero {
          min-height: 100vh;
          background: var(--gray-100);
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          text-align: center;
          padding: 120px 24px 80px;
          position: relative;
          overflow: hidden;
        }
        .auction-landing-root .hero::before {
          content: '';
          position: absolute; top: -100px; left: 50%; transform: translateX(-50%);
          width: 800px; height: 800px;
          background: radial-gradient(circle, rgba(29,185,84,0.12) 0%, transparent 70%);
          pointer-events: none;
        }
        .auction-landing-root .hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--green-light); border: 1px solid rgba(29,185,84,0.25);
          padding: 7px 16px; border-radius: 100px;
          font-size: 12px; font-weight: 600; color: var(--green-dark);
          letter-spacing: 0.06em; text-transform: uppercase;
          margin-bottom: 28px;
        }
        .auction-landing-root .hero-badge::before { content: ''; width: 7px; height: 7px; background: var(--green); border-radius: 50%; animation: pulse-dot 2s infinite; }
        @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.6;transform:scale(1.3)} }

        .auction-landing-root .hero h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(52px, 8vw, 110px);
          font-weight: 900; line-height: 0.95;
          color: var(--black);
          margin-bottom: 12px;
        }
        .auction-landing-root .hero h1 em {
          font-style: italic; color: var(--green);
          display: block;
        }
        .auction-landing-root .hero-sub {
          font-size: 17px; color: var(--gray-600); font-weight: 400; max-width: 480px; line-height: 1.6;
          margin: 20px auto 40px;
        }
        .auction-landing-root .hero-actions {
          display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;
        }
        .auction-landing-root .btn-primary {
          background: var(--green); color: var(--white);
          padding: 15px 32px; border-radius: 100px;
          font-size: 15px; font-weight: 600; text-decoration: none;
          display: inline-flex; align-items: center; gap: 8px;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 4px 20px rgba(29,185,84,0.35);
        }
        .auction-landing-root .btn-primary:hover { background: var(--green-dark); transform: translateY(-2px); box-shadow: 0 8px 30px rgba(29,185,84,0.45); }
        .auction-landing-root .btn-secondary {
          background: var(--white); color: var(--black); border: 1.5px solid rgba(0,0,0,0.12);
          padding: 15px 32px; border-radius: 100px;
          font-size: 15px; font-weight: 500; text-decoration: none;
          transition: border-color 0.2s, transform 0.15s;
        }
        .auction-landing-root .btn-secondary:hover { border-color: var(--black); transform: translateY(-2px); }

        .auction-landing-root .hero-stats {
          display: flex; gap: 48px; justify-content: center; flex-wrap: wrap;
          margin-top: 72px;
        }
        .auction-landing-root .stat { text-align: center; }
        .auction-landing-root .stat-num { font-family: 'Playfair Display', serif; font-size: 32px; font-weight: 900; color: var(--black); }
        .auction-landing-root .stat-label { font-size: 12px; color: var(--gray-400); font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; margin-top: 3px; }

        /* MODES */
        .auction-landing-root .section { padding: 100px 48px; max-width: 1200px; margin: 0 auto; }
        .auction-landing-root .section-label {
          font-size: 11px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--green); margin-bottom: 14px;
        }
        .auction-landing-root .section-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(36px, 5vw, 58px); font-weight: 900; line-height: 1.05;
          color: var(--black); margin-bottom: 16px;
        }
        .auction-landing-root .section-title em { font-style: italic; color: var(--green); }
        .auction-landing-root .section-desc { font-size: 16px; color: var(--gray-600); max-width: 520px; line-height: 1.65; }

        .auction-landing-root .modes-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 56px;
        }
        .auction-landing-root .mode-card {
          background: var(--gray-100); border-radius: var(--radius);
          padding: 40px; position: relative; overflow: hidden;
          border: 1.5px solid transparent;
          transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;
        }
        .auction-landing-root .mode-card.featured:hover { border-color: var(--green); transform: translateY(-4px); box-shadow: 0 16px 48px rgba(29,185,84,0.1); cursor: pointer; }
        .auction-landing-root .mode-card.featured {
          background: var(--black); color: var(--white);
          grid-row: span 1;
        }
        .auction-landing-root .mode-card.featured .mode-icon { background: rgba(29,185,84,0.15); }
        .auction-landing-root .mode-card.featured .mode-title { color: var(--white); }
        .auction-landing-root .mode-card.featured .mode-desc { color: rgba(255,255,255,0.6); }
        .auction-landing-root .mode-card.featured .mode-tag { background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.7); }

        .auction-landing-root .mode-badge {
          position: absolute; top: 20px; right: 20px;
          background: var(--green); color: var(--white);
          font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
          padding: 5px 12px; border-radius: 100px;
        }
        .auction-landing-root .mode-icon {
          width: 52px; height: 52px; background: var(--green-light);
          border-radius: 14px; display: flex; align-items: center; justify-content: center;
          font-size: 22px; margin-bottom: 22px;
        }
        .auction-landing-root .mode-title {
          font-family: 'Playfair Display', serif;
          font-size: 26px; font-weight: 900; color: inherit; margin-bottom: 10px; line-height: 1.1;
        }
        .auction-landing-root .mode-desc { font-size: 14px; color: inherit; line-height: 1.6; margin-bottom: 20px; }
        .auction-landing-root .mode-tags { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 28px; }
        .auction-landing-root .mode-tag {
          background: var(--white); border: 1px solid rgba(0,0,0,0.08);
          font-size: 11px; font-weight: 600; color: var(--gray-600);
          padding: 5px 12px; border-radius: 100px; letter-spacing: 0.04em;
        }

        /* HOW IT WORKS */
        .auction-landing-root .how-section {
          padding: 100px 48px;
          background: var(--black);
          position: relative; overflow: hidden;
        }
        .auction-landing-root .how-section::before {
          content: '';
          position: absolute; top: -200px; right: -200px;
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(29,185,84,0.12) 0%, transparent 70%);
        }
        .auction-landing-root .how-inner { max-width: 1200px; margin: 0 auto; }
        .auction-landing-root .steps-grid {
          display: grid; grid-template-columns: repeat(4,1fr); gap: 2px; margin-top: 60px;
        }
        .auction-landing-root .step {
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06);
          padding: 36px 28px; border-radius: 2px;
          position: relative; overflow: hidden;
          transition: background 0.25s;
        }
        .auction-landing-root .step:hover { background: rgba(29,185,84,0.06); }
        .auction-landing-root .step-num {
          font-family: 'Playfair Display', serif;
          font-size: 56px; font-weight: 900;
          color: rgba(29,185,84,0.15); line-height: 1;
          margin-bottom: 20px;
        }
        .auction-landing-root .step-title { font-size: 15px; font-weight: 700; color: var(--white); margin-bottom: 8px; }
        .auction-landing-root .step-desc { font-size: 13px; color: rgba(255,255,255,0.45); line-height: 1.65; }

        /* FEATURES */
        .auction-landing-root .features-section { padding: 100px 48px; background: var(--gray-100); }
        .auction-landing-root .features-inner { max-width: 1200px; margin: 0 auto; }
        .auction-landing-root .features-grid {
          display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; margin-top: 56px;
        }
        .auction-landing-root .feature-card {
          background: var(--white); border-radius: var(--radius);
          padding: 32px; border: 1.5px solid rgba(0,0,0,0.06);
          transition: border-color 0.2s, transform 0.2s;
        }
        .auction-landing-root .feature-card:hover { border-color: var(--green); transform: translateY(-3px); }
        .auction-landing-root .feature-icon {
          width: 44px; height: 44px; background: var(--green-light);
          border-radius: 12px; display: flex; align-items: center; justify-content: center;
          font-size: 18px; margin-bottom: 18px;
        }
        .auction-landing-root .feature-title { font-size: 16px; font-weight: 700; margin-bottom: 8px; }
        .auction-landing-root .feature-desc { font-size: 13px; color: var(--gray-600); line-height: 1.65; }

        /* CTA */
        .auction-landing-root .cta-section {
          padding: 100px 48px 60px;
          text-align: center;
          background: var(--green-light);
          position: relative; overflow: hidden;
        }
        .auction-landing-root .cta-section::before {
          content: 'AUCTION';
          position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%);
          font-family: 'Playfair Display', serif;
          font-size: 220px; font-weight: 900; color: rgba(29,185,84,0.06);
          white-space: nowrap; pointer-events: none; line-height: 1;
        }
        
        /* FOOTER */
        .auction-landing-root footer {
          padding: 32px 48px; border-top: 1px solid rgba(0,0,0,0.07);
          display: flex; align-items: center; justify-content: space-between;
        }
        .auction-landing-root .footer-logo { font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 600; color: var(--black); }
        .auction-landing-root .footer-logo span { color: var(--green); font-style: italic; font-family: 'Playfair Display', serif; }
        .auction-landing-root footer p { font-size: 12px; color: var(--gray-400); margin: 0; }

        @media (max-width: 900px) {
          .auction-landing-root nav { padding: 14px 20px; }
          .auction-landing-root .nav-links { display: none; }
          .auction-landing-root .section, .auction-landing-root .how-section, .auction-landing-root .features-section, .auction-landing-root .cta-section { padding: 60px 20px; }
          .auction-landing-root .modes-grid, .auction-landing-root .features-grid, .auction-landing-root .steps-grid { grid-template-columns: 1fr; }
          .auction-landing-root .hero-stats { gap: 28px; }
          .auction-landing-root footer { flex-direction: column; gap: 12px; text-align: center; }
        }
      `}</style>
    </div>
  );
}
