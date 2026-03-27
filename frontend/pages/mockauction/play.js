import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import AdComponent from '../../components/AdComponent';

export default function MockAuctionPlay() {
  const router = useRouter();
  
  // States
  const [session, setSession] = useState(null);
  const [player, setPlayer] = useState(null);
  const [timer, setTimer] = useState(15);
  const [currentBid, setCurrentBid] = useState(0);
  const [highestBidder, setHighestBidder] = useState('None');
  const [bidLog, setBidLog] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [actionLocked, setActionLocked] = useState(false);
  const [auctionOver, setAuctionOver] = useState(false);
  
  const timerRef = useRef(null);

  // Fetch Session Initialization
  useEffect(() => {
    if (!router.isReady) return;
    const sessionId = router.query.session || localStorage.getItem('auctionSession');
    if (!sessionId) {
      router.push('/mockauction/setup');
      return;
    }
    
    fetchSession(sessionId).then(() => {
      fetchNextPlayer(sessionId);
    });
  }, [router.isReady]);

  const fetchSession = async (sessionId) => {
    const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    try {
      const res = await fetch(`${API_BASE}/api/auction/session/${sessionId}`);
      const data = await res.json();
      if (data.sessionId) setSession(data);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchNextPlayer = async (sessionId) => {
    setLoading(true);
    const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    try {
      const res = await fetch(`${API_BASE}/api/auction/player/${sessionId}`);
      const data = await res.json();
      
      if (!data.player) {
        setAuctionOver(true);
        setLoading(false);
        return;
      }

      setPlayer(data.player);
      setCurrentBid(data.player.basePrice);
      setHighestBidder('None');
      setBidLog([`Player on the block! Base Price: ₹${data.player.basePrice} Cr`]);
      setTimer(15);
      setActionLocked(false);
      setLoading(false);
      
      startTimer();
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  // Timer Logic
  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleTimerEnd();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleTimerEnd = async () => {
    setActionLocked(true);
    const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    
    if (highestBidder !== session?.userTeam) {
      // AI won it or Unsold
      try {
        const res = await fetch(`${API_BASE}/api/auction/pass`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId: session.sessionId,
            playerId: player._id,
            currentBid,
            highestBidder
          })
        });
        const data = await res.json();
        setBidLog(prev => [data.message, ...prev]);
        
        // Wait 2 seconds, then fetch next
        setTimeout(() => {
          fetchSession(session.sessionId); // refresh purse/squad
          fetchNextPlayer(session.sessionId);
        }, 2000);
      } catch (e) { console.error(e); }
    } else {
      // User supposedly won it (Already processed by backend during handleRaise)
      setBidLog(prev => [`You successfully purchased ${player.name}!`, ...prev]);
      setTimeout(() => {
        fetchSession(session.sessionId);
        fetchNextPlayer(session.sessionId);
      }, 2000);
    }
  };

  const handleRaise = async () => {
    if (actionLocked) return;
    setActionLocked(true);
    clearInterval(timerRef.current);

    const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    const bidValue = highestBidder === 'None' ? player.basePrice : currentBid + 0.5;

    // Fast Forward - Simulate User Bid Locally
    setBidLog(prev => [`You placed a bid for ₹${bidValue} Cr.`, ...prev]);
    setCurrentBid(bidValue);
    setHighestBidder(session.userTeam);

    try {
      // Small artificial delay to make it feel like AI is "thinking"
      setTimeout(async () => {
        const res = await fetch(`${API_BASE}/api/auction/bid`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId: session.sessionId,
            playerId: player._id,
            bidAmount: bidValue
          })
        });
        const data = await res.json();

        if (data.status === 'countered') {
          // AI Countered!
          setCurrentBid(data.highestBid);
          setHighestBidder(data.highestBidder);
          setBidLog(prev => [data.message, ...prev]);
          setTimer(10); // Reset timer 
          setActionLocked(false);
          startTimer();
        } else if (data.status === 'won') {
          // User Won - No counters
          setBidLog(prev => [`No counters. Going once...`, ...prev]);
          setTimer(3); // Fast track the sold timer to 3 seconds
          startTimer();
          // Action stays locked
        } else if (data.error) {
           alert(data.error);
           setActionLocked(false);
           startTimer();
        }
      }, 800);
    } catch (e) { 
      console.error(e);
      setActionLocked(false);
      startTimer();
    }
  };

  const handlePass = () => {
    if (actionLocked) return;
    if (highestBidder === session.userTeam) {
      alert("You cannot pass. You hold the highest bid!");
      return;
    }
    
    // User passes. The timer fast tracks to 0.
    setActionLocked(true);
    clearInterval(timerRef.current);
    setBidLog(prev => [`You passed on ${player.name}.`, ...prev]);
    handleTimerEnd();
  };

  if (!session || loading && !player) {
    return (
      <div className="dash-v2">
        <Navbar /><div style={{paddingTop: '150px', textAlign: 'center'}}><h2>Loading Auction Table...</h2></div>
      </div>
    );
  }

  // Next Bid Cost
  const nextBidDisplay = highestBidder === 'None' ? player?.basePrice : (currentBid + 0.5);

  if (auctionOver) {
    return (
      <div className="dash-v2">
        <Navbar />
        <div className="dash-inner" style={{paddingTop: '100px', textAlign: 'center'}}>
           <h2>Auction Completed!</h2>
           <p style={{marginTop: '20px', color: 'var(--text-secondary)'}}>You have purchased {session?.squad?.length} players.</p>
           
           <div style={{maxWidth: '800px', margin: '40px auto', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '20px'}}>
              <h3 style={{marginBottom: '20px'}}>Your Final Squad</h3>
              {session?.squad?.length === 0 ? <p>No players purchased.</p> : (
                 <ul style={{listStyle: 'none', padding: 0}}>
                    {session.squad.map((p, i) => (
                      <li key={i} style={{display:'flex', justifyContent:'space-between', padding: '10px', borderBottom: '1px solid rgba(255,255,255,0.1)'}}>
                        <span>{p.name} ({p.role})</span>
                        <strong style={{color: 'var(--accent-green)'}}>₹ {p.price} Cr</strong>
                      </li>
                    ))}
                 </ul>
              )}
           </div>
           <button onClick={() => router.push('/mockauction')} className="btn-primary">Return to Lobby</button>
        </div>
      </div>
    );
  }

  return (
    <div className="dash-v2 auction-room">
      <Head>
        <title>Live Auction | Cricket Decoded</title>
      </Head>

      <Navbar />

      <main className="dash-inner" style={{ paddingTop: '100px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '30px', alignItems: 'start' }}>
          
          {/* LEFT: AUCTION TABLE */}
          <div className="auction-main-col">
            <div className="preview-mock">
              <div className="mock-header">
                <div className="mock-timer" style={{ color: timer <= 5 ? 'var(--red)' : 'var(--green)' }}>
                  0:{timer < 10 ? `0${timer}` : timer}
                  <span>Bidding closes</span>
                </div>
                <div className="mock-purse">
                  <div className="mock-purse-label">Your Purse Remaining</div>
                  <div className="mock-purse-val">₹ {session.purse.toFixed(1)} Cr</div>
                </div>
              </div>

              {player && (
                <div className="mock-player">
                  <div className="player-avatar">{player.name.substring(0,2).toUpperCase()}</div>
                  <div className="player-info">
                    <div className="player-name">{player.name}</div>
                    <div className="player-role">{player.role} · {player.nationality}</div>
                  </div>
                  <div className="player-base">
                    Current Bid<br/>
                    <strong style={{ color: highestBidder === session.userTeam ? 'var(--green)' : 'var(--gold)' }}>
                      ₹ {currentBid.toFixed(1)} Cr
                    </strong>
                    <div style={{fontSize: '0.75rem', marginTop: '2px', color: 'rgba(255,255,255,0.5)'}}>
                      Bidder: {highestBidder}
                    </div>
                  </div>
                </div>
              )}

              <div className="mock-bid-row">
                <button 
                  className="bid-btn raise" 
                  onClick={handleRaise}
                  disabled={actionLocked || highestBidder === session.userTeam || session.purse < nextBidDisplay}
                  style={{ opacity: (actionLocked || highestBidder === session.userTeam) ? 0.5 : 1 }}
                >
                  ⬆ Raise to ₹ {nextBidDisplay.toFixed(1)} Cr
                </button>
                <button 
                  className="bid-btn pass" 
                  onClick={handlePass}
                  disabled={actionLocked || highestBidder === session.userTeam}
                >
                  Pass
                </button>
              </div>

              <div className="mock-opponents">
                {['MI', 'CSK', 'KKR', 'RCB'].filter(t => t !== session.userTeam).slice(0, 3).map((team) => (
                  <div key={team} className="opp-chip" style={{ borderColor: highestBidder === team ? 'var(--red)' : 'rgba(255,255,255,0.06)' }}>
                    <div className="opp-name">{team}</div>
                    <div className={`opp-bid ${highestBidder === team ? 'active' : ''}`}>{highestBidder === team ? 'Highest' : 'Waiting'}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: LOGS & SQUAD / ADS */}
          <div className="auction-side-col">
             <div className="glass-panel" style={{ padding: '20px', marginBottom: '20px', maxHeight: '300px', overflowY: 'auto' }}>
                <h3 style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '15px' }}>Live Events</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.9rem' }}>
                   {bidLog.map((log, i) => (
                     <li key={i} style={{ marginBottom: '10px', paddingBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.05)', color: i === 0 ? '#fff' : 'rgba(255,255,255,0.6)' }}>
                       {log}
                     </li>
                   ))}
                </ul>
             </div>

             <AdComponent slotId="sidebar-auction" />
          </div>

        </div>
      </main>

      <style jsx>{`
        /* Reuse CSS from the provided landing page sneak peek */
        .preview-mock {
          background: #0d0d0d;
          border-radius: 22px;
          padding: 30px;
          box-shadow: 0 40px 80px rgba(0,0,0,0.3);
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.05);
        }
        .preview-mock::before {
          content: ''; position: absolute; top: -60px; right: -60px;
          width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(29,185,84,0.15) 0%, transparent 70%);
        }
        .mock-header {
          display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; position: relative; z-index: 10;
        }
        .mock-timer {
          font-family: 'Playfair Display', serif;
          font-size: 36px; font-weight: 900;
          transition: color 0.3s;
        }
        .mock-timer span { font-size: 13px; font-weight: 400; color: rgba(255,255,255,0.4); display: block; font-family: 'DM Sans', sans-serif; }
        .mock-purse { text-align: right; }
        .mock-purse-label { font-size: 11px; color: rgba(255,255,255,0.4); letter-spacing: 0.08em; text-transform: uppercase; }
        .mock-purse-val { font-size: 22px; font-weight: 700; color: #f0a500; }

        .mock-player {
          background: rgba(255,255,255,0.04); border-radius: 14px; padding: 20px;
          display: flex; align-items: center; gap: 16px; margin-bottom: 24px;
          border: 1px solid rgba(255,255,255,0.06);
          position: relative; z-index: 10;
        }
        .player-avatar {
          width: 52px; height: 52px; border-radius: 12px;
          background: linear-gradient(135deg, #1DB954, #17a046);
          display: flex; align-items: center; justify-content: center;
          font-size: 20px; font-weight: 900; color: white;
          flex-shrink: 0;
        }
        .player-info { flex: 1; }
        .player-name { font-size: 18px; font-weight: 700; color: white; margin-bottom: 3px; }
        .player-role { font-size: 13px; color: rgba(255,255,255,0.5); }
        .player-base { font-size: 13px; color: rgba(255,255,255,0.5); text-align: right; }
        .player-base strong { font-size: 18px; display: block; margin-top: 2px; }

        .mock-bid-row { display: flex; gap: 10px; margin-bottom: 20px; position: relative; z-index: 10; }
        .bid-btn {
          flex: 1; padding: 16px; border-radius: 12px; border: none; cursor: pointer;
          font-size: 15px; font-weight: 700; font-family: 'DM Sans', sans-serif;
          transition: transform 0.15s, opacity 0.15s;
        }
        .bid-btn:hover:not(:disabled) { transform: translateY(-2px); filter: brightness(1.1); }
        .bid-btn:disabled { cursor: not-allowed; }
        .bid-btn.raise { background: #1DB954; color: white; }
        .bid-btn.pass { background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.7); }

        .mock-opponents { display: flex; gap: 12px; position: relative; z-index: 10; }
        .opp-chip {
          flex: 1; background: rgba(255,255,255,0.04); border-radius: 10px; padding: 12px 8px;
          text-align: center; border: 1px solid rgba(255,255,255,0.06);
          transition: border-color 0.3s;
        }
        .opp-name { font-size: 11px; color: rgba(255,255,255,0.4); font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; }
        .opp-bid { font-size: 14px; font-weight: 700; color: white; margin-top: 4px; }
        .opp-bid.active { color: #e63946; }

        @media (max-width: 900px) {
           .auction-room .dash-inner > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
