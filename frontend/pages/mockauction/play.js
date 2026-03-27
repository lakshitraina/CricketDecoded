import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import { auctionPlayers, preRetentions } from '../../data/auctionPlayers';

// Utility for AI Decision
function aiDecidesBid(franchise, player, currentBid, setNumber) {
  if (franchise.purse < currentBid + 0.5) return "PASS";
  
  // Base willingness = base price * 1.5; adjust heavily by role need
  let need = 0.5; // default
  const roleCount = franchise.squad.filter(p => p.role === player.role).length;
  if (roleCount === 0) need = 1.0;
  if (roleCount > 2) need = 0.2;

  const maxWilling = player.basePrice * (1.5 + (need * 3));
  const aggressionFactor = setNumber >= 4 ? 1.3 : 1.0;

  if (currentBid >= maxWilling * aggressionFactor) return "PASS";

  const delay = Math.random() < 0.3 ? 800 : 1500 + Math.random() * 1500;
  const increment = currentBid < 5.0 ? 0.25 : currentBid < 10.0 ? 0.5 : 1.0;

  return { action: "BID", amount: currentBid + increment, delay };
}

export default function MockAuctionV2() {
  const router = useRouter();

  // STATE INITIALIZATION
  const [initFinished, setInitFinished] = useState(false);
  const [userState, setUserState] = useState(null);
  const [aiTeams, setAiTeams] = useState({});
  const [playerQueue, setPlayerQueue] = useState([]);
  
  // AUCTION TABLE STATE
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [currentSet, setCurrentSet] = useState(1);
  const [timer, setTimer] = useState(15);
  const [currentBid, setCurrentBid] = useState(0);
  const [highestBidder, setHighestBidder] = useState("None");
  const [logs, setLogs] = useState([]);
  
  const [biddingActive, setBiddingActive] = useState(false);
  const [aiThinkingTeam, setAiThinkingTeam] = useState(null);
  const [overlayMsg, setOverlayMsg] = useState(null); // 'SOLD' | 'UNSOLD'

  const timerRef = useRef(null);
  const logRef = useRef(null);
  const aiTimeoutRef = useRef(null);
  
  // Safe Ref for resolving stale closures in setInterval
  const stateRef = useRef({ currentPlayer: null, currentBid: 0, highestBidder: 'None' });
  useEffect(() => {
     stateRef.current = { currentPlayer, currentBid, highestBidder };
  }, [currentPlayer, currentBid, highestBidder]);

  useEffect(() => {
    const rawState = localStorage.getItem('auction_v2_state');
    if (!rawState) {
      router.push('/mockauction/setup');
      return;
    }
    const state = JSON.parse(rawState);
    setUserState({
      name: state.userTeam,
      purse: state.userPurse,
      squad: state.userSquad,
      rtmCards: state.rtmCards
    });
    setAiTeams(state.aiTeams);
    
    // Sort queue by Sets (1 to 5)
    const queue = [...auctionPlayers].sort((a,b) => a.set - b.set);
    setPlayerQueue(queue);
    setInitFinished(true);
  }, []);

  useEffect(() => {
    if (initFinished && playerQueue.length > 0 && !currentPlayer) {
      loadNextPlayer();
    }
  }, [initFinished, playerQueue]);

  const addLog = (msg, color) => {
    setLogs(prev => [...prev, { msg, color, id: Date.now() }]);
    setTimeout(() => {
       if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
    }, 50);
  };

  const loadNextPlayer = () => {
    if (playerQueue.length === 0) return router.push('/mockauction/summary'); // Route to summary later

    const next = playerQueue[0];
    setCurrentPlayer(next);
    setCurrentSet(next.set);
    setCurrentBid(next.basePrice / 100); // Standardize displaying Crores
    setHighestBidder('None');
    setOverlayMsg(null);
    setAiThinkingTeam(null);
    setBiddingActive(true);
    setTimer(15);
    addLog(`--- NEXT PLAYER: ${next.name} (Base ₹${next.basePrice / 100}Cr) ---`, '#64748b');
    
    startTimer();
    triggerAIEvaluation('None', next.basePrice / 100);
  };

  // ----------------- TIMER LOGIC -----------------
  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleHammerDrop();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleHammerDrop = () => {
    setBiddingActive(false);
    clearTimeout(aiTimeoutRef.current);
    setAiThinkingTeam(null);
    clearInterval(timerRef.current);

    const cp = stateRef.current.currentPlayer;
    const cb = stateRef.current.currentBid;
    const hb = stateRef.current.highestBidder;

    if (!cp) return;

    if (hb === 'None') {
       setOverlayMsg('UNSOLD');
       addLog(`UNSOLD - No bids for ${cp.name}.`, '#ef4444');
    } else {
       setOverlayMsg('SOLD');
       addLog(`SOLD! ${cp.name} to ${hb} for ₹${cb.toFixed(2)} Cr!`, '#10b981');
       
       // Deduct Purse & Add to Squad safely via functional updates
       if (hb === userState.name) {
         setUserState(prev => ({
           ...prev,
           purse: prev.purse - cb,
           squad: [...prev.squad, { ...cp, price: cb }]
         }));
       } else {
         setAiTeams(prev => ({
           ...prev,
           [hb]: {
              ...prev[hb],
              purse: prev[hb].purse - cb,
              squad: [...(prev[hb].squad || []), { ...cp, price: cb }]
           }
         }));
       }
    }

    // Schedule next player
    setTimeout(() => {
       setPlayerQueue(prev => prev.slice(1));
       if (playerQueue.length <= 1) router.push('/mockauction'); // End Game if empty
       else loadNextPlayer();
    }, 3000);
  };

  // ----------------- AI BIDDING LOGIC -----------------
  const triggerAIEvaluation = (currentWinningTeam, currentPrice) => {
     if (!biddingActive) return;
     
     // Only teams not currently winning can evaluate
     const eligibleAIs = Object.keys(aiTeams).filter(team => team !== currentWinningTeam);
     if (eligibleAIs.length === 0) return;

     // Pick a random AI team to analyze their bid
     const evaluatorName = eligibleAIs[Math.floor(Math.random() * eligibleAIs.length)];
     const evaluatorStats = aiTeams[evaluatorName];

     const decision = aiDecidesBid(evaluatorStats, currentPlayer, currentPrice, currentSet);

     if (decision.action === 'BID') {
        const timeout = decision.delay;
        
        // Show subtle "Thinking" badge in right panel
        if (timeout > 1500) setAiThinkingTeam(evaluatorName);

        aiTimeoutRef.current = setTimeout(() => {
           if (!biddingActive) return;
           placeBid(evaluatorName, decision.amount);
           setAiThinkingTeam(null);
        }, timeout);
     } else {
        // AI passed... queue another Evaluation slightly later if timer isn't dead
        aiTimeoutRef.current = setTimeout(() => {
           triggerAIEvaluation(currentWinningTeam, currentPrice);
        }, 800);
     }
  };

  const placeBid = (teamName, amount) => {
    setCurrentBid(amount);
    setHighestBidder(teamName);
    
    // Reset timer back heavily to simulate auctioneer waiting for counter
    setTimer(prev => prev < 10 ? 10 : 15);
    
    // Log color magic
    const tColor = teamName === userState.name ? '#10b981' : aiTeams[teamName]?.color || '#ffffff';
    addLog(`⭐ ${teamName} raised the bid to ₹${amount.toFixed(2)} Cr!`, tColor);

    startTimer(); // Restart pulse

    if (teamName === userState.name) {
       // Stop manual evaluation, wait for AI
       triggerAIEvaluation(teamName, amount);
    } else {
       // An AI just bid. Another AI might counter!
       triggerAIEvaluation(teamName, amount);
    }
  };

  const userRaise = (increment) => {
    if (!biddingActive) return;
    const newBid = highestBidder === 'None' ? (currentPlayer.basePrice/100) : currentBid + increment;
    if (userState.purse < newBid) return alert("Insufficient Purse!");
    
    clearTimeout(aiTimeoutRef.current);
    placeBid(userState.name, newBid);
  };

  if (!initFinished || !userState || !currentPlayer) return <div style={{background: '#0f172a', height: '100vh', color:'white', display:'flex', alignItems:'center', justifyContent:'center'}}>Entering Auction Room...</div>;

  const DASH_ARRAY = 283;
  const dashOffset = DASH_ARRAY - (DASH_ARRAY * timer) / 15;

  return (
    <div className="auction-room-v2">
      <Head><title>Live Auction | V2 Engine</title></Head>

      {/* TOP NAV MINI */}
      <div className="room-nav">
         <div style={{fontWeight: 900, fontStyle: 'italic', color: '#10b981'}}>Cricket<span style={{color:'white'}}>Decoded</span></div>
         <div style={{fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '2px'}}>Mock Auction 2026 Simulator</div>
         <button onClick={() => router.push('/')} className="exit-btn">Exit Lobby</button>
      </div>

      <div className="auction-3-col">
        
        {/* LEFT: USER SQUAD */}
        <aside className="left-panel">
           <div className="panel-inner glass-sub">
              <div className="user-header">
                 <img src={`/teams/${userState.name.toLowerCase()}.png`} alt={userState.name} style={{width:'50px', height:'50px', filter:'drop-shadow(0 2px 4px rgba(0,0,0,0.5))'}} />
                 <div style={{marginLeft: '15px'}}>
                    <div style={{fontSize: '0.85rem', color: '#94a3b8', textTransform: 'uppercase'}}>{userState.name} Purse</div>
                    <div style={{fontSize: '1.6rem', fontWeight: 900, color: '#f59e0b'}}>₹{userState.purse.toFixed(2)}</div>
                 </div>
              </div>

              <div className="squad-breakdown">
                 <div style={{display:'flex', justifyContent: 'space-between', marginBottom: '15px', paddingBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.05)'}}>
                    <span style={{color: '#cbd5e1', fontWeight: 600}}>RTM Cards:</span>
                    <span style={{display: 'flex', gap: '5px'}}>
                      {Array.from({length: userState.rtmCards}).map((_, i) => <span key={i} style={{background: '#10b981', color: '#fff', borderRadius: '4px', padding: '2px 6px', fontSize: '0.7rem', fontWeight: 900}}>RTM</span>)}
                    </span>
                 </div>

                 <div className="squad-list">
                    <h4 style={{fontSize: '0.8rem', color: '#64748b', marginBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '5px'}}>Squad ({userState.squad.length}/25)</h4>
                    <ul style={{listStyle:'none', margin:0, padding:0, maxHeight: '60vh', overflowY: 'auto'}}>
                       {userState.squad.map((p, i) => (
                         <li key={i} style={{padding: '8px', background: 'rgba(255,255,255,0.03)', borderRadius: '6px', marginBottom: '5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <div>
                               <div style={{fontSize: '0.8rem', fontWeight: 600, color: '#fff'}}>{p.name}</div>
                               <div style={{fontSize: '0.65rem', color: '#94a3b8'}}>{p.role}</div>
                            </div>
                            <div style={{fontSize: '0.75rem', fontWeight: 800, color: '#f59e0b'}}>₹{p.price}</div>
                         </li>
                       ))}
                    </ul>
                 </div>
              </div>
           </div>
        </aside>

        {/* CENTER: PODIUM */}
        <main className="center-panel">
          
           <div className="podium-header">
              <span className="set-badge">SET {currentSet} — {currentSet === 1 ? 'MARQUEE' : currentSet === 2 ? 'OVERSEAS' : 'CAPPED'}</span>
              <span className="queue-status">{playerQueue.length} Players Left</span>
           </div>

           <div className={`podium-card ${overlayMsg ? 'msg-active' : ''}`}>
              <div className="svg-timer-box">
                 <svg viewBox="0 0 100 100" style={{width: '90px', height: '90px', transform: 'rotate(-90deg)'}}>
                    <circle cx="50" cy="50" r="45" fill="black" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
                    <path
                      strokeDasharray="283"
                      strokeDashoffset={dashOffset}
                      stroke={timer <= 5 ? '#ef4444' : '#10b981'}
                      strokeWidth="6"
                      strokeLinecap="round"
                      fill="none"
                      style={{transition: 'stroke-dashoffset 1s linear, stroke 0.3s'}}
                      d="M 50, 50 m -45, 0 a 45,45 0 1,0 90,0 a 45,45 0 1,0 -90,0"
                    />
                    <text x="50" y="50" transform="rotate(90 50 50)" textAnchor="middle" dy=".3em" fill="white" fontSize="28" fontWeight="900" fontFamily="Playfair Display">
                       0:{timer < 10 ? `0${timer}` : timer}
                    </text>
                 </svg>
              </div>

              {overlayMsg && (
                 <div className="auction-overlay" style={{background: overlayMsg === 'SOLD' ? 'rgba(16,185,129,0.95)' : 'rgba(239,68,68,0.95)'}}>
                    {overlayMsg === 'SOLD' ? `SOLD TO ${highestBidder} 🔨` : 'UNSOLD ❌'}
                 </div>
              )}

              <div className="player-halo">
                 <img 
                   src={currentPlayer.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentPlayer.name)}&background=1DB954&color=fff`} 
                   alt={currentPlayer.name} 
                   onError={(e)=>{e.target.src=`https://ui-avatars.com/api/?name=${encodeURIComponent(currentPlayer.name)}&background=1DB954&color=fff`}} 
                 />
              </div>
              
              <h1 className="plyr-name">{currentPlayer.name}</h1>
              <div className="plyr-badges">
                 <span className="role-tag">{currentPlayer.role}</span>
                 <span className="nat-tag">{currentPlayer.nationality === 'India' ? '🇮🇳 Indian' : '✈️ Overseas'}</span>
              </div>

              <div className="plyr-stats-strip">
                 <div className="st-item"><span className="st-val">{currentPlayer.stats.matches}</span><span className="st-lbl">Mats</span></div>
                 {currentPlayer.role.includes('Bowler') && <div className="st-item"><span className="st-val">{currentPlayer.stats.wickets}</span><span className="st-lbl">Wkts</span></div>}
                 {(currentPlayer.role.includes('Batter') || currentPlayer.role.includes('All')) && <div className="st-item"><span className="st-val">{currentPlayer.stats.runs}</span><span className="st-lbl">Runs</span></div>}
                 <div className="st-item"><span className="st-val">{currentPlayer.stats.avg}</span><span className="st-lbl">Avg</span></div>
                 <div className="st-item"><span className="st-val">{currentPlayer.stats.sr}</span><span className="st-lbl">SR / Ec</span></div>
              </div>

              <div className="live-bid-display">
                 <div className="lbd-title">Current Bid</div>
                 <div className="lbd-val" style={{color: highestBidder === userState.name ? '#10b981' : (highestBidder === 'None' ? '#fff' : '#f59e0b')}}>
                    ₹ {currentBid.toFixed(2)} Cr
                 </div>
                 {highestBidder !== 'None' && (
                    <div className="lbd-team">
                       Leading: <span style={{fontWeight: 800, padding: '2px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.1)'}}>{highestBidder}</span>
                    </div>
                 )}
              </div>
           </div>

           <div className="action-buttons">
              <button onClick={() => userRaise(0.25)} disabled={!biddingActive || highestBidder === userState.name} className="bb primary">
                 ⬆ Raise ₹0.25 Cr
              </button>
              <button onClick={() => userRaise(0.50)} disabled={!biddingActive || highestBidder === userState.name} className="bb primary">
                 ⬆ Raise ₹0.50 Cr
              </button>
              {userState.rtmCards > 0 && highestBidder !== 'None' && highestBidder !== userState.name && currentPlayer.previousTeam === userState.name && (
                <button 
                  onClick={() => { placeBid(userState.name, currentBid); setUserState(prev => ({...prev, rtmCards: prev.rtmCards - 1})); }} 
                  disabled={!biddingActive} 
                  className="bb rtm"
                >
                  🃏 Match with RTM
                </button>
              )}
           </div>

           <div className="bottom-log" ref={logRef}>
              {logs.map(log => (
                <div key={log.id} style={{color: log.color, marginBottom: '6px', fontSize: '0.85rem', fontWeight: 600}}>
                   {log.msg}
                </div>
              ))}
           </div>
        </main>

        {/* RIGHT: AI STATUS */}
        <aside className="right-panel">
           <div className="panel-inner glass-sub">
              <h3 style={{fontSize: '0.9rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '15px', paddingBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.05)'}}>
                 Live Franchises
              </h3>
              <div className="franchise-list">
                 {Object.keys(aiTeams).map(t => {
                   const ai = aiTeams[t];
                   const isWinning = highestBidder === t;
                   const isThinking = aiThinkingTeam === t;
                   return (
                     <div key={t} className={`ai-card ${isWinning ? 'winning' : ''}`} style={{'--ai-col': ai.color || '#fff'}}>
                        <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                           <img src={`/teams/${t.toLowerCase()}.png`} alt={t} style={{width: '32px', height: '32px'}} />
                           <div>
                              <div style={{fontSize: '0.8rem', fontWeight: 800, color: '#fff'}}>{t}</div>
                              <div style={{fontSize: '0.7rem', color: '#cbd5e1'}}>₹{Math.max(0, ai.purse).toFixed(2)} · {ai.squad.length}/25</div>
                           </div>
                        </div>
                        {isWinning && <div className="ai-badge w">Highest</div>}
                        {isThinking && <div className="ai-badge t">...</div>}
                     </div>
                   );
                 })}
              </div>
           </div>
        </aside>

      </div>

      <style jsx>{`
        .auction-room-v2 {
          background: #0f172a;
          min-height: 100vh;
          font-family: 'DM Sans', sans-serif;
          color: white;
          overflow: hidden;
        }
        .room-nav {
          height: 60px; background: #020617; border-bottom: 1px solid rgba(255,255,255,0.05);
          display: flex; align-items: center; justify-content: space-between; padding: 0 30px;
        }
        .exit-btn {
          background: transparent; border: 1px solid rgba(255,255,255,0.1); color: #94a3b8;
          padding: 6px 14px; border-radius: 6px; font-size: 0.8rem; cursor: pointer; transition: all 0.2s;
        }
        .exit-btn:hover { background: rgba(255,255,255,0.05); color: white; }

        .auction-3-col {
          display: grid;
          grid-template-columns: 280px 1fr 280px;
          height: calc(100vh - 60px);
        }
        .panel-inner { height: 100%; padding: 20px; overflow-y: auto; background: rgba(255,255,255,0.01); border-right: 1px solid rgba(255,255,255,0.05); }
        .right-panel .panel-inner { border-right: none; border-left: 1px solid rgba(255,255,255,0.05); }

        .user-header { background: rgba(255,255,255,0.03); padding: 20px; border-radius: 12px; display: flex; align-items: center; margin-bottom: 20px; border: 1px solid rgba(255,255,255,0.05); }

        .center-panel {
          padding: 30px; display: flex; flex-direction: column; align-items: center; justify-content: flex-start;
          background: radial-gradient(circle at 50% -20%, rgba(16,185,129,0.05) 0%, transparent 60%);
          position: relative;
        }

        .podium-header { width: 100%; max-width: 600px; display: flex; justify-content: space-between; margin-bottom: 25px; }
        .set-badge { font-size: 0.75rem; font-weight: 800; color: #10b981; letter-spacing: 2px; }
        .queue-status { font-size: 0.75rem; color: #64748b; font-weight: 600; text-transform: uppercase; }

        .podium-card {
          width: 100%; max-width: 600px; background: #1e293b;
          border-radius: 24px; padding: 40px; text-align: center;
          position: relative; border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 40px 80px rgba(0,0,0,0.5);
          overflow: hidden;
        }
        .svg-timer-box { position: absolute; top: 20px; left: 20px; }

        .auction-overlay {
          position: absolute; top: 0; left: 0; right: 0; bottom: 0; z-index: 50;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Playfair Display', serif; font-size: 3rem; font-weight: 900; color: white;
          text-shadow: 0 4px 10px rgba(0,0,0,0.5); animation: stampIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
        }
        @keyframes stampIn { 0%{opacity:0;transform:scale(1.5) rotate(-10deg);} 100%{opacity:1;transform:scale(1) rotate(-5deg);} }

        .player-halo { width: 160px; height: 160px; margin: 0 auto 20px; background: rgba(0,0,0,0.2); border-radius: 50%; padding: 6px; border: 2px dashed rgba(255,255,255,0.1); }
        .player-halo img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; opacity: 0; animation: fadeImg 0.5s ease forwards; }
        @keyframes fadeImg { to{opacity:1;} }
        
        .plyr-name { font-family: 'Playfair Display', serif; font-size: 2.4rem; font-weight: 900; line-height: 1; margin-bottom: 15px; color: white; }
        .plyr-badges { display: flex; justify-content: center; gap: 8px; margin-bottom: 25px; }
        .role-tag, .nat-tag { padding: 4px 10px; border-radius: 100px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; background: rgba(255,255,255,0.05); color: #cbd5e1; border: 1px solid rgba(255,255,255,0.1); }
        .role-tag { color: #f59e0b; border-color: rgba(245,158,11,0.2); }

        .plyr-stats-strip {
          display: flex; justify-content: center; gap: 30px; margin-bottom: 30px;
          background: rgba(0,0,0,0.2); padding: 15px; border-radius: 12px;
        }
        .st-item { display: flex; flex-direction: column; }
        .st-val { font-size: 1.2rem; font-weight: 800; color: white; margin-bottom: 4px; }
        .st-lbl { font-size: 0.65rem; color: #64748b; text-transform: uppercase; letter-spacing: 1px; }

        .live-bid-display {
           background: rgba(0,0,0,0.4); padding: 20px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.05);
        }
        .lbd-title { font-size: 0.7rem; color: #94a3b8; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 8px; }
        .lbd-val { font-family: 'Playfair Display', serif; font-size: 3rem; font-weight: 900; line-height: 1; margin-bottom: 10px; transition: color 0.3s; }
        .lbd-team { font-size: 0.85rem; color: #cbd5e1; }

        .action-buttons {
          width: 100%; max-width: 600px; display: flex; gap: 15px; margin-top: 25px;
        }
        .bb { flex: 1; padding: 18px; border-radius: 14px; font-weight: 800; font-size: 0.9rem; cursor: pointer; border: none; transition: all 0.2s; font-family: 'DM Sans', sans-serif;}
        .bb:disabled { opacity: 0.4; cursor: not-allowed; }
        .bb.primary { background: #10b981; color: white; box-shadow: 0 10px 20px rgba(16,185,129,0.2); }
        .bb.primary:hover:not(:disabled) { transform: translateY(-2px); filter: brightness(1.1); }
        .bb.rtm { background: transparent; border: 2px solid #f59e0b; color: #f59e0b; }
        .bb.rtm:hover:not(:disabled) { background: #f59e0b; color: white; }

        .bottom-log {
          width: 100%; max-width: 600px; margin-top: 25px; height: 100px;
          background: rgba(0,0,0,0.2); border-radius: 12px; padding: 15px;
          overflow-y: auto; text-align: left;
          scrollbar-width: none;
        }
        .bottom-log::-webkit-scrollbar { display: none; }

        .ai-card {
           display: flex; align-items: center; justify-content: space-between;
           background: rgba(255,255,255,0.02); padding: 12px; border-radius: 10px; margin-bottom: 10px;
           border: 1px solid rgba(255,255,255,0.03); transition: all 0.3s;
        }
        .ai-card.winning { border-color: var(--ai-col); background: rgba(255,255,255,0.06); box-shadow: 0 0 15px rgba(255,255,255,0.05); }
        .ai-badge { font-size: 0.65rem; font-weight: 800; padding: 3px 6px; border-radius: 4px; text-transform: uppercase; }
        .ai-badge.w { background: var(--ai-col); color: black; }
        .ai-badge.t { background: #f59e0b; color: white; animation: pulse 1s infinite alternate; }
        @keyframes pulse { from{opacity:0.5;} to{opacity:1;} }

        @media (max-width: 1100px) {
           .auction-3-col { grid-template-columns: 1fr; height: auto; }
           .center-panel { min-height: 80vh; }
           .right-panel { display: none; }
        }
      `}</style>
    </div>
  );
}
