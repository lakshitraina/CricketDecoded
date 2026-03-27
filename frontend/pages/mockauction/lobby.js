import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import { rtdb, auth, googleProvider } from '../../utils/firebase';
import { ref, set, get, child } from 'firebase/database';
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth';

const generateRoomCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let res = '';
    for(let i=0; i<6; i++) res += chars.charAt(Math.floor(Math.random() * chars.length));
    return res;
};

export default function MultiplayerLobby() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [mode, setMode] = useState(null); // 'CREATE' | 'JOIN'
    
    // Form States
    const [roomName, setRoomName] = useState('');
    const [joinCode, setJoinCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
       const unsub = onAuthStateChanged(auth, u => setUser(u));
       return () => unsub();
    }, []);

    const requireAuth = async () => {
       if (!user) {
          try { await signInWithPopup(auth, googleProvider); return true; } 
          catch (e) { return false; }
       }
       return true;
    };

    const handleCreateRoom = async () => {
       if (!roomName.trim()) return setError('Room name is required');
       const authed = await requireAuth();
       if (!authed) return;

       setLoading(true);
       const code = generateRoomCode();
       const uid = auth.currentUser.uid;
       
       const roomRef = ref(rtdb, `rooms/${code}`);
       await set(roomRef, {
           name: roomName,
           hostId: uid,
           status: 'LOBBY',
           players: {
              [uid]: {
                 name: auth.currentUser.displayName || 'Host Player',
                 photo: auth.currentUser.photoURL || '',
                 franchise: null,
                 isReady: false
              }
           },
           createdAt: Date.now()
       });

       router.push(`/mockauction/room/${code}`);
    };

    const handleJoinRoom = async () => {
       if (joinCode.length !== 6) return setError('Enter a valid 6-character code');
       const authed = await requireAuth();
       if (!authed) return;

       setLoading(true);
       const code = joinCode.toUpperCase();
       
       const snapshot = await get(child(ref(rtdb), `rooms/${code}`));
       if (!snapshot.exists()) {
           setLoading(false);
           return setError('Room not found! Check the code.');
       }

       const roomData = snapshot.val();
       if (roomData.status !== 'LOBBY') {
           setLoading(false);
           return setError('Auction has already started in this room.');
       }

       const uid = auth.currentUser.uid;
       
       // Add player to room if not already there
       if (!roomData.players[uid]) {
           await set(ref(rtdb, `rooms/${code}/players/${uid}`), {
               name: auth.currentUser.displayName || 'Guest Player',
               photo: auth.currentUser.photoURL || '',
               franchise: null,
               isReady: false
           });
       }

       router.push(`/mockauction/room/${code}`);
    };

    return (
      <div className="dash-v2" style={{minHeight: '100vh', background: '#f8fafc', fontFamily: "'DM Sans', sans-serif"}}>
         <Head><title>Multiplayer Lobby | Cricket Decoded</title></Head>
         <Navbar />

         <div className="dash-inner" style={{paddingTop: '120px', display: 'flex', justifyContent: 'center'}}>
            
            <div className="lobby-card glass-panel" style={{maxWidth: '500px', width: '100%', background: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', textAlign: 'center'}}>
               <div style={{fontSize: '3rem', marginBottom: '10px'}}>👥</div>
               <h1 style={{fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: '2.5rem', marginBottom: '10px', color: '#0f172a'}}>
                  Play With <em style={{color: '#10b981', fontStyle: 'italic'}}>Friends.</em>
               </h1>
               <p style={{color: '#64748b', fontSize: '1rem', marginBottom: '40px'}}>Join a live room or create your own to battle against your friends in real-time.</p>

               {!mode ? (
                  <div style={{display: 'grid', gap: '15px'}}>
                     <button onClick={() => setMode('CREATE')} className="btn-primary" style={{padding: '16px', fontSize: '1.1rem', borderRadius: '12px'}}>
                        + Create New Room
                     </button>
                     <button onClick={() => setMode('JOIN')} className="btn-secondary" style={{padding: '16px', fontSize: '1.1rem', borderRadius: '12px', background: '#f1f5f9', border: 'none'}}>
                        → Join Existing Room
                     </button>
                  </div>
               ) : (
                  <div className="mode-form">
                     <button onClick={() => {setMode(null); setError('');}} style={{background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '0.9rem', marginBottom: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px'}}>
                        ← Back
                     </button>

                     {error && <div style={{background: '#fee2e2', color: '#ef4444', padding: '10px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.9rem', fontWeight: 600}}>{error}</div>}

                     {mode === 'CREATE' && (
                        <>
                           <label style={{display: 'block', textAlign: 'left', fontWeight: 700, marginBottom: '8px', color: '#334155'}}>Room Name</label>
                           <input type="text" value={roomName} onChange={e=>setRoomName(e.target.value)} placeholder="e.g. Weekend Mega Auction" style={{width: '100%', padding: '15px', borderRadius: '10px', border: '2px solid #e2e8f0', marginBottom: '25px', fontSize: '1rem', outline: 'none'}} />
                           <button onClick={handleCreateRoom} disabled={loading} className="btn-primary" style={{width: '100%', padding: '18px', fontSize: '1.1rem', borderRadius: '12px'}}>
                              {loading ? 'Creating...' : 'Create & Enter Lobby'}
                           </button>
                        </>
                     )}

                     {mode === 'JOIN' && (
                        <>
                           <label style={{display: 'block', textAlign: 'left', fontWeight: 700, marginBottom: '8px', color: '#334155'}}>6-Character Room Code</label>
                           <input type="text" value={joinCode} onChange={e=>setJoinCode(e.target.value.toUpperCase())} maxLength={6} placeholder="e.g. RCB42X" style={{width: '100%', padding: '15px', borderRadius: '10px', border: '2px solid #e2e8f0', marginBottom: '25px', fontSize: '1.4rem', letterSpacing: '4px', textAlign: 'center', fontWeight: 800, textTransform: 'uppercase', outline: 'none'}} />
                           <button onClick={handleJoinRoom} disabled={loading || joinCode.length !== 6} className="btn-primary" style={{width: '100%', padding: '18px', fontSize: '1.1rem', borderRadius: '12px'}}>
                              {loading ? 'Connecting...' : 'Join Room'}
                           </button>
                        </>
                     )}
                  </div>
               )}
            </div>

         </div>
      </div>
    );
}
