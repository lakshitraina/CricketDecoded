import { useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';

export default function Admin() {
  const [formData, setFormData] = useState({
    team1: '', team2: '', date: '', time: '', venue: '', prediction: '',
    winProb1: 50, winProb2: 50, pitchReport: '', tossPrediction: '', playing11: ''
  });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');
    try {
      const payload = {
        ...formData,
        winProbability: { team1: Number(formData.winProb1), team2: Number(formData.winProb2) },
        playing11: formData.playing11.split(',').map(s => s.trim())
      };
      
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';
      const res = await fetch(`${API_BASE}/api/admin/add-match`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (res.ok) {
        setStatus('Match added successfully! (Slug auto-generated)');
        setFormData({ team1: '', team2: '', date: '', time: '', venue: '', prediction: '', winProb1: 50, winProb2: 50, pitchReport: '', tossPrediction: '', playing11: '' });
      } else {
        setStatus('Failed to add match.');
      }
    } catch(err) {
      setStatus('Error connecting to server.');
    }
  };

  return (
    <>
      <Head><title>Admin | Add Match</title></Head>
      <Navbar />
      <main className="container" style={{ marginTop: '100px', maxWidth: '600px' }}>
        <h1 style={{ marginBottom: '24px' }}>Admin Dashboard</h1>
        <div className="glass-panel" style={{ padding: '32px' }}>
           <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
             <div style={{ display: 'flex', gap: '16px' }}>
               <input type="text" placeholder="Team 1 (e.g. RCB)" value={formData.team1} onChange={e => setFormData({...formData, team1: e.target.value})} required style={inputStyle} />
               <input type="text" placeholder="Team 2 (e.g. SRH)" value={formData.team2} onChange={e => setFormData({...formData, team2: e.target.value})} required style={inputStyle} />
             </div>
             <div style={{ display: 'flex', gap: '16px' }}>
               <input type="text" placeholder="Date (e.g. 28/03/26)" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} required style={inputStyle} />
               <input type="text" placeholder="Time (e.g. 7:30 PM)" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} required style={inputStyle} />
             </div>
             <input type="text" placeholder="Venue" value={formData.venue} onChange={e => setFormData({...formData, venue: e.target.value})} required style={inputStyle} />
             
             <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
               <label>Win Prob T1 (%)</label>
               <input type="number" value={formData.winProb1} onChange={e => setFormData({...formData, winProb1: e.target.value})} style={inputStyle} />
               <label>Win Prob T2 (%)</label>
               <input type="number" value={formData.winProb2} onChange={e => setFormData({...formData, winProb2: e.target.value})} style={inputStyle} />
             </div>

             <textarea placeholder="Overall Prediction (e.g. RCB to win due to...)" value={formData.prediction} onChange={e => setFormData({...formData, prediction: e.target.value})} required style={{...inputStyle, minHeight: '80px'}} />
             <textarea placeholder="Pitch Report" value={formData.pitchReport} onChange={e => setFormData({...formData, pitchReport: e.target.value})} required style={{...inputStyle, minHeight: '80px'}} />
             <input type="text" placeholder="Toss Prediction" value={formData.tossPrediction} onChange={e => setFormData({...formData, tossPrediction: e.target.value})} required style={inputStyle} />
             <textarea placeholder="Playing 11 (Comma separated)" value={formData.playing11} onChange={e => setFormData({...formData, playing11: e.target.value})} required style={{...inputStyle, minHeight: '80px'}} />

             <button type="submit" className="btn-primary" style={{ marginTop: '16px' }}>Add Match</button>
             {status && <p style={{ marginTop: '16px', color: 'var(--accent-green)' }}>{status}</p>}
           </form>
        </div>
      </main>
    </>
  );
}

const inputStyle = {
  width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid var(--border-color)', 
  background: 'rgba(0,0,0,0.3)', color: '#fff', fontSize: '1rem', outline: 'none'
};
