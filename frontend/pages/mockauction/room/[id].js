import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navbar from '../../../components/Navbar';
import { rtdb, auth } from '../../../utils/firebase';
import { ref, onValue, update, set } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';
import { teamsData } from '../../../data/teams';
import { preRetentions } from '../../../data/auctionPlayers';

const RETENTION_SLABS = [18, 14, 11, 18, 14, 4];

export default function MultiplayerRoomRoot() {
    const router = useRouter();
    const { id } = router.query;
    
    const [room, setRoom] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubAuth = onAuthStateChanged(auth, u => {
            if (!u && router.isReady) router.push('/mockauction/lobby');
            else setUser(u);
        });
        return () => unsubAuth();
    }, [router.isReady]);

    useEffect(() => {
        if (!id || !user) return;
        
        const roomRef = ref(rtdb, `rooms/${id}`);
        const unsubRoom = onValue(roomRef, (snapshot) => {
            if (snapshot.exists()) {
                setRoom(snapshot.val());
            } else {
                alert("Room closed or does not exist.");
                router.push('/mockauction/lobby');
            }
        });

        return () => unsubRoom();
    }, [id, user]);

    if (!room || !user) return <div style={{background: '#0f172a', height: '100vh', color: 'white', display:'flex', alignItems:'center', justifyContent:'center'}}>Loading Room Data...</div>;

    // Route to correct sub-component based on Room Status
    if (room.status === 'LOBBY') return <WaitingLobby roomId={id} room={room} user={user} />;
    if (room.status === 'RETENTION') return <MultiplayerRetention roomId={id} room={room} user={user} />;
    if (room.status === 'AUCTION') return <LiveAuctionRoom roomId={id} room={room} user={user} />;

    return <div>Unknown Status</div>;
}

