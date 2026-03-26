export default function Sitemap() {}

export async function getServerSideProps({ res }) {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';
  try {
    const [matchesRes, blogsRes] = await Promise.all([
      fetch(`${API_BASE}/api/matches`),
      fetch(`${API_BASE}/api/blogs`)
    ]);
    const matches = matchesRes.ok ? await matchesRes.json() : [];
    const blogs = blogsRes.ok ? await blogsRes.json() : [];

    const baseUrl = 'https://jioipl.in';

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
          <loc>${baseUrl}</loc>
          <changefreq>hourly</changefreq>
          <priority>1.0</priority>
        </url>
        <url>
          <loc>${baseUrl}/blog</loc>
          <changefreq>daily</changefreq>
          <priority>0.9</priority>
        </url>
        ${matches.map(m => `
          <url>
            <loc>${baseUrl}/${m.slug}</loc>
            <changefreq>daily</changefreq>
            <priority>0.8</priority>
          </url>
        `).join('')}
        ${blogs.map(b => `
          <url>
            <loc>${baseUrl}/blog/${b.slug}</loc>
            <changefreq>weekly</changefreq>
            <priority>0.7</priority>
          </url>
        `).join('')}
      </urlset>
    `;

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();
  } catch (err) {
    res.statusCode = 500;
    res.end();
  }

  return { props: {} };
}
