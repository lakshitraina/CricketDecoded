import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';

export default function BlogIndex({ blogs }) {
  const router = useRouter();

  return (
    <div className="news-hub" style={{background: '#f8fafc', color: '#1e293b', minHeight: '100vh', fontFamily: '"Outfit", sans-serif'}}>
      <Head>
        <title>IPL 2026 News & Exclusive Blogs | Cricket Decoded</title>
        <meta name="description" content="Stay ahead with the latest IPL 2026 news, exclusive player insights, and AI match analysis." />
      </Head>

      <Navbar />

      <main className="hub-inner" style={{paddingTop: '100px', maxWidth: '1450px', margin: '0 auto', position: 'relative', paddingLeft: '20px', paddingRight: '20px'}}>
        
        {/* TOP BANNER */}
        <div style={{display: 'flex', justifyContent: 'center', marginBottom: '3rem'}}>
           <iframe src="//www.highperformanceformat.com/watchnew?key=aa6201d5fae0926236c836b46e69f60c" width="728" height="90" frameBorder="0" scrolling="no" title="ad-top"></iframe>
        </div>

        <div style={{textAlign: 'center', marginBottom: '5rem'}}>
          <span className="section-tag" style={{background: '#10b98115', color: '#10b981', padding: '8px 20px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px'}}>Exclusive Coverage</span>
          <h1 style={{fontSize: 'clamp(3rem, 7vw, 5.5rem)', fontWeight: 950, letterSpacing: '-3px', lineHeight: 0.9, marginTop: '1.5rem', color: '#0f172a'}}>Latest From <em>The Pitch.</em></h1>
          <p style={{color: '#64748b', fontSize: '1.25rem', marginTop: '1.5rem', maxWidth: '700px', margin: '1.5rem auto 0'}}>Deep analytics, insider scoops, and AI-driven match narratives for the 2026 season.</p>
        </div>

        <div className="hub-grid-layout" style={{position: 'relative', display: 'flex', gap: '40px'}}>
          
          {/* LEFT SIDEBAR (3000px) */}
          <div className="sidebar-ad left-sidebar">
             <iframe src="//www.highperformanceformat.com/watchnew?key=aa6201d5fae0926236c836b46e69f60c" width="160" height="600" frameBorder="0" scrolling="no" title="ad-l1"></iframe>
             <div style={{marginTop: '20px'}}></div>
             <iframe src="//www.profitablecpmratenetwork.com/watchnew?key=7aca24a89379703b4856af696dd093ec" width="160" height="600" frameBorder="0" scrolling="no" title="ad-l2"></iframe>
             <div style={{marginTop: '20px'}}></div>
             <iframe src="//www.highperformanceformat.com/watchnew?key=aa6201d5fae0926236c836b46e69f60c" width="160" height="600" frameBorder="0" scrolling="no" title="ad-l3"></iframe>
             <div style={{marginTop: '20px'}}></div>
             <iframe src="//www.profitablecpmratenetwork.com/watchnew?key=7aca24a89379703b4856af696dd093ec" width="160" height="600" frameBorder="0" scrolling="no" title="ad-l4"></iframe>
             <div style={{marginTop: '20px'}}></div>
             <iframe src="//www.highperformanceformat.com/watchnew?key=aa6201d5fae0926236c836b46e69f60c" width="160" height="600" frameBorder="0" scrolling="no" title="ad-l5"></iframe>
          </div>

          <div className="main-content" style={{flex: 1}}>
            <div className="blog-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '2.5rem'}}>
              {blogs.map((blog) => (
                <div 
                  key={blog._id} 
                  className="blog-card" 
                  onClick={() => router.push(`/${blog.slug}`)}
                  style={{background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '2rem', overflow: 'hidden', cursor: 'pointer', transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)', position: 'relative', boxShadow: '0 10px 40px rgba(0,0,0,0.03)'}}
                >
                  <div className="img-wrapper" style={{height: '240px', overflow: 'hidden', position: 'relative'}}>
                    <img src={blog.image} alt={blog.title} style={{width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease'}} className="blog-thumb" />
                    <div style={{position: 'absolute', top: '15px', left: '15px', background: '#10b981', color: 'white', padding: '6px 14px', borderRadius: '100px', fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px'}}>{blog.type}</div>
                    <div style={{position: 'absolute', bottom: '15px', right: '15px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', padding: '5px 12px', borderRadius: '100px', fontSize: '0.65rem', fontWeight: 900, color: '#10b981'}}>👁️ {blog.views || 0} VIEWS</div>
                  </div>
                  <div style={{padding: '1.75rem'}}>
                    <div style={{color: '#94a3b8', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.75rem'}}>{blog.matchTitle} • {new Date(blog.createdAt).toLocaleDateString()}</div>
                    <h3 style={{fontSize: '1.6rem', fontWeight: 900, marginBottom: '1rem', lineHeight: 1.2, color: '#0f172a'}} className="blog-title">{blog.title}</h3>
                    <p style={{color: '#64748b', fontSize: '1rem', lineHeight: 1.6}}>{blog.description}</p>
                    <div style={{marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px', color: '#10b981', fontWeight: 900, fontSize: '0.9rem'}}>
                      Read Full Article <span style={{fontSize: '1.2rem'}}>↗</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* MID-GRID BANNER */}
            <div style={{display: 'flex', justifyContent: 'center', margin: '4rem 0'}}>
               <iframe src="//www.profitablecpmratenetwork.com/watchnew?key=7b63b4b297c7e53c1d003813c9724a13" width="728" height="90" frameBorder="0" scrolling="no" title="ad-mid"></iframe>
            </div>
            {/* BOTTOM BANNER */}
            <div style={{display: 'flex', justifyContent: 'center', marginTop: '4rem'}}>
               <iframe src="//www.highperformanceformat.com/watchnew?key=049ed5c6c01b883957767c887fde882d" width="728" height="90" frameBorder="0" scrolling="no" title="ad-bottom"></iframe>
            </div>
          </div>

          {/* RIGHT SIDEBAR (3000px) */}
          <div className="sidebar-ad right-sidebar">
             <iframe src="//www.highperformanceformat.com/watchnew?key=7aca24a89379703b4856af696dd093ec" width="160" height="300" frameBorder="0" scrolling="no" title="ad-r1"></iframe>
             <div style={{marginTop: '20px'}}></div>
             <iframe src="//www.profitablecpmratenetwork.com/watchnew?key=049ed5c6c01b883957767c887fde882d" width="160" height="300" frameBorder="0" scrolling="no" title="ad-r2"></iframe>
             <div style={{marginTop: '20px'}}></div>
             <iframe src="//www.profitablecpmratenetwork.com/watchnew?key=d60542bb90219e73c31c84525bd1da05" width="160" height="300" frameBorder="0" scrolling="no" title="ad-r3"></iframe>
             <div style={{marginTop: '20px'}}></div>
             <iframe src="//www.highperformanceformat.com/watchnew?key=7aca24a89379703b4856af696dd093ec" width="160" height="300" frameBorder="0" scrolling="no" title="ad-r4"></iframe>
             <div style={{marginTop: '20px'}}></div>
             <iframe src="//www.profitablecpmratenetwork.com/watchnew?key=d60542bb90219e73c31c84525bd1da05" width="160" height="300" frameBorder="0" scrolling="no" title="ad-r5"></iframe>
             <div style={{marginTop: '20px'}}></div>
             <iframe src="//www.highperformanceformat.com/watchnew?key=7aca24a89379703b4856af696dd093ec" width="160" height="300" frameBorder="0" scrolling="no" title="ad-r6"></iframe>
             <div style={{marginTop: '20px'}}></div>
             <iframe src="//www.profitablecpmratenetwork.com/watchnew?key=049ed5c6c01b883957767c887fde882d" width="160" height="300" frameBorder="0" scrolling="no" title="ad-r7"></iframe>
             <div style={{marginTop: '20px'}}></div>
             <iframe src="//www.profitablecpmratenetwork.com/watchnew?key=d60542bb90219e73c31c84525bd1da05" width="160" height="300" frameBorder="0" scrolling="no" title="ad-r8"></iframe>
             <div style={{marginTop: '20px'}}></div>
             <iframe src="//www.highperformanceformat.com/watchnew?key=7aca24a89379703b4856af696dd093ec" width="160" height="300" frameBorder="0" scrolling="no" title="ad-r9"></iframe>
             <div style={{marginTop: '20px'}}></div>
             <iframe src="//www.profitablecpmratenetwork.com/watchnew?key=7b63b4b297c7e53c1d003813c9724a13" width="160" height="300" frameBorder="0" scrolling="no" title="ad-r10"></iframe>
          </div>
        </div>
      </main>

      <style jsx>{`
        em { color: #10b981; font-style: normal; }
        .blog-card:hover { transform: translateY(-10px); background: rgba(255,255,255,0.06) !important; border-color: #10b981 !important; box-shadow: 0 30px 60px rgba(0,0,0,0.3); }
        .blog-card:hover .blog-thumb { transform: scale(1.1); }
        .blog-card:hover .blog-title-text { color: #10b981; }
        
        .sidebar-ad { position: sticky; top: 110px; width: 160px; z-index: 50; display: flex; flex-direction: column; align-items: center; height: fit-content; }
        .left-sidebar { float: left; margin-left: calc(50% - 680px); left: 0; }
        .right-sidebar { float: right; margin-right: calc(50% - 680px); right: 0; }

        @media (max-width: 1400px) { .sidebar-ad { display: none; } }
      `}</style>
    </div>
  );
}

export async function getServerSideProps() {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';
  try {
    const res = await fetch(`${API_BASE}/api/blogs`);
    let blogs = res.ok ? await res.json() : [];
    if (!Array.isArray(blogs)) blogs = [];
    return { props: { blogs } };
  } catch (err) {
    return { props: { blogs: [] } };
  }
}
