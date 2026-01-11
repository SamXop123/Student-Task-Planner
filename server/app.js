const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true
}));
app.use(express.json({ limit: '1mb' }));

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Student Task Planner API is healthy',
    timestamp: new Date().toISOString()
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

