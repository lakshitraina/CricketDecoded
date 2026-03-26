const mongoose = require('mongoose');
const Match = require('./models/Match');
const slugify = require('slugify');

mongoose.connect('mongodb://localhost:27017/cricket_predictions')
  .then(async () => {
    console.log('Connected to MongoDB for preloading data...');
    // Clear existing for clean slate
    await Match.deleteMany({});
    
    const dummyMatches = [
      {
        team1: 'RCB', team2: 'SRH', date: '28/03/26', time: '7:30 PM', venue: 'Bengaluru',
        prediction: 'RCB has a strong batting lineup at Chinnaswamy and is favored to win.',
        winProbability: { team1: 55, team2: 45 },
        pitchReport: 'Batting friendly pitch with short boundaries. High scoring game expected.',
        tossPrediction: 'Team winning the toss will likely choose to bowl first.',
        playing11: ['Virat Kohli', 'Faf du Plessis', 'Glenn Maxwell', 'Dinesh Karthik', 'Mohammed Siraj', 'Aiden Markram', 'Heinrich Klaasen', 'Bhuvneshwar Kumar', 'Pat Cummins', 'T Natarajan', 'Washington Sundar']
      },
      {
        team1: 'MI', team2: 'KKR', date: '29/03/26', time: '7:30 PM', venue: 'Mumbai',
        prediction: 'MI has home advantage and a strong record at Wankhede against KKR.',
        winProbability: { team1: 60, team2: 40 },
        pitchReport: 'Good pace and bounce. Helps fast bowlers early on. Dew factor in the second innings.',
        tossPrediction: 'Chase preferred due to dew.',
        playing11: ['Rohit Sharma', 'Ishan Kishan', 'Suryakumar Yadav', 'Hardik Pandya', 'Jasprit Bumrah', 'Shreyas Iyer', 'Andre Russell', 'Sunil Narine', 'Rinku Singh', 'Varun Chakaravarthy', 'Mitchell Starc']
      },
      {
        team1: 'CSK', team2: 'RR', date: '30/03/26', time: '7:30 PM', venue: 'Chennai',
        prediction: 'CSK spinners will dominate the slow Chepauk track.',
        winProbability: { team1: 65, team2: 35 },
        pitchReport: 'Slow and dry pitch. Spinners will get a lot of turn.',
        tossPrediction: 'Bat first and put runs on the board.',
        playing11: ['Ruturaj Gaikwad', 'Rachin Ravindra', 'Shivam Dube', 'MS Dhoni', 'Ravindra Jadeja', 'Sanju Samson', 'Jos Buttler', 'Yashasvi Jaiswal', 'Ravichandran Ashwin', 'Yuzvendra Chahal', 'Trent Boult']
      }
    ];

    for (const m of dummyMatches) {
        m.slug = slugify(`${m.team1} vs ${m.team2} prediction today 2026`, { lower: true, strict: true });
        const newMatch = new Match(m);
        await newMatch.save();
    }

    console.log('Data preloaded successfully!');
    process.exit(0);
  })
  .catch(err => {
    console.error('MongoDB connection error during preload:', err.message);
    process.exit(1);
  });
