import React from 'react';
import Head from 'next/head';
import Navbar from '../../components/Navbar';

export default function BlogIndex({ blogs }) {
  return (
    <div className="dash-layout" style={{background: '#0f172a', color: 'white', minHeight: '100vh'}}>
      <Head>
        <title>Cricket Blogs & News | Cricket Decoded</title>
      </Head>

      <Navbar />

      <div className="dash-inner" style={{paddingTop: '4rem'}}>
        <div style={{marginBottom: '4rem', textAlign: 'center'}}>
          <span className="section-tag" style={{color: '#6ee7b7'}}>Criclytic Reads</span>
          <h1 className="hero-title" style={{color: 'white', fontSize: '4rem'}}>Latest <em>Stories.</em></h1>
        </div>

        <div className="blog-stack">
          {blogs.map((blog, idx) => (
            <div key={idx} className="blog-card" style={{cursor: 'pointer', marginBottom: '1.5rem'}}>
              <div className="blog-tag">{blog.type}</div>
              <h3 className="blog-headline" style={{fontSize: '1.4rem'}}>{blog.title}</h3>
              <div className="blog-meta">Match: {blog.matchTitle} • {new Date(blog.createdAt).toLocaleDateString()}</div>
              <div className="blog-arrow">↗</div>
            </div>
          ))}
        </div>
      </div>
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
