export default function Ticker() {
  return (
    <div style={{ 
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: 'var(--accent-gradient)', color: '#fff', 
      padding: '8px 20px', fontSize: '14px', fontWeight: 'bold', 
      overflow: 'hidden', whiteSpace: 'nowrap' 
    }}>
      <marquee scrollamount="5">
          🔴 LIVE: RCB 187/4 (18.2) vs SRH 🏏 &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp; 🔴 UPCOMING: CSK vs RR tomorrow at 7:30 PM &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp; 🔴 TRENDING: Virat Kohli hits consecutive centuries!
      </marquee>
    </div>
  );
}