// -------------------------------------------------------------
// 1. WAITING LOBBY COMPONENT
// -------------------------------------------------------------
function WaitingLobby({ roomId, room, user }) {
    const isHost = room.hostId === user.uid;
    const playersArr = Object.values(room.players || {});
    
    // Check if enough players have picked a franchise
    const readyPlayers = playersArr.filter(p => p.franchise);
    const canStart = readyPlayers.length >= 2;

    const selectFranchise = async (franchiseName) => {
        // Check if taken
        const isTaken = playersArr.some(p => p.franchise === franchiseName && p.uid !== user.uid); // Need uid, wait players object keys are UIDs
        
        // Actually construct an array with UIDs
        const lockCheck = Object.entries(room.players).find(([uid, p]) => p.franchise === franchiseName && uid !== user.uid);
        if (lockCheck) return; // Taken by someone else

        await update(ref(rtdb, `rooms/${roomId}/players/${user.uid}`), { franchise: franchiseName });
    };

    const hostStartPhase2 = async () => {
        if (!canStart) return;
        await update(ref(rtdb, `rooms/${roomId}`), { status: 'RETENTION' });
    };

    const allTeams = Object.keys(teamsData).map(k => teamsData[k]);

    return (
        <div className="dash-v2" style={{minHeight: '100vh', background: '#f8fafc', paddingBottom: '100px'}}>
            <Head><title>Wait Lobby | Code: {roomId}</title></Head>
            <Navbar />
            <div className="dash-inner" style={{paddingTop: '120px', maxWidth: '1200px', margin: '0 auto'}}>
                
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', padding: '30px', borderRadius: '20px', border: '1px solid #e2e8f0', marginBottom: '40px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)'}}>
                   <div>
                      <h2 style={{color: '#64748b', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px'}}>Room Code</h2>
                      <h1 style={{fontSize: '3.5rem', fontWeight: 900, color: '#0f172a', letterSpacing: '8px'}}>{roomId}</h1>
                   </div>
                   <div style={{textAlign: 'right'}}>
                      <div style={{display: 'flex', gap: '10px', marginBottom: '15px'}}>
                         <div style={{padding: '8px 16px', background: '#f1f5f9', borderRadius: '8px', fontWeight: 700, color: '#334155'}}>
                            👥 Players: {playersArr.length}/8
                         </div>
                         {isHost && (
                            <div style={{padding: '8px 16px', background: '#ecfdf5', color: '#10b981', borderRadius: '8px', fontWeight: 700}}>
                               👑 Room Host
                            </div>
                         )}
                      </div>
                      {isHost ? (
                          <button onClick={hostStartPhase2} disabled={!canStart} className="btn-primary" style={{padding: '12px 24px', opacity: canStart ? 1 : 0.5}}>
                              Start Retention Phase →
                          </button>
                      ) : (
                          <div style={{color: '#64748b', fontSize: '0.9rem', fontStyle: 'italic'}}>Waiting for host to start...</div>
                      )}
                      {!canStart && isHost && <div style={{color: '#ef4444', fontSize: '0.8rem', marginTop: '8px'}}>Need at least 2 players with franchises to start.</div>}
                   </div>
                </div>

                <div style={{marginBottom: '20px'}}>
                   <h3 style={{fontSize: '1.5rem', fontWeight: 800, color: '#0f172a'}}>Select Your Franchise</h3>
                   <p style={{color: '#64748b'}}>Claim your team before someone else does!</p>
                </div>

                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px'}}>
                   {allTeams.map(team => {
                      // Lookup who owns this team
                      const ownerEntry = Object.entries(room.players).find(([uid, p]) => p.franchise === team.name);
                      const isMine = ownerEntry && ownerEntry[0] === user.uid;
                      const isTaken = ownerEntry && !isMine;
                      const ownerName = ownerEntry ? ownerEntry[1].name : null;

                      return (
                         <div 
                           key={team.name}
                           onClick={() => selectFranchise(team.name)}
                           style={{
                              background: '#fff', borderRadius: '16px', padding: '20px', textAlign: 'center', cursor: isTaken ? 'not-allowed' : 'pointer',
                              border: `2px solid ${isMine ? '#10b981' : (isTaken ? '#e2e8f0' : 'transparent')}`,
                              opacity: isTaken ? 0.6 : 1, transform: isMine ? 'scale(1.02)' : 'scale(1)', transition: 'all 0.2s',
                              boxShadow: isMine ? '0 10px 20px rgba(16,185,129,0.1)' : '0 4px 6px rgba(0,0,0,0.02)'
                           }}
                         >
                            <img src={`/teams/${team.name.toLowerCase()}.png`} style={{height: '60px', width: 'auto', marginBottom: '15px'}} />
                            <h4 style={{color: '#0f172a', fontWeight: 800, fontSize: '1.1rem'}}>{team.name}</h4>
                            
                            {isMine ? (
                               <div style={{marginTop: '10px', color: '#10b981', fontWeight: 800, fontSize: '0.8rem'}}>✓ YOUR PICK</div>
                            ) : isTaken ? (
                               <div style={{marginTop: '10px', color: '#94a3b8', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px'}}>
                                  🔒 {ownerName}
                               </div>
                            ) : (
                               <div style={{marginTop: '10px', color: '#64748b', fontSize: '0.8rem'}}>₹ 120.0 Cr Wallet</div>
                            )}
                         </div>
                      );
                   })}
                </div>
            </div>
        </div>
    );
}

// -------------------------------------------------------------
// 2. RETENTION COMPONENT (Multiplayer Sync)
// -------------------------------------------------------------
function MultiplayerRetention({ roomId, room, user }) {
    const isHost = room.hostId === user.uid;
    const myPlayerInfo = room.players[user.uid];
    const myFranchise = myPlayerInfo.franchise;
    
    // Fallback if someone didn't pick a franchise but got pushed
    if (!myFranchise) return <div style={{textAlign:'center', padding:'100px'}}>Wait! You didn't select a franchise. You will act as a spectator.</div>;

    const [localRetentions, setLocalRetentions] = useState(myPlayerInfo.retentions || []);
    
    const toggleRetention = (player) => {
        if (myPlayerInfo.isReady) return; // Locked
        const exists = localRetentions.some(p => p.name === player.name);
        if (exists) setLocalRetentions(localRetentions.filter(p => p.name !== player.name));
        else {
            if (localRetentions.length >= 6) return alert("Maximum 6 retentions allowed.");
            setLocalRetentions([...localRetentions, { ...player, cost: RETENTION_SLABS[localRetentions.length] || 4 }]);
        }
    };

    const confirmRetentions = async () => {
        await update(ref(rtdb, `rooms/${roomId}/players/${user.uid}`), {
            retentions: localRetentions,
            rtmCards: 6 - localRetentions.length,
            purse: 120 - localRetentions.reduce((tot, p) => tot + p.cost, 0),
            isReady: true
        });
    };

    // Watch for ALL players to be ready
    useEffect(() => {
        if (!isHost) return;
        const playersArr = Object.values(room.players);
        // Only consider players who picked a franchise
        const franchisedPlayers = playersArr.filter(p => p.franchise);
        const allReady = franchisedPlayers.every(p => p.isReady);

        if (allReady && franchisedPlayers.length > 0 && !room.auctionState) {
            // Trigger transition to AUCTION
            // First, Setup AI Teams for unpicked franchises
            const aiTeams = {};
            const pickedTeams = franchisedPlayers.map(p => p.franchise);
            Object.keys(teamsData).forEach(key => {
               if (!pickedTeams.includes(key)) {
                  const aiSquad = preRetentions[key] || [];
                  const mappedAiSquad = aiSquad.map((p, i) => ({ ...p, price: RETENTION_SLABS[i] || 4 }));
                  const aiDeduction = mappedAiSquad.reduce((tot, p) => tot + p.price, 0);
                  aiTeams[key] = {
                      name: key,
                      purse: 120 - aiDeduction,
                      squad: mappedAiSquad,
                      color: teamsData[key].color,
                      isAI: true
                  };
               }
            });

            const initState = {
               status: 'AUCTION',
               auctionState: {
                   aiTeams, 
                   currentSet: 1,
                   playerIndex: 0,
                   biddingActive: false,
                   currentPlayer: null,
                   currentBid: 0,
                   highestBidder: 'None',
                   auctionEnded: false
               }
            };
            
            update(ref(rtdb, `rooms/${roomId}`), initState);
        }
    }, [room, isHost]);

    const isReady = myPlayerInfo.isReady;
    const currentDeduction = localRetentions.reduce((tot, p) => tot + (p.cost || 4), 0);

    return (
        <div className="dash-v2" style={{minHeight: '100vh', background: '#f8fafc', paddingBottom: '100px'}}>
             <Head><title>Retention Phase | Room {roomId}</title></Head>
             <Navbar />
             <div className="dash-inner" style={{paddingTop: '120px', maxWidth: '1200px', margin: '0 auto'}}>
                
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px'}}>
                   <div>
                       <h1 style={{fontSize: '2.5rem', fontWeight: 900, color: '#0f172a', fontFamily: "'Playfair Display', serif"}}>Retention <em style={{color: '#10b981'}}>Phase.</em></h1>
                       <p style={{color: '#64748b'}}>Select up to 6 players to carry over to the mega auction.</p>
                   </div>
                   <div style={{textAlign: 'right'}}>
                       <div style={{fontSize: '0.9rem', color: '#64748b', marginBottom: '5px'}}>Lobby Readiness</div>
                       <div style={{display: 'flex', gap: '5px'}}>
                           {Object.values(room.players).filter(p=>p.franchise).map((p, i) => (
                              <div key={i} title={p.name} style={{width: '30px', height: '30px', borderRadius: '50%', background: p.isReady ? '#10b981' : '#cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '10px', fontWeight: 'bold', border: '2px solid #fff'}}>
                                 {p.franchise.substring(0,2)}
                              </div>
                           ))}
                       </div>
                   </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '30px' }}>
                    
                    {/* LEFT POOL */}
                    <div style={{background: '#fff', padding: '30px', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 20px 40px rgba(0,0,0,0.05)'}}>
                         <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px'}}>
                             {(preRetentions[myFranchise] || []).map((player, i) => {
                                 const isSelected = localRetentions.some(p => p.name === player.name);
                                 return (
                                     <div 
                                         key={i} 
                                         onClick={() => toggleRetention(player)}
                                         style={{
                                             border: `2px solid ${isSelected ? '#10b981' : '#e2e8f0'}`, background: isSelected ? '#ecfdf5' : '#fff',
                                             padding: '15px', borderRadius: '16px', cursor: isReady ? 'not-allowed' : 'pointer', transition: 'all 0.2s',
                                             position: 'relative'
                                         }}
                                     >
                                         <img src={player.imageUrl} alt={player.name} style={{width: '50px', height: '50px', borderRadius: '10px', marginBottom: '10px', background: '#cbd5e1', objectFit: 'cover'}} />
                                         <h4 style={{fontWeight: 800, color: '#0f172a', fontSize: '1rem', marginBottom: '2px'}}>{player.name}</h4>
                                         <p style={{color: '#64748b', fontSize: '0.8rem'}}>{player.role}</p>
                                         {isSelected && <div style={{position: 'absolute', top: -10, right: -10, width: 24, height: 24, background: '#10b981', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 900, border: '2px solid #fff'}}>✓</div>}
                                     </div>
                                 )
                             })}
                         </div>
                    </div>

                    {/* RIGHT SUMMARY */}
                    <div style={{background: '#0f172a', color: '#fff', padding: '30px', borderRadius: '20px', alignSelf: 'start'}}>
                         <div style={{textAlign: 'center', marginBottom: '20px'}}>
                            <img src={`/teams/${myFranchise.toLowerCase()}.png`} style={{height: '60px'}} />
                         </div>
                         <div style={{display:'flex', justifyContent:'space-between', color: '#94a3b8', marginBottom: '10px'}}><span>Total Budget</span><span style={{color:'#fff'}}>₹120.0 Cr</span></div>
                         <div style={{display:'flex', justifyContent:'space-between', color: '#ef4444', marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid rgba(255,255,255,0.1)'}}><span>Retentions</span><span style={{fontWeight: 800}}>-₹{currentDeduction.toFixed(1)} Cr</span></div>
                         <div style={{display:'flex', justifyContent:'space-between', fontSize: '1.4rem', fontWeight: 900, marginBottom: '30px'}}><span>Purse Available</span><span style={{color: '#10b981'}}>₹{(120 - currentDeduction).toFixed(1)} Cr</span></div>
                         
                         <h4 style={{color: '#94a3b8', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '10px'}}>Retained ({localRetentions.length}/6)</h4>
                         <ul style={{listStyle: 'none', padding: 0, margin: '0 0 30px 0'}}>
                             {localRetentions.map((r, idx) => (
                                <li key={idx} style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600}}>
                                   <span>{r.name}</span>
                                   <span style={{color: '#f59e0b'}}>-₹{r.cost} Cr</span>
                                </li>
                             ))}
                         </ul>

                         {!isReady ? (
                             <button onClick={confirmRetentions} className="btn-primary" style={{width: '100%', padding: '16px', borderRadius: '12px', fontSize: '1.1rem'}}>
                                 Lock Retentions 🔒
                             </button>
                         ) : (
                             <div style={{background: 'rgba(16,185,129,0.1)', color: '#10b981', padding: '16px', borderRadius: '12px', textAlign: 'center', fontWeight: 800, border: '1px solid rgba(16,185,129,0.3)'}}>
                                 Waiting for other players...
                             </div>
                         )}
                    </div>
                </div>
             </div>
        </div>
    );
}

import { auctionPlayers } from '../../../data/auctionPlayers';

// -------------------------------------------------------------
// 3. LIVE MULTIPLAYER AUCTION ROOM
// -------------------------------------------------------------
function LiveAuctionRoom({ roomId, room, user }) {
    const router = useRouter();
    const isHost = room.hostId === user.uid;
    const state = room.auctionState;
    const myPlayerInfo = room.players[user.uid];
    
    const [timer, setTimer] = useState(15);
    const [overlayMsg, setOverlayMsg] = useState(null);
    const [logs, setLogs] = useState([]);

    // Sort Queue once for the Host
    const [rawQueue] = useState([...auctionPlayers].sort((a,b) => a.set - b.set));

    // HOST ONLY: Initialize first player if empty
    useEffect(() => {
        if (!isHost || !state) return;
        if (!state.currentPlayer && !state.auctionEnded) {
            setupNextPlayer(0);
        }
    }, [isHost, state]);

    const setupNextPlayer = async (index) => {
        if (index >= rawQueue.length) {
            await update(ref(rtdb, `rooms/${roomId}/auctionState`), { auctionEnded: true });
            
            // HOST ONLY pushes the final result to Firestore
            if (isHost) {
                try {
                    const { addDoc, collection } = await import('firebase/firestore');
                    const { db } = await import('../../../utils/firebase');
                    
                    // Create a sanitized record
                    const fPlayers = {};
                    Object.values(room.players).forEach(p => { fPlayers[p.name] = { franchise: p.franchise, squad: p.squad || [], retentions: p.retentions || [], purse: p.purse }; });
                    const fAi = {};
                    if(state.aiTeams) Object.values(state.aiTeams).forEach(ai => { fAi[ai.name] = { franchise: ai.name, squad: ai.squad || [], purse: ai.purse }; });
                    
                    await addDoc(collection(db, "auctions"), {
                       roomCode: roomId,
                       date: new Date().toISOString(),
                       hostId: room.hostId,
                       participantUids: Object.keys(room.players),
                       results: { ...fPlayers, ...fAi }
                    });
                } catch (e) { console.error("History Save Error:", e); }
            }
            return;
        }
        const next = rawQueue[index];
        await update(ref(rtdb, `rooms/${roomId}/auctionState`), {
            currentPlayer: next,
            currentSet: next.set,
            playerIndex: index,
            biddingActive: true,
            currentBid: next.basePrice / 100,
            highestBidder: 'None',
            timerEndsAt: Date.now() + 15000,
            overlayMsg: null
        });
        appendLog(`--- NEXT PLAYER: ${next.name} (Base ₹${next.basePrice/100}Cr) ---`, '#64748b');
    };

    // VISUAL TIMER SYNC (All Clients)
    useEffect(() => {
        if (!state?.biddingActive || !state?.timerEndsAt) return;
        const interval = setInterval(() => {
            const left = Math.max(0, Math.ceil((state.timerEndsAt - Date.now()) / 1000));
            setTimer(left);
            
            // HOST ONLY: Handle Hammer Drop
            if (left === 0 && isHost) {
                clearInterval(interval);
                handleHammerDrop();
            }
        }, 200);
        return () => clearInterval(interval);
    }, [state?.biddingActive, state?.timerEndsAt, isHost]);

    // HOST ONLY: AI Bidding Loop
    useEffect(() => {
        if (!isHost || !state?.biddingActive || state?.highestBidder === 'None') return;
        // If human is highest bidder, AI might counter. If AI is highest bidder, another AI might counter.
        // Wait, for simplicity, AI counters if possible.
        const timeout = setTimeout(async () => {
             // Basic AI logic for Host taking action
             const eligibleAIs = Object.entries(state.aiTeams || {}).filter(([name, data]) => name !== state.highestBidder && data.purse >= state.currentBid + 0.5);
             if (eligibleAIs.length > 0 && Math.random() < 0.4) {
                 const [aiName] = eligibleAIs[Math.floor(Math.random() * eligibleAIs.length)];
                 const nextBid = state.currentBid + (state.currentBid < 5 ? 0.25 : 0.5);
                 await update(ref(rtdb, `rooms/${roomId}/auctionState`), {
                     currentBid: nextBid,
                     highestBidder: aiName,
                     timerEndsAt: Date.now() + 10000 // Reset to 10s
                 });
                 appendLog(`⭐ ${aiName} (AI) raised to ₹${nextBid} Cr!`, '#ffffff');
             }
        }, 1500 + Math.random() * 2000);
        return () => clearTimeout(timeout);
    }, [isHost, state?.highestBidder, state?.currentBid, state?.biddingActive]);

    const handleHammerDrop = async () => {
        await update(ref(rtdb, `rooms/${roomId}/auctionState`), { biddingActive: false });
        
        if (state.highestBidder === 'None') {
            await update(ref(rtdb, `rooms/${roomId}/auctionState`), { overlayMsg: 'UNSOLD' });
            appendLog(`UNSOLD - No bids for ${state.currentPlayer.name}.`, '#ef4444');
        } else {
            await update(ref(rtdb, `rooms/${roomId}/auctionState`), { overlayMsg: 'SOLD' });
            appendLog(`SOLD! ${state.currentPlayer.name} to ${state.highestBidder} for ₹${state.currentBid} Cr!`, '#10b981');
            
            // Deduct purse and add player
            const isAI = state.aiTeams && state.aiTeams[state.highestBidder];
            if (isAI) {
                const aiPath = `rooms/${roomId}/auctionState/aiTeams/${state.highestBidder}`;
                const aiData = state.aiTeams[state.highestBidder];
                await update(ref(rtdb, aiPath), {
                    purse: aiData.purse - state.currentBid,
                    squad: [...(aiData.squad || []), { ...state.currentPlayer, price: state.currentBid }]
                });
            } else {
                // Find which human won it (by matching franchise name)
                const winnerEntry = Object.entries(room.players).find(([uid, p]) => p.franchise === state.highestBidder);
                if (winnerEntry) {
                    const winUid = winnerEntry[0];
                    const pData = winnerEntry[1];
                    await update(ref(rtdb, `rooms/${roomId}/players/${winUid}`), {
                        purse: pData.purse - state.currentBid,
                        squad: [...(pData.squad || []), { ...state.currentPlayer, price: state.currentBid }]
                    });
                }
            }
        }

        setTimeout(() => {
            setupNextPlayer(state.playerIndex + 1);
        }, 3000);
    };

    const appendLog = async (msg, color) => {
        const id = Date.now();
        await set(ref(rtdb, `rooms/${roomId}/logs/${id}`), { msg, color, id });
    };

    // Client listens to remote logs
    useEffect(() => {
        const logsRef = ref(rtdb, `rooms/${roomId}/logs`);
        const unsub = onValue(logsRef, snap => {
            if(snap.exists()) {
                const arr = Object.values(snap.val()).sort((a,b) => a.id - b.id);
                setLogs(arr);
            }
        });
        return () => unsub();
    }, [roomId]);

    const userRaise = async (increment) => {
        if (!state.biddingActive) return;
        const newBid = state.highestBidder === 'None' ? (state.currentPlayer.basePrice/100) : state.currentBid + increment;
        if (myPlayerInfo.purse < newBid) return alert("Insufficient Purse!");
        
        await update(ref(rtdb, `rooms/${roomId}/auctionState`), {
            currentBid: newBid,
            highestBidder: myPlayerInfo.franchise,
            timerEndsAt: Date.now() + 10000
        });
        
        appendLog(`⭐ ${myPlayerInfo.franchise} raised to ₹${newBid} Cr!`, '#10b981');
    };

    if (!state?.currentPlayer && !state?.auctionEnded) return <div style={{background: '#0f172a', height: '100vh', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Preparing live stage...</div>;

    if (state?.auctionEnded) {
         return (
             <div style={{background: '#0f172a', minHeight: '100vh', color: '#fff', textAlign: 'center', paddingTop: '100px'}}>
                 <h1 style={{fontSize: '3rem', fontFamily: "'Playfair Display', serif"}}>Auction Complete! 🎉</h1>
                 <button onClick={() => router.push('/')} className="btn-primary" style={{marginTop: '30px', padding: '15px 30px'}}>Return Home</button>
             </div>
         );
    }

    const DASH_ARRAY = 283;
    const dashOffset = DASH_ARRAY - (DASH_ARRAY * timer) / 15;
    
    // Combine Humans and AIs for Ledger
    const allFranchises = [];
    Object.values(room.players).forEach(p => { if(p.franchise) allFranchises.push({ name: p.franchise, purse: p.purse, squadLen: (p.squad?.length||0) + (p.retentions?.length||0), isHuman: true }); });
    if(state.aiTeams) Object.values(state.aiTeams).forEach(ai => allFranchises.push({ name: ai.name, purse: ai.purse, squadLen: ai.squad?.length || 0, isHuman: false }));

    return (
        <div className="auction-room-v2">
           <Head><title>Live Multiplayer | {roomId}</title></Head>

           <div className="room-nav">
              <div style={{fontWeight: 900, fontStyle: 'italic', color: '#10b981'}}>Cricket<span style={{color:'white'}}>Decoded</span></div>
              <div style={{fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '2px'}}>Live Multiplayer Room</div>
              <button onClick={() => router.push('/')} className="exit-btn">Exit Match</button>
           </div>

           <div className="auction-3-col">
              
              {/* LEFT */}
              <aside className="left-panel">
                 <div className="panel-inner glass-sub">
                    <div className="user-header">
                       <img src={`/teams/${myPlayerInfo.franchise.toLowerCase()}.png`} style={{width:'50px', height:'50px'}} />
                       <div style={{marginLeft: '15px'}}>
                          <div style={{fontSize: '0.85rem', color: '#94a3b8', textTransform: 'uppercase'}}>Your Purse</div>
                          <div style={{fontSize: '1.6rem', fontWeight: 900, color: '#f59e0b'}}>₹{myPlayerInfo.purse.toFixed(2)} Cr</div>
                       </div>
                    </div>
                    <div className="squad-list">
                       <h4 style={{fontSize: '0.8rem', color: '#64748b', marginBottom: '10px', paddingBottom: '5px'}}>My Retentions</h4>
                       <ul style={{listStyle:'none', padding:0, fontSize: '0.8rem'}}>
                          {(myPlayerInfo.retentions||[]).map((r,i)=><li key={i} style={{color:'#94a3b8', padding: '4px 0'}}>🔒 {r.name}</li>)}
                       </ul>
                       <h4 style={{fontSize: '0.8rem', color: '#64748b', marginTop: '15px', marginBottom: '10px', paddingBottom: '5px'}}>My Purchases</h4>
                       <ul style={{listStyle:'none', padding:0, fontSize: '0.85rem'}}>
                          {(myPlayerInfo.squad||[]).map((p,i)=><li key={i} style={{color:'#fff', padding: '6px 0', display:'flex', justifyContent:'space-between'}}><span>{p.name}</span><span style={{color:'#10b981'}}>₹{p.price} Cr</span></li>)}
                       </ul>
                    </div>
                 </div>
              </aside>

              {/* CENTER */}
              <main className="center-panel">
                 <div className="podium-header">
                    <span className="set-badge">SET {state.currentSet}</span>
                 </div>
                 
                 <div className={`podium-card ${state.overlayMsg ? 'msg-active' : ''}`}>
                    <div className="svg-timer-box">
                       <svg viewBox="0 0 100 100" style={{width: '90px', height: '90px', transform: 'rotate(-90deg)'}}>
                          <circle cx="50" cy="50" r="45" fill="black" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
                          <path strokeDasharray="283" strokeDashoffset={dashOffset} stroke={timer <= 5 ? '#ef4444' : '#10b981'} strokeWidth="6" strokeLinecap="round" fill="none" style={{transition: 'stroke-dashoffset 1s linear, stroke 0.3s'}} d="M 50, 50 m -45, 0 a 45,45 0 1,0 90,0 a 45,45 0 1,0 -90,0" />
                          <text x="50" y="50" transform="rotate(90 50 50)" textAnchor="middle" dy=".3em" fill="white" fontSize="28" fontWeight="900" fontFamily="Playfair Display">
                             0:{timer < 10 ? `0${timer}` : timer}
                          </text>
                       </svg>
                    </div>

                    {state.overlayMsg && (
                       <div className="auction-overlay" style={{background: state.overlayMsg === 'SOLD' ? 'rgba(16,185,129,0.95)' : 'rgba(239,68,68,0.95)'}}>
                          {state.overlayMsg === 'SOLD' ? `SOLD TO ${state.highestBidder} 🔨` : 'UNSOLD ❌'}
                       </div>
                    )}

                    <div className="player-halo">
                       <img 
                         src={state.currentPlayer.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(state.currentPlayer.name)}&background=1DB954&color=fff`} 
                         alt={state.currentPlayer.name} 
                         onError={(e)=>{e.target.src=`https://ui-avatars.com/api/?name=${encodeURIComponent(state.currentPlayer.name)}&background=1DB954&color=fff`}} 
                       />
                    </div>
                    <h1 className="plyr-name">{state.currentPlayer.name}</h1>
                    <div className="plyr-badges">
                       <span className="role-tag">{state.currentPlayer.role}</span>
                    </div>

                    <div className="live-bid-display">
                       <div className="lbd-title">Current Bid</div>
                       <div className="lbd-val" style={{color: state.highestBidder === myPlayerInfo.franchise ? '#10b981' : (state.highestBidder === 'None' ? '#fff' : '#f59e0b')}}>
                          ₹ {state.currentBid.toFixed(2)} Cr
                       </div>
                       {state.highestBidder !== 'None' && (
                          <div className="lbd-team">Leading: <span style={{fontWeight: 800, background: 'rgba(255,255,255,0.1)', padding:'2px 8px', borderRadius:'4px'}}>{state.highestBidder}</span></div>
                       )}
                    </div>
                 </div>

                 <div className="action-buttons">
                    <button onClick={() => userRaise(0.25)} disabled={!state.biddingActive || state.highestBidder === myPlayerInfo.franchise} className="bb primary">
                       ⬆ Raise ₹0.25 Cr
                    </button>
                    <button onClick={() => userRaise(0.50)} disabled={!state.biddingActive || state.highestBidder === myPlayerInfo.franchise} className="bb primary">
                       ⬆ Raise ₹0.50 Cr
                    </button>
                    {myPlayerInfo.rtmCards > 0 && state.highestBidder !== 'None' && state.highestBidder !== myPlayerInfo.franchise && state.currentPlayer.previousTeam === myPlayerInfo.franchise && (
                       <button onClick={() => userRaise(0)} disabled={!state.biddingActive} className="bb rtm">
                          🃏 Match RTM
                       </button>
                    )}
                 </div>

                 <div className="bottom-log">
                    {logs.map(log => (
                      <div key={log.id} style={{color: log.color, marginBottom: '6px', fontSize: '0.85rem', fontWeight: 600}}>
                         {log.msg}
                      </div>
                    ))}
                 </div>
              </main>

              {/* RIGHT */}
              <aside className="right-panel">
                 <div className="panel-inner glass-sub">
                    <h3 style={{fontSize: '0.9rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '15px', paddingBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.05)'}}>Live Franchises</h3>
                    <div className="franchise-list">
                       {allFranchises.map(t => {
                         const isWinning = state.highestBidder === t.name;
                         return (
                           <div key={t.name} className={`ai-card ${isWinning ? 'winning' : ''}`} style={{'--ai-col': '#1DB954'}}>
                              <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                                 <img src={`/teams/${t.name.toLowerCase()}.png`} style={{width: '32px', height: '32px'}} />
                                 <div>
                                    <div style={{fontSize: '0.8rem', fontWeight: 800, color: '#fff'}}>{t.name} {t.isHuman && '👤'}</div>
                                    <div style={{fontSize: '0.7rem', color: '#cbd5e1'}}>₹{Math.max(0, t.purse).toFixed(2)} · {t.squadLen}/25</div>
                                 </div>
                              </div>
                              {isWinning && <div className="ai-badge w">Highest</div>}
                           </div>
                         );
                       })}
                    </div>
                 </div>
              </aside>
           </div>
           
           <style jsx>{`
            /* Include styles exactly matching the V2 Play UI */
            .auction-room-v2 { background: #0f172a; min-height: 100vh; font-family: 'DM Sans', sans-serif; color: white; overflow: hidden; }
            .room-nav { height: 60px; background: #020617; border-bottom: 1px solid rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: space-between; padding: 0 30px; }
            .exit-btn { background: transparent; border: 1px solid rgba(255,255,255,0.1); color: #94a3b8; padding: 6px 14px; border-radius: 6px; font-size: 0.8rem; cursor: pointer; transition: all 0.2s; }
            .auction-3-col { display: grid; grid-template-columns: 280px 1fr 280px; height: calc(100vh - 60px); }
            .panel-inner { height: 100%; padding: 20px; overflow-y: auto; background: rgba(255,255,255,0.01); border-right: 1px solid rgba(255,255,255,0.05); }
            .right-panel .panel-inner { border-right: none; border-left: 1px solid rgba(255,255,255,0.05); }
            .user-header { background: rgba(255,255,255,0.03); padding: 20px; border-radius: 12px; display: flex; align-items: center; margin-bottom: 20px; border: 1px solid rgba(255,255,255,0.05); }
            .center-panel { padding: 30px; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; background: radial-gradient(circle at 50% -20%, rgba(16,185,129,0.05) 0%, transparent 60%); position: relative; }
            .podium-header { width: 100%; max-width: 600px; display: flex; justify-content: space-between; margin-bottom: 25px; }
            .set-badge { font-size: 0.75rem; font-weight: 800; color: #10b981; letter-spacing: 2px; }
            .podium-card { width: 100%; max-width: 600px; background: #1e293b; border-radius: 24px; padding: 40px; text-align: center; position: relative; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 40px 80px rgba(0,0,0,0.5); overflow: hidden; }
            .svg-timer-box { position: absolute; top: 20px; left: 20px; }
            .auction-overlay { position: absolute; top: 0; left: 0; right: 0; bottom: 0; z-index: 50; display: flex; align-items: center; justify-content: center; font-family: 'Playfair Display', serif; font-size: 3rem; font-weight: 900; color: white; text-shadow: 0 4px 10px rgba(0,0,0,0.5); }
            .player-halo { width: 160px; height: 160px; margin: 0 auto 20px; background: rgba(0,0,0,0.2); border-radius: 50%; padding: 6px; border: 2px dashed rgba(255,255,255,0.1); }
            .player-halo img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; }
            .plyr-name { font-family: 'Playfair Display', serif; font-size: 2.4rem; font-weight: 900; line-height: 1; margin-bottom: 15px; color: white; }
            .plyr-badges { display: flex; justify-content: center; gap: 8px; margin-bottom: 25px; }
            .role-tag { padding: 4px 10px; border-radius: 100px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; background: rgba(255,255,255,0.05); color: #cbd5e1; border: 1px solid rgba(255,255,255,0.1); color: #f59e0b; border-color: rgba(245,158,11,0.2); }
            .live-bid-display { background: rgba(0,0,0,0.4); padding: 20px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.05); }
            .lbd-title { font-size: 0.7rem; color: #94a3b8; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 8px; }
            .lbd-val { font-family: 'Playfair Display', serif; font-size: 3rem; font-weight: 900; line-height: 1; margin-bottom: 10px; transition: color 0.3s; }
            .action-buttons { width: 100%; max-width: 600px; display: flex; gap: 15px; margin-top: 25px; }
            .bb { flex: 1; padding: 18px; border-radius: 14px; font-weight: 800; font-size: 0.9rem; cursor: pointer; border: none; transition: all 0.2s; font-family: 'DM Sans', sans-serif;}
            .bb:disabled { opacity: 0.4; cursor: not-allowed; }
            .bb.primary { background: #10b981; color: white; box-shadow: 0 10px 20px rgba(16,185,129,0.2); }
            .bb.primary:hover:not(:disabled) { transform: translateY(-2px); filter: brightness(1.1); }
            .bb.rtm { background: transparent; border: 2px solid #f59e0b; color: #f59e0b; }
            .bottom-log { width: 100%; max-width: 600px; margin-top: 25px; height: 100px; background: rgba(0,0,0,0.2); border-radius: 12px; padding: 15px; overflow-y: auto; text-align: left; scrollbar-width: none; }
            .bottom-log::-webkit-scrollbar { display: none; }
            .ai-card { display: flex; align-items: center; justify-content: space-between; background: rgba(255,255,255,0.02); padding: 12px; border-radius: 10px; margin-bottom: 10px; border: 1px solid rgba(255,255,255,0.03); transition: all 0.3s; }
            .ai-card.winning { border-color: var(--ai-col); background: rgba(255,255,255,0.06); box-shadow: 0 0 15px rgba(255,255,255,0.05); }
            .ai-badge { font-size: 0.65rem; font-weight: 800; padding: 3px 6px; border-radius: 4px; text-transform: uppercase; }
            .ai-badge.w { background: var(--ai-col); color: black; }
           `}</style>
        </div>
    );
}
