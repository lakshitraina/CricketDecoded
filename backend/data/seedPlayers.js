const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Player = require('../models/Player');

dotenv.config({ path: '../.env' }); // Ensure it reads from backend/.env

const playersData = [
  { name: 'Virat Kohli', role: 'Batter', basePrice: 2.0, nationality: 'Indian' },
  { name: 'Rohit Sharma', role: 'Batter', basePrice: 2.0, nationality: 'Indian' },
  { name: 'MS Dhoni', role: 'Wicketkeeper', basePrice: 2.0, nationality: 'Indian' },
  { name: 'Rishabh Pant', role: 'Wicketkeeper', basePrice: 2.0, nationality: 'Indian' },
  { name: 'Jasprit Bumrah', role: 'Bowler', basePrice: 2.0, nationality: 'Indian' },
  { name: 'Hardik Pandya', role: 'All-Rounder', basePrice: 2.0, nationality: 'Indian' },
  { name: 'Suryakumar Yadav', role: 'Batter', basePrice: 2.0, nationality: 'Indian' },
  { name: 'KL Rahul', role: 'Wicketkeeper', basePrice: 2.0, nationality: 'Indian' },
  { name: 'Ravindra Jadeja', role: 'All-Rounder', basePrice: 2.0, nationality: 'Indian' },
  { name: 'Shubman Gill', role: 'Batter', basePrice: 2.0, nationality: 'Indian' },
  { name: 'Shreyas Iyer', role: 'Batter', basePrice: 1.5, nationality: 'Indian' },
  { name: 'Yashasvi Jaiswal', role: 'Batter', basePrice: 1.5, nationality: 'Indian' },
  { name: 'Ruturaj Gaikwad', role: 'Batter', basePrice: 1.5, nationality: 'Indian' },
  { name: 'Sanju Samson', role: 'Wicketkeeper', basePrice: 2.0, nationality: 'Indian' },
  { name: 'Ishan Kishan', role: 'Wicketkeeper', basePrice: 1.5, nationality: 'Indian' },
  { name: 'Mohammed Siraj', role: 'Bowler', basePrice: 2.0, nationality: 'Indian' },
  { name: 'Mohammed Shami', role: 'Bowler', basePrice: 2.0, nationality: 'Indian' },
  { name: 'Kuldeep Yadav', role: 'All-Rounder', basePrice: 1.5, nationality: 'Indian' },
  { name: 'Axar Patel', role: 'All-Rounder', basePrice: 1.5, nationality: 'Indian' },
  { name: 'Rinku Singh', role: 'Batter', basePrice: 1.0, nationality: 'Indian' },
  { name: 'Arshdeep Singh', role: 'Bowler', basePrice: 1.0, nationality: 'Indian' },
  { name: 'Yuzvendra Chahal', role: 'Bowler', basePrice: 1.5, nationality: 'Indian' },
  { name: 'Ravichandran Ashwin', role: 'Bowler', basePrice: 1.5, nationality: 'Indian' },
  { name: 'Tilak Varma', role: 'Batter', basePrice: 1.0, nationality: 'Indian' },
  { name: 'Shivam Dube', role: 'All-Rounder', basePrice: 1.5, nationality: 'Indian' },
  { name: 'Mitchell Starc', role: 'Bowler', basePrice: 2.0, nationality: 'Overseas' },
  { name: 'Pat Cummins', role: 'Bowler', basePrice: 2.0, nationality: 'Overseas' },
  { name: 'Travis Head', role: 'Batter', basePrice: 2.0, nationality: 'Overseas' },
  { name: 'Glenn Maxwell', role: 'All-Rounder', basePrice: 2.0, nationality: 'Overseas' },
  { name: 'Heinrich Klaasen', role: 'Wicketkeeper', basePrice: 2.0, nationality: 'Overseas' },
  { name: 'Rashid Khan', role: 'Bowler', basePrice: 2.0, nationality: 'Overseas' },
  { name: 'Nicholas Pooran', role: 'Wicketkeeper', basePrice: 2.0, nationality: 'Overseas' },
  { name: 'Trent Boult', role: 'Bowler', basePrice: 2.0, nationality: 'Overseas' },
  { name: 'Jos Buttler', role: 'Wicketkeeper', basePrice: 2.0, nationality: 'Overseas' },
  { name: 'Sunil Narine', role: 'All-Rounder', basePrice: 2.0, nationality: 'Overseas' },
  { name: 'Quinton de Kock', role: 'Wicketkeeper', basePrice: 2.0, nationality: 'Overseas' },
  { name: 'David Warner', role: 'Batter', basePrice: 2.0, nationality: 'Overseas' },
  { name: 'Kagiso Boult', role: 'Bowler', basePrice: 2.0, nationality: 'Overseas' },
  { name: 'Jofra Archer', role: 'Bowler', basePrice: 2.0, nationality: 'Overseas' },
  { name: 'Sam Curran', role: 'All-Rounder', basePrice: 1.5, nationality: 'Overseas' },
  { name: 'Cameron Green', role: 'All-Rounder', basePrice: 2.0, nationality: 'Overseas' },
  { name: 'Marcus Stoinis', role: 'All-Rounder', basePrice: 1.5, nationality: 'Overseas' },
  { name: 'Liam Livingstone', role: 'All-Rounder', basePrice: 1.5, nationality: 'Overseas' },
  { name: 'Jonny Bairstow', role: 'Batter', basePrice: 1.5, nationality: 'Overseas' },
  { name: 'Jason Roy', role: 'Wicketkeeper', basePrice: 1.0, nationality: 'Overseas' },
  { name: 'Rachin Ravindra', role: 'Batter', basePrice: 1.5, nationality: 'Overseas' },
  { name: 'Mustafizur Rahman', role: 'Bowler', basePrice: 1.5, nationality: 'Overseas' },
  { name: 'Tim David', role: 'All-Rounder', basePrice: 1.0, nationality: 'Overseas' },
  { name: 'Ben Stokes', role: 'All-Rounder', basePrice: 2.0, nationality: 'Overseas' },
  { name: 'Will Jacks', role: 'All-Rounder', basePrice: 1.0, nationality: 'Overseas' }
];

const seedDB = async () => {
  try {
    // If not connected already
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    }
    
    console.log('Connected to DB. Clearing old players...');
    await Player.deleteMany({});
    
    console.log('Inserting 50 new players...');
    await Player.insertMany(playersData);
    
    console.log('Database successfully seeded!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedDB();
