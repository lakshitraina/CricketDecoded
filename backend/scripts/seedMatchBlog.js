const mongoose = require('mongoose');
const Blog = require('../models/Blog');
require('dotenv').config();

const seedMatchBlog = async () => {
  try {
    const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cricklytics';
    await mongoose.connect(uri);
    
    const blogs = [
      {
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

          <h2>Final Verdict</h2>
          <p>RCB holds the home advantage and a 54% win probability according to the Google Predictor. Prediction: <strong>Royal Challengers Bengaluru</strong> to win a high-scoring thriller.</p>
        `
      },
      {
        title: "IPL 2026 Full Schedule, Time Table, Fixtures & PDF Download",
        slug: "ipl-2026-full-schedule",
        category: "fixtures",
        keywords: "IPL 2026 full schedule, IPL 2026 match list, IPL 2026 PDF download, IPL time table 2026, today IPL match ground, RCB vs SRH opener",
        content: `
          <p>The Board of Control for Cricket in India (BCCI) has announced the much-anticipated IPL 2026 Schedule. This 19th edition features 10 world-class teams competing across 74 high-octane matches.</p>
          
          <h2>Key Highlights</h2>
          <ul>
            <li><strong>Opening Match:</strong> RCB vs SRH in Bengaluru (March 28)</li>
            <li><strong>Format:</strong> 10 teams, 74 matches total</li>
            <li><strong>Venues:</strong> 10 iconic stadiums across India</li>
          </ul>

          <p>Download the high-resolution, official match list for your phone or desktop using our premium fixtures hub.</p>
        `
      },
      {
        title: "Josh Hazlewood IPL 2026 Performance, Stats & Team Analysis",
        slug: "josh-hazlewood-ipl-2026-stats-performance",
        category: "analysis",
        keywords: "Josh Hazlewood IPL 2026 stats, Hazlewood RCB price, Hazlewood injury update IPL, Josh Hazlewood bowling record",
        content: `
          <p>As Royal Challengers Bengaluru (RCB) prepare to defend their maiden title in IPL 2026, all eyes are on their pace spearhead, Josh Hazlewood. After a career-defining 2025 season where he led the franchise to glory, "The Hoff" remains the backbone of the RCB bowling attack.</p>
          
          <h2>Injury Update</h2>
          <p>As of March 27, 2026, Josh Hazlewood has officially joined the RCB camp. However, he is likely to miss the season opener against SRH due to minor hamstring and Achilles issues.</p>

          <h2>Team Impact</h2>
          <p>Hazlewood’s metronomic accuracy and steep bounce make him one of the most difficult bowlers to score against, especially at the high-scoring M. Chinnaswamy Stadium.</p>
        `
      }
    ];

    for (const blogData of blogs) {
      await Blog.findOneAndUpdate(
        { slug: blogData.slug },
        blogData,
        { upsert: true, new: true }
      );
    }

    console.log("✅ All Premium Blog Hubs Seeded Successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding Error:", error);
    process.exit(1);
  }
};

seedMatchBlog();
