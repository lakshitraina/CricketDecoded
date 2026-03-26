import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import AdComponent from '../components/AdComponent';
import { fixturesData } from '../data/fixtures';
import { sampleBlogs } from '../data/blogs';

export default function LandingPage({ matches, blogs }) {
  const router = useRouter();

  // If SSR fails or no blogs in DB, fallback to imported sample data
  const displayMatches = (matches && Array.isArray(matches) && matches.length > 0)
    ? matches.map(m => {
      if (!m) return null;
      let d = m.date || '';
      if (d.includes('-')) {
        const p = d.split('-');
        d = `${p[2]}/${p[1]}/${p[0].slice(2)}`;
      }
      return {
        id: m.id || m._id || Math.random(),
        teamA: m.team1 || 'TBC',
        teamB: m.team2 || 'TBC',
        logoA: `/teams/${(m.team1 || 'IPL').toLowerCase()}.png`,
        logoB: `/teams/${(m.team2 || 'IPL').toLowerCase()}.png`,
        date: `${d}, ${m.time || ''}`,
        venue: m.venue || 'TBA'
      }
    }).filter(Boolean)
    : fixturesData;
  const displayBlogs = (blogs && Array.isArray(blogs) && blogs.length > 0) ? blogs : sampleBlogs;

  useEffect(() => {
    // Scroll Reveal Observer
    const obs = new IntersectionObserver(entries => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), 80);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.observe').forEach(el => obs.observe(el));

    // Stagger children in bento
    document.querySelectorAll('.bento-card, .match-card, .fixture-item, .blog-card').forEach((el, i) => {
      el.style.transitionDelay = (i % 4) * 0.08 + 's';
    });

    return () => obs.disconnect();
  }, []);

  const liveTickerMatches = [
    { teams: 'RCB vs SRH', info: 'Match 1', score: 'RCB 198/4 (18.2)', status: 'LIVE' },
    { teams: 'MI vs KKR', info: 'Match 2', score: 'MI 84/1 (7.4) • KKR 172/8', status: 'LIVE' },
    { teams: 'RR vs CSK', info: 'Match 3', score: 'Starts 30 Mar, 7:30 PM', status: 'UPCOMING' },
    { teams: 'PBKS vs GT', info: 'Match 4', score: 'Starts 31 Mar, 7:30 PM', status: 'UPCOMING' },
    { teams: 'LSG vs DC', info: 'Match 5', score: 'Starts 01 Apr, 7:30 PM', status: 'UPCOMING' }
  ];

  const [liveCount, setLiveCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      const now = new Date();
      const hour = now.getHours();
      // User rule: after 11 PM everyday make it 0 and at 7 (19:00) make it 1
      if (hour >= 19 && hour < 23) {
        setLiveCount(1);
      } else {
        setLiveCount(0);
      }
    };
    updateCount();
    const t = setInterval(updateCount, 60000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <Head>
        <title>Cricket Decoded | AI Match Predictions & Live Scores</title>
        <meta name="description" content="AI-powered match predictions, pitch reports, and live cricket insights for IPL 2026." />
      </Head>

      <Navbar />

      <main>
        {/* HERO */}
        <section className="hero">
          <div className="hero-content">
            <div className="live-pill">
              <span className="live-dot"></span>
              {liveCount} Cricket Matches Live Now
            </div>

            <h1 className="hero-title">
              Cricket.<br />
              <em>Decoded.</em>
            </h1>

            <p className="hero-sub" style={{ marginBottom: "2rem" }}>Real-time IPL scores, deep analytics, AI predictions, curated fixtures & blogs — all in one beautifully crafted cricket universe.</p>

            <div className="hero-btns">
              <button
                onClick={() => router.push('/predictions')}
                className="btn-primary"
                style={{ cursor: 'pointer' }}
              >
                Explore Predictions ✨
              </button>
              <a href="#fixtures" className="btn-ghost" style={{ cursor: 'pointer' }}>View All Fixtures ↓</a>
            </div>

            {/* Banner Add below Hero buttons */}
            <AdComponent adKey="11ced7a4967abfdc7f36246089b2f1d7" height={50} width={320} />
          </div>

          <div className="hero-visual">
            <img src="/players/kohli.png" className="hero-main-img" alt="Virat Kohli" />
          </div>
        </section>

        {/* LIVE SCORE TICKER */}
        <div className="ticker-wrap">
          <div className="ticker-label">🏏 LIVE</div>
          <div className="ticker-track" id="ticker">
            {liveTickerMatches.map((m, i) => (
              <span key={i} className="ticker-item">
                <span className={m.status === 'LIVE' ? 'ticker-live-badge' : 'ticker-end-badge'}>
                  {m.status}
                </span>
                {m.teams} — {m.info} &nbsp;
                <span className="ticker-score">{m.score}</span>
              </span>
            ))}
            {/* Repeat for infinite loop */}
            {liveTickerMatches.map((m, i) => (
              <span key={'dup-' + i} className="ticker-item">
                <span className={m.status === 'LIVE' ? 'ticker-live-badge' : 'ticker-end-badge'}>
                  {m.status}
                </span>
                {m.teams} — {m.info} &nbsp;
                <span className="ticker-score">{m.score}</span>
              </span>
            ))}
          </div>
        </div>

        {/* STATS */}
        <div className="stats-bar observe">
          <div className="stat-item"><span className="stat-val">74</span><span className="stat-lbl">IPL Matches</span></div>
          <div className="stat-item"><span className="stat-val">10</span><span className="stat-lbl">Franchises</span></div>
          <div className="stat-item"><span className="stat-val">1M+</span><span className="stat-lbl">Fans Tracked</span></div>
          <div className="stat-item"><span className="stat-val">96%</span><span className="stat-lbl">Prediction Acc.</span></div>
          <div className="stat-item"><span className="stat-val">0ms</span><span className="stat-lbl">Score Delay</span></div>
        </div>

        {/* FIXTURES */}
        <section id="fixtures">
          <div className="observe" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-tag">📅 Schedule</span>
            <h2 className="section-title">IPL 2026 Fixtures</h2>
          </div>

          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            {displayMatches.map((fixture, idx) => (
              <div key={fixture.id} className="fixture-item observe" onClick={() => router.push('/prediction/' + fixture.id)} style={{ cursor: 'pointer' }}>
                <div className="fixture-team-a">
                  <img src={fixture.logoA} className="fix-team-logo" alt={fixture.teamA} />
                  <span className="fix-name">{fixture.teamA}</span>
                </div>
                <div className="fix-center">
                  <span className="fix-date">
                    {fixture.date && fixture.date.includes(',')
                      ? fixture.date.split(',')[0]
                      : (fixture.date || 'TBA')}
                  </span>
                  <span className="fix-time">
                    {fixture.date && fixture.date.includes(',')
                      ? ' | ' + fixture.date.split(',')[1]
                      : ''}
                  </span>
                  <span className="fix-venue" style={{ fontSize: '0.75rem', opacity: 0.7, display: 'block' }}>
                    {fixture.venue}
                  </span>
                </div>
                <div className="fixture-team-b">
                  <span className="fix-name">{fixture.teamB}</span>
                  <img src={fixture.logoB} className="fix-team-logo" alt={fixture.teamB} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* LATEST BLOGS */}
        <section id="blogs">
          <div className="observe" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-tag">✍️ Insights</span>
            <h2 className="section-title">Latest From the Pitch</h2>
          </div>

          <div className="blog-grid" style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {displayBlogs.length > 0 ? displayBlogs.slice(0, 6).map((blog) => (
              <div key={blog._id} className="blog-card observe" onClick={() => router.push('/blog/' + blog.slug)} style={{ cursor: 'pointer' }}>
                <div className="blog-card-img" style={{ height: '200px', background: 'linear-gradient(45deg, #10b98122, #3b82f622)', borderRadius: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: '#10b981' }}>
                  CRICKET ANALYSIS
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>{blog.title}</h3>
                <p style={{ fontSize: '0.85rem', color: '#64748b', mb: '1rem' }}>{blog.content.substring(0, 100)}...</p>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10b981', textTransform: 'uppercase', marginTop: 'auto' }}>Read More →</div>
              </div>
            )) : (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', color: '#94a3b8' }}>No blogs found. Start the auto-engine to generate posts!</div>
            )}
          </div>
        </section>

        {/* BENTO FEATURES */}
        <section className="features-section">
          <AdComponent adKey="049ed5c6c01b883957767c887fde882d" height={90} width={728} />
          <div className="bento">
            <div className="bento-card span3 observe">
              <div className="bento-title">Live Analytics</div>
              <p className="bento-desc">Real-time data visualization of every ball bowled.</p>
              <div className="bento-tag">LIVE</div>
            </div>
            <div className="bento-card span3 observe">
              <div className="bento-title">AI Engine</div>
              <p className="bento-desc">96% accuracy with our custom ML models.</p>
              <div className="bento-tag">AI POWERED</div>
            </div>
          </div>

          <AdComponent adKey="481bb8d376b950fb640f010f57eccd74" type="native" />
        </section>
      </main>

      <footer style={{ padding: '4rem 2rem', background: '#0a0a0f', color: 'white', textAlign: 'center' }}>
        <div style={{ marginBottom: '2rem' }}>
          <a
            href="https://www.profitablecpmratenetwork.com/vs0tiypek0?key=ef7969d3fb5bb7720a91f4d28a5cf283"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ textDecoration: 'none', display: 'inline-block' }}
          >
            Get Free Expert Tips ✨
          </a>
        </div>
        <p>&copy; 2026 Cricket Decoded. All rights reserved.</p>
      </footer>
    </>
  );
}

export async function getServerSideProps() {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';
  try {
    const [matchesRes, blogsRes] = await Promise.all([
      fetch(`${API_BASE}/api/matches`),
      fetch(`${API_BASE}/api/blogs`)
    ]);

    const matches = matchesRes.ok ? await matchesRes.json() : [];
    const blogs = blogsRes.ok ? await blogsRes.json() : [];

    return { props: { matches, blogs } };
  } catch (err) {
    return { props: { matches: [], blogs: [] } };
  }
}
