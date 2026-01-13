# 🚀 Quick Start Guide

Get the Student Task Planner running locally in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- Git installed
- Text editor (VS Code recommended)

## Step 1: Clone & Install (2 minutes)

```bash
# Clone the repository
git clone <your-repo-url>
cd student-task-planner

# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

## Step 2: Set Up Firebase (2 minutes)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or use existing)
3. Enable **Authentication** → **Email/Password**
4. Get your config from **Project Settings** → **General** → **Your apps** → **Web app**
5. Get service account key from **Project Settings** → **Service Accounts** → **Generate new private key**

## Step 3: Set Up MongoDB (1 minute)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Create free M0 cluster
3. Create database user
4. Add IP: `0.0.0.0/0` (Network Access)
5. Get connection string (Connect → Drivers)

## Step 4: Configure Environment Variables (1 minute)

### Frontend (.env in root)
```bash
cp .env.example .env
```

Edit `.env`:
```env
VITE_API_URL=http://localhost:5000/api
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

### Backend (server/.env)
```bash
cd server
cp .env.example .env
```

Edit `server/.env`:
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-Key\n-----END PRIVATE KEY-----\n"
```

## Step 5: Run the Application

### Terminal 1 - Backend
```bash
cd server
npm run dev
```

You should see:
```
🚀 Server running on port 5000
✅ MongoDB connected successfully
```

### Terminal 2 - Frontend
```bash
# From root directory
npm run dev
```

You should see:
```
  VITE v7.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
```

## Step 6: Test the App

1. Open browser: http://localhost:5173
2. Click "Sign Up" and create an account
3. Login with your credentials
4. Create your first task!

## 🎉 Success!

You're now running the Student Task Planner locally.

### Next Steps

- Read the [full README](./README.md) for detailed documentation


