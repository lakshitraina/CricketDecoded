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
        image: "/ipl_2026_season_opener_rcb_vs_srh.png",
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
        image: "/ipl_2026_schedule_pdf_thumbnail.png",
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
        image: "/josh_hazlewood_rcb_2026_action.png",
        keywords: "Josh Hazlewood IPL 2026 stats, Hazlewood RCB price, Hazlewood injury update IPL, Josh Hazlewood bowling record",
        content: `
          <p>As Royal Challengers Bengaluru (RCB) prepare to defend their maiden title in IPL 2026, all eyes are on their pace spearhead, Josh Hazlewood. After a career-defining 2025 season where he led the franchise to glory, "The Hoff" remains the backbone of the RCB bowling attack.</p>
          
          <h2>Injury Update</h2>
          <p>As of March 27, 2026, Josh Hazlewood has officially joined the RCB camp. However, he is likely to miss the season opener against SRH due to minor hamstring and Achilles issues.</p>

          <h2>Team Impact</h2>
          <p>Hazlewood’s metronomic accuracy and steep bounce make him one of the most difficult bowlers to score against, especially at the high-scoring M. Chinnaswamy Stadium.</p>
        `
      },
      {
        title: "RCB Squad 2026 – Full Team Players List & Analysis",
        slug: "rcb-squad-2026-full-team-players-list",
        category: "squad",
        image: "/rcb_squad_2026_team_poster.png",
        keywords: "RCB squad 2026, RCB players list, Rajat Patidar captain, Virat Kohli price, RCB auction 2026",
        content: `
          <p>The champions are back! Royal Challengers Bengaluru (RCB) have assembled a powerhouse squad for IPL 2026. Led by Captain Rajat Patidar and the legendary Virat Kohli, the 2026 squad is built for a title defense.</p>
          
          <h2>Squad Highlights</h2>
          <ul>
            <li><strong>Captain:</strong> Rajat Patidar</li>
            <li><strong>Leading Stars:</strong> Virat Kohli, Josh Hazlewood, Bhuvneshwar Kumar</li>
            <li><strong>New Signings:</strong> Venkatesh Iyer, Phil Salt, Tim David</li>
          </ul>

          <p>Check the full players list and tactical analysis on our premium squad hub.</p>
        `
      },
      {
        title: "IPL 2026 Ticket Booking – Prices, Dates & How to Book Online",
        slug: "ipl-2026-ticket-booking-prices-how-to-book",
        category: "tickets",
        image: "/ipl_2026_ticket_booking_visual.png",
        keywords: "IPL 2026 ticket booking, IPL 2026 ticket price, how to book IPL tickets, IPL 2026 online tickets",
        content: `
          <p>The cricket fever is back! With the IPL 2026 season kicking off tomorrow, March 28, 2026, fans are scrambling to secure their spots in the stadiums.</p>
          
          <h2>Booking Details</h2>
          <ul>
            <li><strong>Official Partners:</strong> JioHotstar, Paytm Insider, BookMyShow</li>
            <li><strong>Price Range:</strong> ₹800 to ₹60,000+</li>
            <li><strong>Dates:</strong> Booking live across all 10 iconic venues</li>
          </ul>

          <p>Check the full pricing table and step-by-step booking guide on our premium ticketing hub.</p>
        `
      },
      {
        title: "IPL Match Tickets 2026 – Online Booking Guide",
        slug: "ipl-match-tickets-2026-booking-online",
        category: "tickets",
        image: "/ipl_2026_online_booking_app_ui.png",
        keywords: "IPL match tickets 2026 booking online, IPL 2026 online tickets, IPL ticket booking app, book IPL tickets 2026",
        content: `
          <p>Gone are the days of standing in long queues. For IPL 2026, 95% of tickets are being sold exclusively online. Secure your seats from your mobile or desktop!</p>
          
          <h2>Booking Tips</h2>
          <ul>
            <li><strong>Top Apps:</strong> Paytm Insider, BookMyShow, JioHotstar</li>
            <li><strong>QR Entry:</strong> Digital tickets are accepted at almost all venues</li>
            <li><strong>Pre-Registration:</strong> Highly recommended for high-traffic matches</li>
          </ul>

          <p>Compare booking platforms and learn fast-booking tricks on our premium online ticketing guide.</p>
        `
      },
      {
        title: "IPL 2026: Complete Guide, Teams, Schedule & Predictions",
        slug: "ipl-2026-complete-guide-teams-schedule-predictions",
        category: "guide",
        image: "/ipl_2026_mega_guide_trophy.png",
        keywords: "IPL 2026 complete guide, IPL 2026 teams list, IPL 2026 predictions, IPL 2026 schedule",
        content: `
          <p>Welcome to the ultimate guide for TATA IPL 2026! From the opening clash in Bengaluru to the final showdown, we cover every team, every captain, and every prediction for the 19th edition.</p>
          
          <h2>Tournament Overview</h2>
          <ul>
            <li><strong>Total Teams:</strong> 10 Professional Franchises</li>
            <li><strong>Total Matches:</strong> 74 (League + Playoffs)</li>
            <li><strong>Key Contenders:</strong> RCB, SRH, MI, KKR</li>
          </ul>

          <p>Explore our specialized hubs for schedules, squads, and tickets using the ultimate IPL 2026 mega guide.</p>
        `
      },
      {
        title: "Best IPL Prediction Apps 2026 – Features, Safety & Comparison",
        slug: "best-ipl-prediction-apps-2026",
        category: "analysis",
        image: "/best_ipl_prediction_apps_comparison_ui.png",
        keywords: "Best IPL prediction apps 2026, Stake vs 1xBet review, safe betting apps India, IPL match prediction apps",
        content: `
          <p>With the IPL 2026 season opener between RCB and SRH just hours away, fans are looking for the most accurate platforms to test their knowledge. Compare top apps like Stake and 1xBet!</p>
          
          <h2>Top Platforms</h2>
          <ul>
            <li><strong>Stake:</strong> Best for modern, crypto-friendly UI</li>
            <li><strong>1xBet:</strong> Best for raw statistical depth</li>
            <li><strong>Parimatch:</strong> Best for localized Indian payment methods</li>
          </ul>

          <p>Check the full comparison table and safety checklist on our premium prediction apps hub.</p>
        `
      },
      {
        title: "IPL Betting Apps 2026 – Legal Alternatives & Safe Platforms",
        slug: "ipl-betting-apps-2026-safe-guide",
        category: "guide",
        image: "/ipl_2026_safe_gaming_shield_visual.png",
        keywords: "IPL betting apps India 2026, safe cricket prediction apps, PROGA 2025 betting rules, Stake 1xBet India risk",
        content: `
          <p>The IPL 2026 season has arrived, and with it comes a significant shift in the Indian digital landscape. Following the PROGA 2025 Act, the rules surrounding RMG have become stricter than ever.</p>
          
          <h2>Safety Highlights</h2>
          <ul>
            <li><strong>Legal Status:</strong> Nationwide ban on unauthorized RMG wagering</li>
            <li><strong>Risk Assessment:</strong> High risk of bank account blocks for offshore sites</li>
            <li><strong>Safe Alternatives:</strong> Official Fan Engagement and Social Fantasy models</li>
          </ul>

          <p>Check the full legal risk table and "Green Flags" guide on our premium betting safety hub.</p>
        `
      },
      {
        title: "Stake IPL Promotion 2026 – Offers, Features & Full Guide",
        slug: "stake-ipl-promotion-2026-offers-guide",
        category: "analysis",
        image: "/stake_ipl_2026_promotion_banner.png",
        keywords: "Stake IPL promotion 2026, Stake early six win, Stake super over payout, Stake SGM prize pool",
        content: `
          <p>Stake has rolled out a specialized suite of promotions tailored specifically for the 2026 season. From First Ball Payouts to Super Over protection, learn how the new mechanics work.</p>
          
          <h2>Top Offers</h2>
          <ul>
            <li><strong>First Ball Payout:</strong> Instant win if your team hits a six on ball 1</li>
            <li><strong>Super Over Payout:</strong> Win even if you lose the Super Over tie-breaker</li>
            <li><strong>Weekly SGM Pool:</strong> Share in a $50,000 weekly prize pool</li>
          </ul>

          <p>Check the full feature comparison and KYC guide on our premium Stake promotion hub.</p>
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
