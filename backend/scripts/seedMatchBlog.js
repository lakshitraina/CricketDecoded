const mongoose = require('mongoose');
const Blog = require('../models/Blog');
require('dotenv').config();

const seedMatchBlog = async () => {
  try {
    const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cricklytics';
    console.log("Connecting to:", uri.split('@')[1] || "Localhost");
    
    await mongoose.connect(uri);
    
    const blogData = {
      title: "Tomorrow IPL Match 2026 – Match Prediction, Playing 11, Pitch Report",
      slug: "tomorrow-ipl-match-2026-prediction",
      category: "prediction",
      keywords: "Tomorrow IPL match 2026, RCB vs SRH prediction, IPL 2026 Match 1, Chinnaswamy pitch report, IPL 2026 playing 11",
      content: `
        <p>The wait is finally over! The 19th edition of the Indian Premier League kicks off tomorrow with a blockbuster "South Indian Derby." As the defending champions take the field at their home fortress, fans are gearing up for what promises to be a high-octane season opener.</p>
        
        <h2>Tomorrow Match Details</h2>
        <ul>
          <li><strong>Match:</strong> RCB vs SRH</li>
          <li><strong>Date:</strong> March 28, 2026</li>
          <li><strong>Venue:</strong> M. Chinnaswamy Stadium, Bengaluru</li>
        </ul>

        <h2>Pitch Report</h2>
        <p>The M. Chinnaswamy Stadium is a paradise for batters. Short boundaries and a lightning-fast outfield make 200+ scores frequent.</p>

        <h2>Final Prediction</h2>
        <p>RCB holds a slight edge (58% win probability) due to their home advantage and deeper batting lineup. Winner Prediction: <strong>Royal Challengers Bengaluru</strong> to win a close encounter.</p>
      `
    };

    await Blog.findOneAndUpdate(
      { slug: blogData.slug },
      blogData,
      { upsert: true, new: true }
    );

    console.log("✅ Match Prediction Blog Seeded Successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding Error:", error);
    process.exit(1);
  }
};

seedMatchBlog();
