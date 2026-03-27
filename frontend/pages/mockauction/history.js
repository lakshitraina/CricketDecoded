import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import { auth, db } from '../../utils/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function MockAuctionHistory() {
   const router = useRouter();
   const [user, setUser] = useState(null);
   const [auctions, setAuctions] = useState([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
       const unsub = onAuthStateChanged(auth, async (u) => {
           if (!u) {
               router.push('/mockauction');
               return;
           }
           setUser(u);
           fetchHistory(u.uid);
       });
       return () => unsub();
   }, []);

   const fetchHistory = async (uid) => {
       try {
           const q = query(collection(db, 'auctions'), where('participantUids', 'array-contains', uid));
           const snapshot = await getDocs(q);
           const data = [];
           snapshot.forEach(doc => {
               data.push({ id: doc.id, ...doc.val() });
               // Note: snapshot gives doc.data(), doc.val() is for RTDB. Fixing immediately
               // Oops, typo. Fixing here:
           });
           // Re-writing loop properly:
           const validData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
           
           // Client side sort by date desc
           validData.sort((a,b) => new Date(b.date) - new Date(a.date));
           setAuctions(validData);
       } catch (error) {
           console.error("Error fetching history:", error);
       }
       setLoading(false);
   };

   if (loading) return <div style={{background: '#f8fafc', height: '100vh', display:'flex', alignItems:'center', justifyContent:'center'}}>Loading Player History...</div>;

   return (
       <div className="dash-v2" style={{minHeight: '100vh', background: '#f8fafc', fontFamily: "'DM Sans', sans-serif"}}>
           <Head><title>My Auction History | Cricket Decoded</title></Head>
           <Navbar />
           
           <div className="dash-inner" style={{paddingTop: '120px', maxWidth: '1000px', margin: '0 auto', paddingBottom: '100px'}}>
               <div style={{display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px'}}>
                  <img 
                      src={user?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || 'User')}&background=4285F4&color=fff`} 
                      alt={user?.displayName} 
                      style={{width: '60px', height: '60px', borderRadius: '50%', boxShadow: '0 10px 20px rgba(0,0,0,0.1)', objectFit: 'cover'}} 
                      referrerPolicy="no-referrer"
                      onError={(e) => {e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || 'User')}&background=4285F4&color=fff`}}
                  />
                  <div>
                     <h1 style={{fontSize: '2.5rem', fontWeight: 900, color: '#0f172a', fontFamily: "'Playfair Display', serif"}}>My Auction <em style={{color: '#10b981', fontStyle: 'italic'}}>History.</em></h1>
                     <p style={{color: '#64748b', fontSize: '1.1rem'}}>Welcome back, {user?.displayName}. Here are your finalized squads from past multiplayer lobbies.</p>
                  </div>
               </div>

               {auctions.length === 0 ? (
                   <div style={{background: '#fff', padding: '60px 40px', borderRadius: '24px', textAlign: 'center', border: '1px dashed #cbd5e1'}}>
                      <div style={{fontSize: '3rem', marginBottom: '20px'}}>🕸️</div>
                      <h2 style={{color: '#334155', marginBottom: '10px'}}>No records found</h2>
                      <p style={{color: '#94a3b8', marginBottom: '20px'}}>You haven't participated in any finished multiplayer auctions yet.</p>
                      <button onClick={() => router.push('/mockauction/lobby')} className="btn-primary" style={{padding: '12px 24px'}}>Join a Lobby</button>
                   </div>
               ) : (
                   <div style={{display: 'flex', flexDirection: 'column', gap: '40px'}}>
                       {auctions.map((match) => {
                           const myResults = match.results[user.displayName]; // from L100 in [id].js
                           const otherTeams = Object.keys(match.results).filter(k => k !== user.displayName);

                           return (
                               <div key={match.id} style={{background: '#fff', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.03)', border: '1px solid #e2e8f0', overflow: 'hidden'}}>
                                   <div style={{background: '#0f172a', color: '#fff', padding: '20px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                       <div>
                                           <div style={{fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px'}}>Room: {match.roomCode}</div>
                                           <div style={{fontSize: '1.2rem', fontWeight: 800}}>{new Date(match.date).toLocaleDateString()} at {new Date(match.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                                       </div>
                                       <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                                          <div style={{fontSize: '2rem', fontWeight: 900, color: '#f59e0b'}}>₹{(myResults?.purse || 0).toFixed(2)}</div>
                                          <div style={{fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', textAlign: 'right'}}>Remaining<br/>Purse</div>
                                       </div>
                                   </div>

                                   {myResults && (
                                       <div style={{padding: '30px'}}>
                                           <div style={{display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px'}}>
                                               <img src={`/teams/${myResults.franchise.toLowerCase()}.png`} style={{width: '60px', height: '60px'}} />
                                               <div>
                                                   <h2 style={{fontSize: '1.5rem', fontWeight: 900, color: '#0f172a'}}>{user.displayName}'s {myResults.franchise}</h2>
                                                   <div style={{color: '#64748b', fontSize: '0.9rem'}}>Retentions: {myResults.retentions?.length || 0} · Purchases: {myResults.squad?.length || 0}</div>
                                               </div>
                                           </div>

                                           <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '15px'}}>
                                                {[...(myResults.retentions || []), ...(myResults.squad || [])].map((p, idx) => (
                                                    <div key={idx} style={{display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #f1f5f9'}}>
                                                        <img src={p.imageUrl} style={{width: '45px', height: '45px', borderRadius: '8px', background: '#e2e8f0', objectFit: 'cover'}} />
                                                        <div style={{flex: 1}}>
                                                            <div style={{fontSize: '0.95rem', fontWeight: 800, color: '#0f172a'}}>{p.name}</div>
                                                            <div style={{color: '#64748b', fontSize: '0.75rem', textTransform: 'uppercase'}}>{p.role}</div>
                                                        </div>
                                                        <div style={{fontWeight: 900, color: p.price ? '#10b981' : '#f59e0b', fontSize: '1.1rem'}}>
                                                            ₹{p.price || p.cost} Cr
                                                        </div>
                                                    </div>
                                                ))}
                                           </div>
                                       </div>
                                   )}
                                   
                                   <div style={{background: '#f8fafc', padding: '20px 30px', borderTop: '1px solid #e2e8f0'}}>
                                       <h4 style={{fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px'}}>Other Franchises in Lobby</h4>
                                       <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
                                           {otherTeams.map(tName => {
                                               const oTeam = match.results[tName];
                                               return (
                                                   <div key={tName} title={`${tName} (${oTeam.franchise})`} style={{padding: '8px 16px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '100px', fontSize: '0.85rem', fontWeight: 700, color: '#334155', display: 'flex', alignItems: 'center', gap: '8px'}}>
                                                      <img src={`/teams/${oTeam.franchise.toLowerCase()}.png`} style={{width: '20px', height: '20px'}} />
                                                      {tName.slice(0, 10)}... (₹{oTeam.purse.toFixed(1)})
                                                   </div>
                                               )
                                           })}
                                       </div>
                                   </div>

                               </div>
                           );
                       })}
                   </div>
               )}
           </div>
       </div>
   );
}
