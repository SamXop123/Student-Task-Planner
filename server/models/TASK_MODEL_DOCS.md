# Task Model Documentation

## Overview
This document describes the MongoDB Mongoose schema for the Task entity used in the Student Task Planner application.

## Schema Fields

### Core Fields

| Field | Type | Required | Validation | Description |
|-------|------|----------|------------|-------------|
| `title` | String | ✅ Yes | Max 100 chars, trimmed | The task title/name |
| `description` | String | ❌ No | Max 500 chars, trimmed | Detailed description of the task |
| `priority` | String | ❌ No | Enum: 'low', 'medium', 'high' | Task priority level (default: 'medium') |
| `dueDate` | Date | ❌ No | Cannot be in the past (for new tasks) | When the task is due |
| `completed` | Boolean | ❌ No | Default: false | Whether the task is completed |

### Automatic Fields (Timestamps)

| Field | Type | Description |
|-------|------|-------------|
| `createdAt` | Date | Automatically set when task is created |
| `updatedAt` | Date | Automatically updated when task is modified |

## Virtual Properties

### `isOverdue`
- **Type**: Boolean (computed)
- **Description**: Returns `true` if the task has a due date in the past and is not completed
- **Usage**: `task.isOverdue`

## Instance Methods

### `toggleComplete()`
```javascript
await task.toggleComplete();
```
Toggles the completion status of the task and saves it to the database.

## Static Methods

### `findOverdue()`
```javascript
const overdueTasks = await Task.findOverdue();
```
Finds all incomplete tasks with due dates in the past.

### `findByPriority(priority)`
```javascript
const highPriorityTasks = await Task.findByPriority('high');
```
Finds all tasks with a specific priority level, sorted by due date.

## Indexes

The schema includes the following indexes for optimized queries:
- Compound index on `completed` and `dueDate`
- Single index on `priority`

## Example Usage

### Creating a New Task
```javascript
const Task = require('./models/Task');

const newTask = new Task({
  title: 'Complete Math Assignment',
  description: 'Finish problems 1-20 from Chapter 5',
  priority: 'high',
  dueDate: new Date('2026-01-15'),
  completed: false
});

await newTask.save();
```

### Querying Tasks
```javascript
// Find all incomplete tasks
const incompleteTasks = await Task.find({ completed: false });

// Find high priority tasks
const highPriorityTasks = await Task.findByPriority('high');

// Find overdue tasks
const overdueTasks = await Task.findOverdue();

// Find tasks due this week
const weekEnd = new Date();
weekEnd.setDate(weekEnd.getDate() + 7);
const thisWeekTasks = await Task.find({
  dueDate: { $lte: weekEnd },
  completed: false
}).sort({ dueDate: 1 });
```

### Updating a Task
```javascript
const task = await Task.findById(taskId);
task.completed = true;
await task.save();

// Or use toggleComplete method
await task.toggleComplete();
```

### Deleting a Task
```javascript
await Task.findByIdAndDelete(taskId);
```

## Validation Messages

- **Title Required**: "Task title is required"
- **Title Length**: "Title cannot exceed 100 characters"
- **Description Length**: "Description cannot exceed 500 characters"
- **Priority Enum**: "{VALUE} is not a valid priority level"
- **Due Date**: "Due date cannot be in the past"

## Notes

- The `timestamps: true` option automatically manages `createdAt` and `updatedAt` fields
- The schema uses `trim: true` for string fields to remove leading/trailing whitespace
- Priority defaults to 'medium' if not specified
- The due date validation only applies to new tasks to allow editing of existing tasks
- Virtual properties are included in JSON/Object conversions for API responses

