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

        <div className="content-wrapper-with-ads" style={{ position: 'relative' }}>
          {/* SIDEBAR ADS (ONLY FOR CONTENT BELOW HERO) */}
          <div className="sidebar-ad left-sidebar">
             <iframe src="//www.highperformanceformat.com/watchnew?key=aa6201d5fae0926236c836b46e69f60c" width="160" height="600" frameBorder="0" scrolling="no" title="ad-left-h"></iframe>
          </div>
          <div className="sidebar-ad right-sidebar">
             <iframe src="//www.highperformanceformat.com/watchnew?key=7aca24a89379703b4856af696dd093ec" width="160" height="300" frameBorder="0" scrolling="no" title="ad-right-h"></iframe>
             <div style={{marginTop: '20px'}}></div>
             <iframe src="//www.profitablecpmratenetwork.com/watchnew?key=7b63b4b297c7e53c1d003813c9724a13" width="160" height="300" frameBorder="0" scrolling="no" title="ad-right-2-h"></iframe>
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

          <div className="blog-grid" style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2.5rem', padding: '0 20px' }}>
            {displayBlogs.length > 0 ? displayBlogs.slice(0, 3).map((blog) => (
              <div key={blog._id} className="blog-card observe" onClick={() => router.push('/' + blog.slug)} style={{ cursor: 'pointer' }}>
                <div className="blog-card-img-wrapper" style={{ height: '220px', borderRadius: '1.5rem', marginBottom: '1.25rem', overflow: 'hidden', position: 'relative', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
                  <img src={blog.image || '/lrimg.png'} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} className="blog-thumb" />
                  <div className="blog-category-tag">{blog.category || 'Cricket'}</div>
                </div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 900, marginBottom: '0.75rem', lineHeight: '1.3', color: '#0f172a' }}>{blog.title}</h3>
                <p style={{ fontSize: '0.95rem', color: '#64748b', marginBottom: '1.25rem', lineBreak: 'anywhere' }}>
                  {blog.content ? blog.content.replace(/<[^>]*>?/gm, '').substring(0, 110) : 'Premium cricket analysis and match insights...'}...
                </p>
                <div style={{ fontSize: '0.8rem', fontWeight: 900, color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                   <div style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      READ FULL HUB <span style={{ fontSize: '1.2rem' }}>→</span>
                   </div>
                   <div style={{ background: '#f1f5f9', padding: '4px 10px', borderRadius: '6px', fontSize: '0.7rem' }}>
                      👁️ {blog.views || 0}
                   </div>
                </div>
              </div>
            )) : (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', color: '#94a3b8' }}>No blogs found. Start the auto-engine to generate posts!</div>
            )}
          </div>
        </section>

        {/* NEWS & BLOGS SECTION (FULL LIST) */}
        <section id="news-blogs" className="observe" style={{ marginTop: '80px', background: '#f8fafc', padding: '80px 0' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="section-tag">🗞️ Official Hubs</span>
            <h2 className="section-title">News & Master Blogs</h2>
            <p style={{ color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>Complete coverage of IPL 2026. From official schedules to expert betting guides and team rosters.</p>
          </div>

          <div className="blog-grid" style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', padding: '0 20px' }}>
            {displayBlogs.slice(3).map((blog) => (
              <div key={blog._id} className="news-item-card observe" onClick={() => router.push('/' + blog.slug)} style={{ cursor: 'pointer', background: '#fff', padding: '20px', borderRadius: '1.25rem', display: 'flex', gap: '20px', alignItems: 'center', border: '1px solid #e2e8f0', transition: 'all 0.3s ease' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0 }}>
                  <img src={blog.image || '/lrimg.png'} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                     <div style={{ flexGrow: 1 }}>
                        <h4 style={{ margin: '0 0 5px', fontSize: '1rem', fontWeight: 800, color: '#1e293b' }}>{blog.title}</h4>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                           <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10b981', textTransform: 'uppercase' }}>Explore Hub →</span>
                           <span style={{ fontSize: '0.7rem', color: '#64748b', background: '#f1f5f9', padding: '2px 8px', borderRadius: '4px' }}>👁️ {blog.views || 0}</span>
                        </div>
                     </div>
              </div>
            ))}
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
      </div>
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

      <style jsx>{`
        /* BLOG CARD STYLES (NEW) */
        .blog-card { 
          background: white; 
          border-radius: 2rem; 
          padding: 1rem; 
          border: 1px solid #f1f5f9; 
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); 
          position: relative; 
          display: flex;
          flex-direction: column;
        }
        .blog-card:hover { 
          transform: translateY(-12px); 
          box-shadow: 0 30px 60px rgba(0,0,0,0.06); 
          border-color: #10b98144; 
        }
        .blog-card:hover .blog-thumb { transform: scale(1.08); }
        
        .sidebar-ad { position: absolute; top: 0; width: 160px; z-index: 50; display: flex; flex-direction: column; align-items: center; }
        .left-sidebar { left: calc(50% - 660px); }
        .right-sidebar { right: calc(50% - 660px); }
        @media (max-width: 1320px) { .sidebar-ad { display: none; } }

        .blog-card-img-wrapper { 
          height: 220px; 
          border-radius: 1.5rem; 
          margin-bottom: 1.25rem; 
          overflow: hidden; 
          position: relative; 
          box-shadow: 0 10px 30px rgba(0,0,0,0.08); 
        }
        
        .blog-thumb { 
          width: 100%; 
          height: 100%; 
          object-fit: cover; 
          transition: transform 0.5s ease; 
        }

        .blog-category-tag { 
          position: absolute; 
          top: 15px; 
          right: 15px; 
          background: rgba(255,255,255,0.9); 
          backdrop-filter: blur(10px); 
          padding: 5px 12px; 
          border-radius: 100px; 
          font-size: 0.65rem; 
          font-weight: 900; 
          color: #10b981; 
          text-transform: uppercase; 
          letter-spacing: 1px; 
          box-shadow: 0 4px 12px rgba(0,0,0,0.1); 
        }

        /* NEWS ITEM STYLES (NEW) */
        .news-item-card {
          background: #fff; 
          padding: 20px; 
          border-radius: 1.25rem; 
          display: flex; 
          gap: 20px; 
          align-items: center; 
          border: 1px solid #e2e8f0; 
          transition: all 0.3s ease;
        }
        .news-item-card:hover { transform: scale(1.02); border-color: #10b981; box-shadow: 0 10px 25px rgba(16,185,129,0.05); }

        .section-tag { background: #10b98115; color: #10b981; padding: 6px 16px; border-radius: 100px; font-size: 0.75rem; font-weight: 900; text-transform: uppercase; letter-spacing: 1px; display: inline-block; margin-bottom: 1rem; }
        .section-title { font-size: 2.75rem; font-weight: 950; letter-spacing: -1px; color: #0f172a; }

        @media (max-width: 768px) {
          .section-title { font-size: 2rem; }
        }
      `}</style>
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
