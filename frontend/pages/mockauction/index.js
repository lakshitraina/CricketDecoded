import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, googleProvider } from '../../utils/firebase';

export default function MockAuctionLanding() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = React.useRef(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (usr) => {
      setUser(usr);
    });
    
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setShowDropdown(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      unsub();
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (e) {
      console.error(e);
      alert('Sign In Failed');
    }
  };

  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <div className="auction-landing-root">
      <Head>
        <title>IPL Mock Auction Simulator - Build Your Dream Team</title>
        <meta name="description" content="Build your dream IPL squad. Outsmart AI franchises, use RTM cards, master your purse." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&family=DM+Sans:wght@300;400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet" />
      </Head>

      {/* NAV */}
      <nav>
        <Link href="/" className="nav-logo">Cricket<span>Decoded.</span></Link>
        <div style={{display:'flex', gap:'20px', alignItems:'center'}}>
           {user ? (
            <div style={{position: 'relative'}} ref={dropdownRef}>
               <div onClick={() => setShowDropdown(!showDropdown)} style={{display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', padding: '5px 10px', borderRadius: '100px', transition: 'background 0.2s', background: showDropdown ? 'rgba(0,0,0,0.05)' : 'transparent'}}>
                  <div style={{textAlign: 'right', display: 'none', md: 'block'}}>
                     <div style={{fontSize: '0.85rem', fontWeight: 800, color: '#0f172a'}}>{user.displayName || 'User'}</div>
                     <div style={{fontSize: '0.65rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px'}}>Active Session</div>
                  </div>
                  <img 
                    src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || 'User')}&background=4285F4&color=fff`} 
                    alt="Profile" 
                    style={{width:'40px', height:'40px', borderRadius:'50%', objectFit: 'cover', border: '2px solid #fff', boxShadow: '0 4px 10px rgba(0,0,0,0.1)'}} 
                    referrerPolicy="no-referrer"
                    onError={(e) => {e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || 'User')}&background=4285F4&color=fff`}}
                  />
               </div>

               {showDropdown && (
                  <div className="glass-dropdown" style={{position: 'absolute', top: '55px', right: 0, width: '220px', background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(20px)', borderRadius: '20px', padding: '15px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', border: '1px solid rgba(0,0,0,0.05)', zIndex: 1000}}>
                     <div style={{padding: '10px', borderBottom: '1px solid #f1f5f9', marginBottom: '10px'}}>
                        <div style={{fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '5px'}}>Account</div>
                        <div style={{fontSize: '0.9rem', fontWeight: 800}}>{user.displayName}</div>
                     </div>
                     <button onClick={() => router.push('/mockauction/profile')} className="dd-item">👤 View Profile</button>
                     <button onClick={() => router.push('/mockauction/history')} className="dd-item">📜 Match History</button>
                     <div style={{height: '1px', background: '#f1f5f9', margin: '10px 0'}}></div>
                     <button onClick={handleSignOut} className="dd-item" style={{color: '#ef4444'}}>🚪 Sign Out</button>
                  </div>
               )}
            </div>
          ) : (
            <button onClick={handleSignIn} className="nav-cta" style={{background:'#4285F4'}}>
              <svg style={{width:'16px', height:'16px', marginRight:'8px', verticalAlign:'sub'}} viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Sign in with Google
            </button>
          )}
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-badge">✦ Interactive Simulator ✦</div>
        <h1>
          Mock
          <em>Auction.</em>
        </h1>
        <p className="hero-sub" style={{fontSize: '1.25rem', maxWidth: '600px', margin: '20px auto 30px'}}>
           Build your dream IPL squad. Outsmart AI franchises, use RTM cards, master your purse.
        </p>

        {!user && (
           <p style={{background: 'rgba(66, 133, 244, 0.1)', color: '#1a73e8', padding: '10px 20px', borderRadius: '8px', fontSize: '0.9rem', marginBottom: '30px', fontWeight: '500'}}>
             Tip: <a href="#" onClick={(e) => {e.preventDefault(); handleSignIn();}} style={{color: 'inherit'}}>Sign in</a> to permanently save your final squads and auction history in your profile!
           </p>
        )}

        <div className="hero-actions">
          <button onClick={() => router.push('/mockauction/setup')} className="btn-primary cursor-pointer border-none" style={{padding: '18px 40px'}}>🏏 Play Solo (Classic)</button>
          <button onClick={() => router.push('/mockauction/lobby')} className="btn-secondary" style={{padding: '18px 40px'}}>👥 Play With Friends</button>
        </div>
        <div className="hero-stats">
          <div className="stat">10 Franchises</div>
          <div className="stat-dot">·</div>
          <div className="stat">80+ Core Players</div>
          <div className="stat-dot">·</div>
          <div className="stat">AI Smart Bidding</div>
          <div className="stat-dot">·</div>
          <div className="stat">0ms Delay</div>
        </div>
      </section>

      {/* TWO CARD MODE SELECTOR */}
      <section className="modes-section" style={{padding: '80px 24px', background: '#f8fafc', position: 'relative', zIndex: 10}}>
         <div style={{maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px'}}>
            
            {/* CLASSIC */}
            <div className="mc dark-mc" onClick={() => router.push('/mockauction/setup')}>
               <span className="mbg mbg-popular">Most Popular</span>
               <div className="mc-icon">🏆</div>
               <h2>Classic Auction</h2>
               <p>The authentic IPL Mega Auction experience. Compete solo against 9 aggressively programmed AI opponents spanning 5 exact playing sets.</p>
               <div className="mc-tags">
                  <span>AI Opponents</span><span>RTM Cards</span><span>Retention Phase</span><span>5 Sets</span>
               </div>
               <button className="mc-btn">Start Classic →</button>
            </div>

            {/* MULTIPLAYER */}
            <div className="mc light-mc" onClick={() => router.push('/mockauction/lobby')}>
               <span className="mbg mbg-live">Live</span>
               <div className="mc-icon">👥</div>
               <h2>Multiplayer Room</h2>
               <p>Create or join private 6-character rooms with friends. Host controls the stage while you battle it out real-time over Socket.io/Firebase.</p>
               <div className="mc-tags">
                  <span>2-8 Players</span><span>6-Char Code</span><span>Live Chat</span><span>Real-time Bidding</span>
               </div>
               <button className="mc-btn">Enter Lobby →</button>
            </div>

         </div>
      </section>

      <style jsx global>{`
        .auction-landing-root {
          --green: #1DB954; --black: #0d0d0d; --white: #ffffff; --red: #e63946;
          font-family: 'DM Sans', sans-serif; background: #fff; color: var(--black);
        }
        .auction-landing-root nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 40px; background: rgba(255,255,255,0.9); backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(0,0,0,0.05);
        }
        .auction-landing-root .nav-logo { font-size: 18px; font-weight: 700; color: var(--black); text-decoration: none; }
        .auction-landing-root .nav-logo span { color: var(--green); font-style: italic; font-family: 'Playfair Display', serif; }
        
        .btn-ghost { background: transparent; border: none; font-weight: 600; cursor: pointer; color: #475569; padding: 8px 16px; border-radius: 8px; transition: background 0.2s; }
        .btn-ghost:hover { background: rgba(0,0,0,0.05); }
        .nav-cta { padding: 10px 20px; border-radius: 100px; color: #fff; border: none; font-weight: 600; cursor: pointer; display: flex; align-items: center; transition: transform 0.2s;}
        .nav-cta:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(66,133,244,0.3); }

        .dd-item { width: 100%; text-align: left; padding: 12px 15px; border: none; background: transparent; border-radius: 12px; font-size: 0.9rem; font-weight: 600; color: #475569; cursor: pointer; transition: 0.2s; display: flex; align-items: center; gap: 10px; }
        .dd-item:hover { background: rgba(16,185,129,0.05); color: #10b981; }
        .glass-dropdown { animation: ddFade 0.3s cubic-bezier(0.165, 0.84, 0.44, 1); }
        @keyframes ddFade { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }


        .hero {
          min-height: 80vh; padding: 160px 24px 80px; text-align: center;
          background: #f1f5f9; display: flex; flex-direction: column; align-items: center;
        }
        .hero-badge { background: #dcfce7; color: #166534; padding: 6px 16px; border-radius: 100px; font-weight: 700; font-size: 0.8rem; letter-spacing: 1px; margin-bottom: 25px; border: 1px solid #bbf7d0;}
        .hero h1 { font-family: 'Playfair Display', serif; font-size: clamp(3rem, 7vw, 6rem); font-weight: 900; line-height: 0.95; }
        .hero h1 em { color: var(--green); font-style: italic; display: block; }
        .hero-actions { display: flex; gap: 20px; justify-content: center; }
        .btn-primary { background: var(--green); color: white; border-radius: 100px; font-weight: 700; font-size: 1.1rem; box-shadow: 0 10px 20px rgba(29,185,84,0.25); transition: 0.2s; border: none; }
        .btn-primary:hover { transform: translateY(-3px); box-shadow: 0 15px 30px rgba(29,185,84,0.35); }
        .btn-secondary { background: white; color: black; border: 2px solid #e2e8f0; border-radius: 100px; font-weight: 700; font-size: 1.1rem; cursor: pointer; transition: 0.2s; }
        .btn-secondary:hover { border-color: black; transform: translateY(-3px); }

        .hero-stats { display: flex; gap: 15px; align-items: center; margin-top: 50px; flex-wrap: wrap; justify-content: center;}
        .stat { font-weight: 600; color: #334155; }
        .stat-dot { color: #cbd5e1; font-weight: 900; }

        .mc {
           padding: 40px; border-radius: 24px; position: relative; cursor: pointer; transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
           border: 1px solid transparent;
        }
        .mc:hover { transform: translateY(-8px); }
        .dark-mc { background: var(--black); color: white; box-shadow: 0 20px 40px rgba(0,0,0,0.2); }
        .dark-mc:hover { box-shadow: 0 30px 60px rgba(0,0,0,0.4); border-color: rgba(29,185,84,0.4); }
        .light-mc { background: white; color: black; border-color: #e2e8f0; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
        .light-mc:hover { border-color: #cbd5e1; box-shadow: 0 20px 50px rgba(0,0,0,0.1); }
        
        .mbg { position: absolute; top: 20px; right: 20px; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; padding: 6px 14px; border-radius: 100px; }
        .mbg-popular { background: rgba(29,185,84,0.15); color: #10b981; border: 1px solid rgba(16,185,129,0.3); }
        .mbg-live { background: #fee2e2; color: #ef4444; border: 1px solid #fecaca; }

        .mc-icon { font-size: 2.5rem; margin-bottom: 20px; }
        .mc h2 { font-family: 'Playfair Display', serif; font-size: 2rem; font-weight: 900; margin-bottom: 10px; }
        .mc p { font-size: 1rem; line-height: 1.6; opacity: 0.8; margin-bottom: 25px; }

        .mc-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 30px; }
        .mc-tags span { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; padding: 4px 10px; border-radius: 6px; }
        .dark-mc .mc-tags span { background: rgba(255,255,255,0.1); color: #cbd5e1; }
        .light-mc .mc-tags span { background: #f1f5f9; color: #475569; }

        .mc-btn { background: transparent; border: none; font-weight: 800; font-size: 1.1rem; cursor: pointer; color: var(--green); padding: 0; }
        .dark-mc .mc-btn { color: white; }

        @media (max-width: 900px) {
           .modes-section > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
