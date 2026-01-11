# Student Task Planner - Backend Server

Express.js API server with MongoDB/Mongoose for the Student Task Planner application.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account (or local MongoDB installation)
- npm or yarn

### Installation

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Update `.env` with your MongoDB connection string:
```env
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/student-task-planner
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

5. Start the development server:
```bash
npm run dev
```

The server will start on `http://localhost:5000`

## 📁 Project Structure

```
server/
├── models/
│   ├── Task.js                 # Mongoose Task schema
│   └── TASK_MODEL_DOCS.md      # Task model documentation
├── .env.example                # Environment variables template
├── server.js                   # Main server file with routes
├── package.json                # Dependencies and scripts
└── README.md                   # This file
```

## 🔌 API Endpoints

### Base URL: `http://localhost:5000/api`

#### Health Check
```
GET /api/health
```
Returns server status.

#### Tasks

| Method | Endpoint | Description | Query Params |
|--------|----------|-------------|--------------|
| GET | `/tasks` | Get all tasks | `priority`, `completed`, `sortBy`, `order` |
| GET | `/tasks/:id` | Get single task | - |
| POST | `/tasks` | Create new task | - |
| PUT | `/tasks/:id` | Update task | - |
| PATCH | `/tasks/:id/toggle` | Toggle task completion | - |
| DELETE | `/tasks/:id` | Delete task | - |
| GET | `/tasks/filter/overdue` | Get overdue tasks | - |

### Query Parameters

#### GET /api/tasks
- `priority`: Filter by priority (`low`, `medium`, `high`)
- `completed`: Filter by completion status (`true`, `false`)
- `sortBy`: Sort field (default: `dueDate`)
- `order`: Sort order (`asc`, `desc`) (default: `asc`)

**Example:**
```
GET /api/tasks?priority=high&completed=false&sortBy=dueDate&order=asc
```

## 📝 Request/Response Examples

### Create a Task (POST /api/tasks)

**Request Body:**
```json
{
  "title": "Complete Math Homework",
  "description": "Solve problems 1-20 from Chapter 5",
  "priority": "high",
  "dueDate": "2026-01-15T23:59:59.999Z"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Complete Math Homework",
    "description": "Solve problems 1-20 from Chapter 5",
    "priority": "high",
    "dueDate": "2026-01-15T23:59:59.999Z",
    "completed": false,
    "createdAt": "2026-01-11T10:30:00.000Z",
    "updatedAt": "2026-01-11T10:30:00.000Z",
    "isOverdue": false
  }
}
```

### Get All Tasks (GET /api/tasks)

**Response (200 OK):**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Complete Math Homework",
      "priority": "high",
      "dueDate": "2026-01-15T23:59:59.999Z",
      "completed": false,
      "createdAt": "2026-01-11T10:30:00.000Z",
      "updatedAt": "2026-01-11T10:30:00.000Z"
    },
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Study for Physics Test",
      "priority": "medium",
      "dueDate": "2026-01-20T23:59:59.999Z",
      "completed": false,
      "createdAt": "2026-01-11T11:00:00.000Z",
      "updatedAt": "2026-01-11T11:00:00.000Z"
    }
  ]
}
```

### Update a Task (PUT /api/tasks/:id)

**Request Body:**
```json
{
  "completed": true
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Complete Math Homework",
    "completed": true,
    "updatedAt": "2026-01-11T14:30:00.000Z"
  }
}
```

### Error Response

**Response (400 Bad Request):**
```json
{
  "success": false,
  "error": [
    "Task title is required"
  ]
}
```

## 🗄️ Task Model Schema

### Fields

| Field | Type | Required | Default | Validation |
|-------|------|----------|---------|------------|
| title | String | ✅ | - | Max 100 chars |
| description | String | ❌ | - | Max 500 chars |
| priority | String | ❌ | 'medium' | Enum: low, medium, high |
| dueDate | Date | ❌ | - | Cannot be in past (new tasks) |
| completed | Boolean | ❌ | false | - |
| createdAt | Date | Auto | - | Managed by timestamps |
| updatedAt | Date | Auto | - | Managed by timestamps |

### Virtual Properties
- `isOverdue`: Boolean - Returns true if task is incomplete and past due date

### Instance Methods
- `toggleComplete()`: Toggle completion status

### Static Methods
- `findOverdue()`: Find all overdue incomplete tasks
- `findByPriority(priority)`: Find tasks by priority level

See `models/TASK_MODEL_DOCS.md` for detailed documentation.

## 🛠️ Development

### Scripts
```bash
npm start       # Start production server
npm run dev     # Start development server with nodemon
```

### Testing with curl

**Create a task:**
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Task","priority":"high","dueDate":"2026-01-20"}'
```

**Get all tasks:**
```bash
curl http://localhost:5000/api/tasks
```

**Update a task:**
```bash
curl -X PUT http://localhost:5000/api/tasks/{id} \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'
```

**Delete a task:**
```bash
curl -X DELETE http://localhost:5000/api/tasks/{id}
```

## 🚢 Deployment (Render)

### Steps:

1. Push your code to GitHub
2. Create a new Web Service on Render
3. Connect your GitHub repository
4. Configure:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: `server`
5. Add environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `NODE_ENV`: `production`
   - `CLIENT_URL`: Your Vercel frontend URL

### Environment Variables on Render:
```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/student-task-planner
NODE_ENV=production
CLIENT_URL=https://your-app.vercel.app
PORT=5000
```

## 📚 Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variable management
- **nodemon** (dev): Auto-restart server on changes

## 🔒 Security Notes

- Add `.env` to `.gitignore` (never commit credentials)
- Use environment variables for sensitive data
- Enable CORS only for your frontend domain in production
- Add rate limiting for production (recommended: express-rate-limit)
- Add helmet.js for security headers (recommended)

## 📖 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [MongoDB Atlas Setup Guide](https://www.mongodb.com/cloud/atlas)
- [Render Deployment Guide](https://render.com/docs)

## 🤝 Contributing

This is a learning project. Feel free to expand with additional features:
- Add categories/tags
- Add user authentication
- Add file attachments
- Add task comments
- Add due date reminders

---

**Built with ❤️ for students to manage their tasks effectively**

