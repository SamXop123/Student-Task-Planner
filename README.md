# 📚 Student Task Planner

A modern, full-stack task management application designed for students to organize assignments, projects, and deadlines efficiently. Built with React, Express, MongoDB, and Firebase Authentication.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)
![React](https://img.shields.io/badge/react-19.2.0-61dafb)

## 🌟 Features

- **🔐 Secure Authentication**: Firebase-based user authentication with email/password
- **✅ Task Management**: Create, read, update, and delete tasks with ease
- **🎨 Priority Levels**: Organize tasks by Low, Medium, or High priority
- **📅 Due Dates**: Set and track task deadlines
- **🔍 Advanced Filtering**: Filter tasks by status, priority, and completion
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **🌓 Modern UI**: Clean, intuitive interface built with Tailwind CSS
- **👤 User Isolation**: Each user sees only their own tasks (secure multi-tenancy)
- **⚡ Real-time Updates**: Fast and responsive user experience
- **🔒 Protected Routes**: Secure API endpoints with Firebase token verification

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP client
- **Firebase** - Authentication

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Firebase Admin SDK** - Token verification
- **Joi** - Data validation
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
Student-Task-Planner/
├── src/                      # Frontend source code
│   ├── components/          # React components
│   │   ├── AddTaskForm.jsx
│   │   ├── EditTaskForm.jsx
│   │   ├── TaskCard.jsx
│   │   ├── TaskList.jsx
│   │   ├── FilterBar.jsx
│   │   ├── Header.jsx
│   │   ├── Modal.jsx
│   │   └── ProtectedRoute.jsx
│   ├── pages/               # Page components
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   └── Signup.jsx
│   ├── contexts/            # React contexts
│   │   └── AuthContext.jsx
│   ├── hooks/               # Custom hooks
│   │   ├── useAuth.js
│   │   └── useTasks.js
│   ├── services/            # API services
│   │   └── api.js
│   ├── config/              # Configuration
│   │   └── firebase.js
│   ├── App.jsx              # Main App component
│   └── main.jsx             # Entry point
│
├── server/                   # Backend source code
│   ├── controllers/         # Route controllers
│   │   └── taskController.js
│   ├── models/              # Mongoose models
│   │   └── Task.js
│   ├── routes/              # API routes
│   │   └── taskRoutes.js
│   ├── middleware/          # Custom middleware
│   │   ├── auth.js          # Firebase token verification
│   │   └── errorHandler.js
│   ├── config/              # Server configuration
│   │   └── database.js
│   ├── utils/               # Utility functions
│   │   ├── validators.js
│   │   └── query.js
│   ├── app.js               # Express app setup
│   └── server.js            # Server entry point
│
├── public/                   # Static assets
├── .env.example             # Frontend env template
├── vercel.json              # Vercel config
├── render.yaml              # Render config
└── README.md                # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm or yarn
- MongoDB Atlas account (or local MongoDB)
- Firebase project

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/student-task-planner.git
cd student-task-planner
```

### 2. Set Up Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable **Authentication** → **Email/Password** sign-in method
4. Go to **Project Settings** → **General** → Get your config values
5. Go to **Project Settings** → **Service Accounts** → Generate new private key

### 3. Set Up MongoDB

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Create a database user
4. Whitelist your IP address (or use 0.0.0.0/0 for all IPs)
5. Get your connection string

### 4. Configure Frontend

```bash
# Copy environment template
cp .env.example .env

# Edit .env with your values
VITE_API_URL=http://localhost:5000/api
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

### 5. Configure Backend

```bash
cd server
cp .env.example .env

# Edit .env with your values
MONGODB_URI=your-mongodb-connection-string
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-Key-Here\n-----END PRIVATE KEY-----\n"
```

### 6. Install Dependencies

```bash
# Install frontend dependencies (from root)
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### 7. Run the Application

**Terminal 1 - Backend:**
```bash
cd server
node server.js
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

The app will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000


## 🔒 Security Features

- **Firebase Authentication**: Industry-standard authentication
- **Token Verification**: Every API request verified via Firebase Admin SDK
- **User Isolation**: Tasks strictly scoped to authenticated user
- **Protected Routes**: Frontend and backend route protection
- **Environment Variables**: Sensitive data never committed to repository
- **Input Validation**: Server-side validation with Joi
- **Error Handling**: Secure error messages without exposing internals

## 🧪 API Endpoints

### Authentication
All task endpoints require `Authorization: Bearer <firebase-token>` header.

### Tasks
- `GET /api/tasks` - Get all user's tasks (supports filtering)
- `GET /api/tasks/:id` - Get specific task
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

**Query Parameters for GET /api/tasks:**
- `status` - Filter by completion status (completed/pending)
- `priority` - Filter by priority (low/medium/high)
- `sortBy` - Sort field (dueDate/priority/createdAt)
- `order` - Sort order (asc/desc)

## 🎨 UI Components

- **AddTaskForm** - Create new tasks
- **EditTaskForm** - Modify existing tasks
- **TaskCard** - Display individual task
- **TaskList** - Display task collection
- **FilterBar** - Filter and sort tasks
- **Header** - Navigation and user menu
- **Modal** - Reusable modal component
- **ProtectedRoute** - Route authentication guard

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

Your Name - [@SamXop123](www.github.com/SamXop123)

