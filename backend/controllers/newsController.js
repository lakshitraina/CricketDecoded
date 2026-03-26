const Parser = require('rss-parser');
const parser = new Parser();

exports.getLatestNews = async (req, res) => {
  try {
    const feed = await parser.parseURL('https://www.cricbuzz.com/cricket-news/latest/news.xml');
    res.json(feed.items.slice(0, 10)); // return top 10 news
  } catch (error) {
    console.error("Error fetching RSS feed:", error);
    res.status(500).json({ error: 'Server error fetching news' });
  }
};
