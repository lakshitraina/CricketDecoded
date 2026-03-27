import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { onAuthStateChanged, updateProfile } from 'firebase/auth';
import { auth, rtdb } from '../../utils/firebase';
import { ref, set, get } from 'firebase/database';
import Navbar from '../../components/Navbar';

export default function UserProfile() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [newName, setNewName] = useState('');
  const [favTeam, setFavTeam] = useState('RCB');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => {
      if (!u) router.push('/mockauction');
      else {
        setUser(u);
        setNewName(u.displayName || '');
        loadPrefs(u.uid);
      }
    });
    return () => unsub();
  }, []);

  const loadPrefs = async (uid) => {
     const snap = await get(ref(rtdb, `users/${uid}/prefs`));
     if (snap.exists()) {
        setFavTeam(snap.val().favTeam || 'RCB');
     }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      // 1. Update Firebase Auth Profile
      await updateProfile(auth.currentUser, { displayName: newName });
      
      // 2. Update Preferences in RTDB
      await set(ref(rtdb, `users/${user.uid}/prefs`), {
         favTeam,
         updatedAt: Date.now()
      });

      setMessage({ text: 'Profile updated successfully! 🎉', type: 'success' });
    } catch (err) {
      console.error(err);
      setMessage({ text: 'Failed to update profile. Please try again.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="profile-page" style={{background: '#f8fafc', minHeight: '100vh', color: '#0f172a', fontFamily: "'DM Sans', sans-serif"}}>
      <Head><title>My Profile | Cricket Decoded</title></Head>
      <Navbar />

      <div className="container" style={{maxWidth: '800px', margin: '0 auto', paddingTop: '120px', paddingBottom: '100px', paddingLeft: '20px', paddingRight: '20px'}}>
        
        <div style={{background: '#fff', borderRadius: '32px', padding: '50px', boxShadow: '0 20px 50px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0'}}>
           <div style={{textAlign: 'center', marginBottom: '40px'}}>
              <div style={{position: 'relative', display: 'inline-block'}}>
                 <img 
                    src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || 'User')}&background=1DB954&color=fff`} 
                    style={{width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: '5px solid #fff', boxShadow: '0 10px 20px rgba(0,0,0,0.1)'}} 
                    referrerPolicy="no-referrer"
                 />
                 <div style={{position: 'absolute', bottom: '5px', right: '5px', background: '#10b981', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', border: '3px solid #fff'}}>✓</div>
              </div>
              <h1 style={{fontSize: '2rem', fontWeight: 900, marginTop: '20px', marginBottom: '5px'}}>{user.displayName || 'Anonymous User'}</h1>
              <p style={{color: '#64748b', fontSize: '0.9rem'}}>{user.email}</p>
           </div>

           {message.text && (
              <div style={{background: message.type === 'success' ? '#ecfdf5' : '#fee2e2', color: message.type === 'success' ? '#10b981' : '#ef4444', padding: '15px', borderRadius: '12px', marginBottom: '30px', textAlign: 'center', fontWeight: 600, border: `1px solid ${message.type === 'success' ? '#bbf7d0' : '#fecaca'}`}}>
                 {message.text}
              </div>
           )}

           <form onSubmit={handleUpdate} style={{display: 'grid', gap: '30px'}}>
              <div>
                 <label style={{display: 'block', fontWeight: 700, marginBottom: '10px', color: '#334155'}}>Display Name</label>
                 <input 
                    type="text" 
                    value={newName} 
                    onChange={e => setNewName(e.target.value)} 
                    placeholder="Enter your name" 
                    required
                    style={{width: '100%', padding: '15px 20px', borderRadius: '12px', border: '2px solid #e2e8f0', fontSize: '1rem', outline: 'none', transition: 'border-color 0.2s'}}
                 />
                 <p style={{fontSize: '0.8rem', color: '#94a3b8', marginTop: '8px'}}>This name will be visible to other players in multiplayer rooms.</p>
              </div>

              <div>
                 <label style={{display: 'block', fontWeight: 700, marginBottom: '10px', color: '#334155'}}>Favorite Franchise</label>
                 <select 
                    value={favTeam} 
                    onChange={e => setFavTeam(e.target.value)}
                    style={{width: '100%', padding: '15px 20px', borderRadius: '12px', border: '2px solid #e2e8f0', fontSize: '1rem', outline: 'none', background: '#fff'}}
                 >
                    <option value="RCB">Royal Challengers Bengaluru</option>
                    <option value="CSK">Chennai Super Kings</option>
                    <option value="MI">Mumbai Indians</option>
                    <option value="KKR">Kolkata Knight Riders</option>
                    <option value="SRH">Sunrisers Hyderabad</option>
                    <option value="GT">Gujarat Titans</option>
                    <option value="LSG">Lucknow Super Giants</option>
                    <option value="RR">Rajasthan Royals</option>
                    <option value="DC">Delhi Capitals</option>
                    <option value="PBKS">Punjab Kings</option>
                 </select>
                 <p style={{fontSize: '0.8rem', color: '#94a3b8', marginTop: '8px'}}>We'll use this as your default team choice when you join new auctions.</p>
              </div>

              <div style={{paddingTop: '20px', borderTop: '1px solid #f1f5f9', display: 'flex', gap: '15px'}}>
                 <button type="submit" disabled={loading} className="btn-primary" style={{flex: 1, padding: '16px', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 800, background: '#10b981', color: '#fff', border: 'none', cursor: 'pointer'}}>
                    {loading ? 'Saving Changes...' : 'Save Profile Settings'}
                 </button>
                 <button type="button" onClick={() => router.push('/mockauction')} className="btn-secondary" style={{padding: '16px 30px', borderRadius: '12px', fontWeight: 700, border: '2px solid #e2e8f0', background: 'transparent', cursor: 'pointer'}}>
                    Back to Auction
                 </button>
              </div>
           </form>

           <div style={{marginTop: '50px', background: '#f8fafc', padding: '30px', borderRadius: '24px', textAlign: 'center'}}>
              <h3 style={{fontSize: '1.1rem', fontWeight: 800, marginBottom: '10px'}}>Account Security</h3>
              <p style={{color: '#64748b', fontSize: '0.85rem', marginBottom: '20px'}}>Your account is protected by Google Authentication. To change your email or password, please visit your Google Account settings.</p>
              <button onClick={() => auth.signOut()} style={{color: '#ef4444', background: 'transparent', border: 'none', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem'}}>Sign Out of All Devices</button>
           </div>
        </div>

      </div>

      <style jsx>{`
        input:focus, select:focus { border-color: #10b981 !important; box-shadow: 0 0 0 4px rgba(16,185,129,0.05); }
        .btn-primary:hover { filter: brightness(1.1); transform: translateY(-2px); transition: 0.2s; }
        .btn-secondary:hover { border-color: #94a3b8; transform: translateY(-2px); transition: 0.2s; }
      `}</style>
    </div>
  );
}
