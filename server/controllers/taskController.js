const Task = require('../models/Task');
const { validateTaskInput } = require('../utils/validators');
const { buildTaskFilter, sortTasks } = require('../utils/query');

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};


const createTask = asyncHandler(async (req, res) => {
  const { error, value } = validateTaskInput(req.body, true);
  if (error) {
    return res.status(400).json({ success: false, error: error.details.map(d => d.message) });
  }

  const task = await Task.create({ ...value, userId: req.user.uid });
  res.status(201).json({ success: true, data: task });
});

const getTasks = asyncHandler(async (req, res) => {
  const filter = buildTaskFilter(req.query);

  filter.userId = req.user.uid;

  const tasks = await Task.find(filter);

  const sortBy = (req.query.sortBy || 'dueDate').toLowerCase();
  const order = (req.query.order || 'asc').toLowerCase();

  const sorted = sortTasks(tasks, { sortBy, order });

  res.status(200).json({ success: true, count: sorted.length, data: sorted });
});

/*Get a single task by ID*/
const getTaskById = asyncHandler(async (req, res, next) => {
  // Only allow user to fetch their own tasks
  const task = await Task.findOne({ _id: req.params.id, userId: req.user.uid });

  if (!task) {
    const error = new Error('Task not found');
    error.status = 404;
    return next(error);
  }

  res.status(200).json({ success: true, data: task });
});

/*Update a task*/
const updateTask = asyncHandler(async (req, res, next) => {
  const { error, value } = validateTaskInput(req.body, false);
  if (error) {
    return res.status(400).json({ success: false, error: error.details.map(d => d.message) });
  }

  // Only allow user to update their own tasks
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.uid },
    value,
    {
      new: true,
      runValidators: true
    }
  );

  if (!task) {
    const errNotFound = new Error('Task not found');
    errNotFound.status = 404;
    return next(errNotFound);
  }

  res.status(200).json({ success: true, data: task });
});

/*Delete a task*/
const deleteTask = asyncHandler(async (req, res, next) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.uid });
  
  if (!task) {
    const error = new Error('Task not found');
    error.status = 404;
    return next(error);
  }

  res.status(200).json({ success: true, message: 'Task deleted successfully' });
});

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
};
