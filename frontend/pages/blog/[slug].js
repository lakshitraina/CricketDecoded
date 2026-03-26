import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Ticker from '../../components/Ticker';
import AdComponent from '../../components/AdComponent';

export default function BlogPost({ blog }) {
  if (!blog) return <main className="container" style={{marginTop:'100px'}}><h1>Blog Not Found</h1></main>;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "datePublished": blog.createdAt,
    "keywords": blog.keywords,
    "author": {
      "@type": "Organization",
      "name": "Cricket Decoded AI"
    }
  };

  return (
    <>
      <Head>
        <title>{blog.title} | Cricket Decoded</title>
        <meta name="description" content={blog.content.replace(/<[^>]+>/g, '').substring(0, 150)} />
        <meta name="keywords" content={blog.keywords} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </Head>
      <Ticker />
      <Navbar />

      <main className="container" style={{ marginTop: '120px', paddingBottom: '60px', maxWidth: '800px' }}>
        <article className="glass-panel" style={{ padding: '40px' }}>
           <Link href="/blog" legacyBehavior><a style={{ color: 'var(--accent-green)', 
marginBottom: '24px', display: 'inline-block' }}>&larr; Back to all blogs</a></Link>
           
           <div dangerouslySetInnerHTML={{ __html: blog.content }} style={{ lineHeight: '1.8' }} className="blog-content" />

           <AdComponent slotId="blog-mid-content" />
        </article>
      </main>

      <style jsx global>{`
        .blog-content h1 { font-size: 2.5rem; margin-bottom: 24px; color: var(--accent-green); }
        .blog-content h2 { font-size: 1.8rem; margin: 32px 0 16px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 8px; }
        .blog-content p { margin-bottom: 16px; font-size: 1.1rem; color: #ddd; }
      `}</style>
    </>
  );
}

// NextJS SSG (Static Site Generation)
// fallback: 'blocking' allows robust SSR behavior if not generated at build time
export async function getStaticPaths() {
  return { paths: [], fallback: 'blocking' };
}

export async function getStaticProps(context) {
  const { slug } = context.params;
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';
  try {
    const res = await fetch(`${API_BASE}/api/blog/${slug}`);
    if (!res.ok) return { notFound: true };
    const blog = await res.json();
    return { props: { blog }, revalidate: 3600 }; // revalidate every 1 hour
  } catch (err) {
    return { notFound: true };
  }
}
