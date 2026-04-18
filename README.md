# Cricket Decoded 🏏💎

A premium, full-stack cricket prediction and analytics platform synchronized with the 2026 IPL schedule. Built with a sleek glassmorphism UI/UX design, the platform features real-time data, AI-driven win probabilities, and dynamic scheduling.

**Live URL:** [jioipl.in](https://jioipl.in)

## 🚀 Features
- **Dynamic Live Match Counter:** A smart ticker that accurately tracks matches from 7 PM - 11 PM IST.
- **Accurate 2026 IPL Scheduling:** The database is perfectly synced with actual fixture dates, venues, and timings.
- **AI-Powered Predictions:** In-depth match analysis, tactical overviews, and win probabilities.
- **Modern UI/UX:** Built with a minimal, dark theme using glassmorphism components and a responsive Bento-grid layout.

## 🛠️ Tech Stack
This is a monolithic repository containing both the frontend and the backend.

### **Frontend** (`/frontend`)
- **Framework:** Next.js (React)
- **Styling:** Custom CSS (Glassmorphism, Animations)
- **Deployment:** Netlify (SSR)

### **Backend** (`/backend`)
- **Framework:** Node.js, Express.js
- **Database:** MongoDB (Atlas)
- **Deployment:** Render (Web Service)

---

## 🏃 Local Setup

### 1. Clone the Repository
```bash
git clone https://github.com/lakshitraina/CricketDecoded.git
cd CricketDecoded
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory:
```env
MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000
```
Start the server:
```bash
npm start
```

### 3. Frontend Setup
Open a new terminal window:
```bash
cd frontend
npm install
```
Create a `.env.local` file in the `frontend` directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```
Start the development server:
```bash
npm run dev
```

The application will be running at `http://localhost:3000`.

---
*Built with precision for cricket enthusiasts.*
By Lakshit Raina ❤️ in India.
