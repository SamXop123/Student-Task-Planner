const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// CORS
// - In production, set CLIENT_URL to your Vercel URL (e.g. https://your-app.vercel.app)
// - Do NOT use origin: '*' with credentials: true (browsers will block it)
const allowedOrigins = (process.env.CLIENT_URL || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, cb) => {
      // Allow non-browser requests or same-origin calls (no Origin header)
      if (!origin) return cb(null, true);

      // If no allowlist is configured, default to allowing requests (useful for local dev)
      if (allowedOrigins.length === 0) return cb(null, true);

      if (allowedOrigins.includes(origin)) return cb(null, true);
      return cb(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Preflight
app.options('*', cors());

app.use(express.json({ limit: '1mb' }));

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Student Task Planner API is healthy',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/tasks', taskRoutes);

app.use((req, res, next) => {
  const error = new Error(`Route ${req.originalUrl} not found`);
  error.status = 404;
  next(error);
});

app.use(errorHandler);

module.exports = app;
