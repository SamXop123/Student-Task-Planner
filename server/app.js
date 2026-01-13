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

// Build CORS options once so both normal requests and preflights behave the same
const corsOptions = {
  origin: (origin, cb) => {
    // Allow non-browser requests or same-origin calls (no Origin header)
    if (!origin) return cb(null, true);

    // If no allowlist is configured, default to allowing requests (useful for local dev)
    if (allowedOrigins.length === 0) return cb(null, true);

    if (allowedOrigins.includes(origin)) return cb(null, true);

    // Return a typed error so our error handler can map it cleanly
    const err = new Error('Not allowed by CORS');
    err.status = 403;
    return cb(err);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// Preflight must use the same options; otherwise it may fail even when the actual route would work
app.options('*', cors(corsOptions));

app.use(express.json({ limit: '1mb' }));

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Student Task Planner API is healthy',
    timestamp: new Date().toISOString(),
  });
});

// Compatibility: if a client hits /tasks directly (missing /api), forward to the same task router
// This preserves query strings like /tasks?status=all...
app.use('/tasks', (req, res, next) => {
  // When mounted at /tasks, Express sets req.baseUrl='/tasks' and req.url to the remaining path + query
  // We can simply rewrite to the root of the task router.
  req.url = req.url || '/';
  return taskRoutes(req, res, next);
});

// Ignore favicon requests (common in browsers)
app.get('/favicon.ico', (req, res) => res.status(204).end());

app.use('/api/tasks', taskRoutes);

app.use((req, res, next) => {
  const error = new Error(`Route ${req.originalUrl} not found`);
  error.status = 404;
  next(error);
});

app.use(errorHandler);

module.exports = app;
