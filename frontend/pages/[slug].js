import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import AdComponent from '../components/AdComponent';
import Ticker from '../components/Ticker';

export default function MatchPrediction({ match, error }) {
  if (error || !match) {
    return (
      <>
        <Navbar />
        <main className="container" style={{ marginTop: '100px', textAlign: 'center' }}>
          <h1>Match Not Found</h1>
          <Link href="/" legacyBehavior><a className="btn-primary" style={{ marginTop: '20px' }}>Go Back Home</a></Link>
        </main>
      </>
    );
  }

  const { team1, team2, date, time, venue, prediction, winProbability, pitchReport, tossPrediction, playing11, slug } = match;
  const title = `${team1} vs ${team2} Match Prediction Today 2026`;
  const description = `Get today match prediction, pitch report, toss prediction, and fantasy tips for ${team1} vs ${team2} at ${venue}.`;

  // structured data (schema.org)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    "name": `${team1} vs ${team2} T20 Match`,
    "startDate": date,
    "location": {
      "@type": "Place",
      "name": venue
    },
    "homeTeam": { "@type": "SportsTeam", "name": team1 },
    "awayTeam": { "@type": "SportsTeam", "name": team2 },
    "description": description
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </Head>
      <Ticker />
      <Navbar />

      <main className="container" style={{ marginTop: '100px', paddingBottom: '60px', maxWidth: '850px' }}>
        
        {/* TOP BANNER AD */}
        <div style={{display: 'flex', justifyContent: 'center', marginBottom: '20px'}}>
           <iframe src="//www.highperformanceformat.com/watchnew?key=049ed5c6c01b883957767c887fde882d" width="728" height="90" frameBorder="0" scrolling="no" title="ad-top"></iframe>
        </div>

        <article className="glass-panel" style={{ padding: '40px', background: '#ffffff', color: '#000000', border: '1px solid #e2e8f0', boxShadow: '0 10px 40px rgba(0,0,0,0.03)', borderRadius: '24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
             <h1 className="text-gradient" style={{ fontSize: '2.5rem' }}>{team1} vs {team2}</h1>
             <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginTop: '8px' }}>Match Prediction, Pitch Report & Fantasy Tips</p>
             <p style={{ marginTop: '12px' }}>📅 {date} • ⏰ {time} • 📍 {venue}</p>
          </div>

          <AdComponent slotId="top-banner" />

          <section style={{ margin: '40px 0' }}>
            <h2 style={{ marginBottom: '16px' }}>Win Probability</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', background: 'rgba(0,0,0,0.2)', padding: '24px', borderRadius: '12px' }}>
               <div style={{ flex: 1, textAlign: 'center' }}>
                  <h3 style={{ fontSize: '2rem', color: 'var(--accent-green)' }}>{winProbability.team1}%</h3>
                  <p>{team1}</p>
               </div>
               <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-secondary)' }}>VS</div>
               <div style={{ flex: 1, textAlign: 'center' }}>
                  <h3 style={{ fontSize: '2rem', color: '#fff' }}>{winProbability.team2}%</h3>
                  <p>{team2}</p>
               </div>
            </div>
            <div style={{ background: 'var(--accent-gradient)', padding: '16px', borderRadius: '8px', marginTop: '20px', textAlign: 'center', fontWeight: 'bold', fontSize: '1.2rem', boxShadow: '0 4px 15px rgba(0, 208, 132, 0.2)' }}>
              🎯 Our Prediction: {prediction}
            </div>
          </section>

          <AdComponent slotId="mid-content" />

          <section style={{ margin: '40px 0' }}>
            <h2 style={{ marginBottom: '16px' }}>Pitch Report & Toss</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '8px' }}>
                 <h3 style={{ color: 'var(--text-secondary)', fontSize: '14px', textTransform: 'uppercase' }}>Pitch Report</h3>
                 <p style={{ marginTop: '8px', lineHeight: 1.6 }}>{pitchReport}</p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '8px' }}>
                 <h3 style={{ color: 'var(--text-secondary)', fontSize: '14px', textTransform: 'uppercase' }}>Toss Prediction</h3>
                 <p style={{ marginTop: '8px', lineHeight: 1.6 }}>{tossPrediction}</p>
              </div>
            </div>
          </section>

          <section style={{ margin: '40px 0' }}>
            <h2 style={{ marginBottom: '16px' }}>Expected Playing 11</h2>
            <ul style={{ listStyleType: 'none', padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
              {playing11 && playing11.map((player, idx) => (
                 <li key={idx} style={{ background: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '6px' }}>🏏 {player}</li>
              ))}
            </ul>
          </section>

          <AdComponent slotId="bottom-sticky" />

          <div style={{ textAlign: 'center', marginTop: '60px' }}>
             <a href="https://t.me/yourtelegram" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ background: '#0088cc', boxShadow: '0 4px 15px rgba(0, 136, 204, 0.3)' }}>
               ✈️ Join Telegram for Daily Pre-Match Tips
             </a>
          </div>
          
          <div style={{ marginTop: '40px', padding: '20px', borderRadius: '8px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
            <h3>Read More Predictions</h3>
            <Link href="/" legacyBehavior><a style={{ color: 'var(--accent-green)', textDecoration: 'underline', marginTop: '12px', display: 'inline-block' }}>Back to All Matches</a></Link>
          </div>
        </article>

        {/* BOTTOM BANNER AD */}
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '40px'}}>
           <iframe src="//www.highperformanceformat.com/watchnew?key=11ced7a4967abfdc7f36246089b2f1d7" width="728" height="90" frameBorder="0" scrolling="no" title="ad-bottom"></iframe>
        </div>

        <style jsx>{`
          .glass-panel h1, .glass-panel h2, .glass-panel h3 { color: #0f172a; }
          .glass-panel p { color: #000000; }
        `}</style>
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  const { slug } = context.params;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/match/${slug}`);
    if (!res.ok) {
        return { props: { error: true } };
    }
    const match = await res.json();
    return { props: { match } };
  } catch (err) {
    return { props: { error: true } };
  }
}
