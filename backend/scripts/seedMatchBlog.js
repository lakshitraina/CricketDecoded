const mongoose = require('mongoose');
const Blog = require('../models/Blog');
require('dotenv').config();

const seedMatchBlog = async () => {
  try {
    const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cricklytics';
    await mongoose.connect(uri);
    
    const blogData = {
      title: "Tomorrow IPL Match 2026 – Match Prediction, Playing 11, Pitch Report",
      slug: "tomorrow-ipl-match-2026-prediction",
      category: "prediction",
      keywords: "Tomorrow IPL match 2026, RCB vs SRH prediction, IPL 2026 Match 1, Chinnaswamy pitch report, IPL 2026 playing 11, winner prediction",
      content: `
        <p>The long wait for the 19th edition of the Indian Premier League is finally over! Tomorrow, March 28, 2026, the cricket world turns its eyes toward the M. Chinnaswamy Stadium. This isn't just any season opener; it’s a high-stakes "South Indian Derby" featuring the reigning champions, Royal Challengers Bengaluru (RCB), as they begin their title defense against the most explosive batting unit in the league, the Sunrisers Hyderabad (SRH).</p>
        
        <h2>Match Details</h2>
        <ul>
          <li><strong>Match:</strong> RCB vs SRH</li>
          <li><strong>Tournament:</strong> IPL 2026, Match 1</li>
          <li><strong>Venue:</strong> M. Chinnaswamy Stadium, Bengaluru</li>
        </ul>

        <h2>Tactical Analysis</h2>
        <p>RCB returns as defending champions with Rajat Patidar leading a balanced squad. SRH, under Ishan Kishan, relies on the 'total-attack' mindset of Head, Abhishek, and Klaasen.</p>

        <h2>Final Verdict</h2>
        <p>RCB holds the home advantage and a 54% win probability according to the Google Predictor. Prediction: <strong>Royal Challengers Bengaluru</strong> to win a high-scoring thriller.</p>
      `
    };

    await Blog.findOneAndUpdate(
      { slug: blogData.slug },
      blogData,
      { upsert: true, new: true }
    );

    console.log("✅ Detailed Match Prediction Blog Seeded Successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding Error:", error);
    process.exit(1);
  }
};

seedMatchBlog();
