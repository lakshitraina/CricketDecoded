require('dotenv').config();
const mongoose = require('mongoose');
const slugify = require('slugify');
const Match = require('./models/Match');
const Blog = require('./models/Blog');
const squads = require('./squads');

const fixtures = [
  { team1: 'RCB', team2: 'SRH', date: '2026-03-28', time: '7:30 PM', venue: 'Bengaluru' },
  { team1: 'MI', team2: 'KKR', date: '2026-03-29', time: '7:30 PM', venue: 'Mumbai' },
  { team1: 'RR', team2: 'CSK', date: '2026-03-30', time: '7:30 PM', venue: 'Guwahati' },
  { team1: 'PBKS', team2: 'GT', date: '2026-03-31', time: '7:30 PM', venue: 'New Chandigarh' },
  { team1: 'LSG', team2: 'DC', date: '2026-04-01', time: '7:30 PM', venue: 'Lucknow' },
  { team1: 'KKR', team2: 'SRH', date: '2026-04-02', time: '7:30 PM', venue: 'Kolkata' },
  { team1: 'CSK', team2: 'PBKS', date: '2026-04-03', time: '7:30 PM', venue: 'Chennai' },
  { team1: 'DC', team2: 'MI', date: '2026-04-04', time: '3:30 PM', venue: 'Delhi' },
  { team1: 'GT', team2: 'RR', date: '2026-04-04', time: '7:30 PM', venue: 'Ahmedabad' },
  { team1: 'SRH', team2: 'LSG', date: '2026-04-05', time: '3:30 PM', venue: 'Hyderabad' },
  { team1: 'RCB', team2: 'CSK', date: '2026-04-05', time: '7:30 PM', venue: 'Bengaluru' },
  { team1: 'KKR', team2: 'PBKS', date: '2026-04-06', time: '7:30 PM', venue: 'Kolkata' },
  { team1: 'RR', team2: 'MI', date: '2026-04-07', time: '7:30 PM', venue: 'Guwahati' },
  { team1: 'DC', team2: 'GT', date: '2026-04-08', time: '7:30 PM', venue: 'Delhi' },
  { team1: 'KKR', team2: 'LSG', date: '2026-04-09', time: '7:30 PM', venue: 'Kolkata' },
  { team1: 'RR', team2: 'RCB', date: '2026-04-10', time: '7:30 PM', venue: 'Guwahati' },
  { team1: 'PBKS', team2: 'SRH', date: '2026-04-11', time: '3:30 PM', venue: 'New Chandigarh' },
  { team1: 'CSK', team2: 'DC', date: '2026-04-11', time: '7:30 PM', venue: 'Chennai' },
  { team1: 'LSG', team2: 'GT', date: '2026-04-12', time: '3:30 PM', venue: 'Lucknow' },
  { team1: 'MI', team2: 'RCB', date: '2026-04-12', time: '7:30 PM', venue: 'Mumbai' }
];

const pick11 = (team) => {
  const squad = squads[team] || squads['RCB']; // fallback
  // Shuffle and pick 11
  const shuffled = squad.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 11);
};

const generateMatchData = (fixture) => {
  const { team1, team2, venue } = fixture;
  const p1 = Math.floor(Math.random() * 20) + 40; // 40-60
  const winProbability = { team1: p1, team2: 100 - p1 };
  const prediction = p1 > 50 ? `${team1} looks stronger on paper and has a higher chance to win at ${venue}.` : `${team2} has the momentum and firepower to clinch a victory against ${team1}.`;
  
  const pitchReport = `The pitch at ${venue} is expected to be sporting. Batsmen will enjoy the even bounce, while spinners might get some grip in the middle overs. Par score is around 170-180.`;
  const tossPrediction = `The team winning the toss should look to bowl first, as dew might play a factor later in the evening at ${venue}.`;
  
  return {
    ...fixture,
    winProbability,
    prediction,
    pitchReport,
    tossPrediction,
    playing11: [...pick11(team1), ...pick11(team2)],
    slug: slugify(`${team1} vs ${team2} prediction today 2026-${Math.floor(Math.random()*1000)}`, { lower: true, strict: true })
  };
};

const generateBlog = (match, type) => {
  let title, content, category;
  const { team1, team2, venue, date } = match;

  if (type === 'prediction') {
    title = `${team1} vs ${team2} Match Prediction Today 2026`;
    category = 'prediction';
    content = `
      <h1>${title}</h1>
      <p>Get the most accurate match prediction for ${team1} vs ${team2} happening on ${date} at ${venue}.</p>
      <h2>Match Preview</h2>
      <p>The clash between ${team1} and ${team2} is always a high-octane encounter...</p>
      <h2>Expected Playing 11</h2>
      <p><strong>${team1}:</strong> ${match.playing11.slice(0, 11).join(', ')}</p>
      <p><strong>${team2}:</strong> ${match.playing11.slice(11).join(', ')}</p>
      <h2>Our Prediction</h2>
      <p><strong>${match.prediction}</strong></p>
    `;
  } else if (type === 'toss') {
    title = `Who Will Win Toss Today: ${team1} vs ${team2}`;
    category = 'toss';
    content = `
      <h1>${title}</h1>
      <p>Toss plays a crucial role in T20s. For the ${team1} vs ${team2} match at ${venue}...</p>
      <h2>Toss Prediction</h2>
      <p>${match.tossPrediction}</p>
    `;
  } else {
    title = `${team1} vs ${team2} Pitch Report Today Match at ${venue}`; // unique
    category = 'pitch';
    content = `
      <h1>${title}</h1>
      <p>Understanding the pitch at ${venue} is key for fantasy teams.</p>
      <h2>Detailed Pitch Report</h2>
      <p>${match.pitchReport}</p>
    `;
  }

  // Use Math.random inside slug generator to ensure 100% uniqueness in our test
  return {
    title,
    slug: slugify(title + `-${Math.floor(Math.random()*10000)}`, { lower: true, strict: true }),
    content,
    keywords: `${team1} vs ${team2}, match prediction, pitch report, toss prediction, ${venue}`,
    matchId: match._id,
    category
  };
};

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB. Running Auto Engine...');
    await Match.deleteMany({});
    await Blog.deleteMany({});

    for (const fix of fixtures) {
      const matchData = generateMatchData(fix);
      const newMatch = new Match(matchData);
      await newMatch.save();

      // Generate 3 blogs
      const blogs = [
        generateBlog(newMatch, 'prediction'),
        generateBlog(newMatch, 'toss'),
        generateBlog(newMatch, 'pitch')
      ];

      for (const b of blogs) {
        await new Blog(b).save();
      }
      console.log(`Successfully generated Match & Blogs for ${fix.team1} vs ${fix.team2}`);
    }

    console.log('Auto Engine has successfully populated the Database!');
    process.exit(0);
  })
  .catch(err => {
    console.error('MongoDB Auto Engine Error:', err);
    process.exit(1);
  });
