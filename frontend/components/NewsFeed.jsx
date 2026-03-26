import { useEffect, useState } from 'react';

export default function NewsFeed() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/news')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setNews(data);
        } else {
          setNews([]);
        }
      })
      .catch(console.error);
  }, []);

  if (!Array.isArray(news) || news.length === 0) return null;

  return (
    <div className="glass-panel" style={{ padding: '24px', marginTop: '40px' }}>
      <h2 style={{ marginBottom: '16px' }}>📰 Latest Cricket News</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {news.map((item, idx) => (
          <li key={idx} style={{ marginBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px' }}>
            <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 'bold', color: 'var(--accent-green)', textDecoration: 'none' }}>
              {item.title}
            </a>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>{new Date(item.pubDate).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
