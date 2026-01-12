# 🔌 API Integration Guide

## Overview

This document explains how the frontend integrates with the backend APIs using Axios.

---

## 📁 File Structure

```
src/
├── services/
│   └── api.js          # Axios instance + taskService methods
├── hooks/
│   └── useTasks.js     # State management + API orchestration
└── App.jsx             # UI layer + event handlers
```

---

## 🔄 Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER INTERACTION                         │
│  (Click Add, Edit, Delete, Toggle, Filter, Sort)                │
└─────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                           App.jsx                                │
│  - Handles UI events (handleAddTask, handleDelete, etc.)        │
│  - Shows notifications on success                                │
│  - Manages modal state                                           │
└─────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                       useTasks Hook                              │
│  - Manages tasks[], loading, error, filters state               │
│  - Implements optimistic updates                                 │
│  - Handles rollback on API failure                               │
│  - Auto-fetches when filters change                              │
└─────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                       taskService (api.js)                       │
│  - getTasks(params)    → GET /api/tasks                         │
│  - createTask(data)    → POST /api/tasks                        │
│  - updateTask(id,data) → PUT /api/tasks/:id                     │
│  - deleteTask(id)      → DELETE /api/tasks/:id                  │
└─────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                     Axios Interceptors                           │
│  - Request: Add auth headers (future)                           │
│  - Response: Parse errors, add userMessage                      │
└─────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Backend API Server                          │
│  http://localhost:5000/api/tasks                                │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔧 API Service (services/api.js)

### Axios Instance Configuration

```javascript
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});
```

### Request Interceptor

- Runs before every request
- Can add authentication tokens
- Logs requests in development

### Response Interceptor

- Handles errors globally
- Adds user-friendly `error.userMessage`
- Maps HTTP status codes to messages:
  - 400 → "Invalid request..."
  - 404 → "Resource not found"
  - 500 → "Server error..."
  - Network error → "Network error..."

### taskService Methods

| Method | API Call | Description |
|--------|----------|-------------|
| `getTasks(params)` | GET /api/tasks | Fetch all tasks with filters |
| `getTask(id)` | GET /api/tasks/:id | Get single task |
| `createTask(data)` | POST /api/tasks | Create new task |
| `updateTask(id, data)` | PUT /api/tasks/:id | Update task |
| `deleteTask(id)` | DELETE /api/tasks/:id | Delete task |

---

## 🪝 useTasks Hook (hooks/useTasks.js)

### State

```javascript
{
  tasks: [],           // Array of task objects
  loading: true,       // Loading indicator
  error: null,         // Error message string
  filters: {
    status: 'all',     // 'all' | 'pending' | 'completed'
    sortBy: 'dueDate', // 'dueDate' | 'priority'
    order: 'asc',      // 'asc' | 'desc'
  }
}
```

### Actions

| Action | Description |
|--------|-------------|
| `fetchTasks()` | Fetch tasks from API with current filters |
| `addTask(data)` | Create task, add to local state |
| `updateTask(id, data)` | Update task with optimistic UI |
| `toggleComplete(id)` | Toggle completed status with optimistic UI |
| `deleteTask(id)` | Delete task with optimistic UI |
| `updateFilters(filters)` | Update filters, triggers refetch |
| `clearError()` | Clear error message |

### Optimistic Updates

For better UX, the hook updates the UI immediately before the API call completes:

```javascript
// Example: toggleComplete
const toggleComplete = async (id) => {
  // 1. Store previous state for rollback
  const previousTasks = [...tasks];
  
  // 2. Optimistic update - UI updates immediately
  setTasks(prev => prev.map(t => 
    t._id === id ? { ...t, completed: !t.completed } : t
  ));

  try {
    // 3. API call
    const response = await taskService.updateTask(id, { completed: !task.completed });
    
    // 4. Sync with server response
    setTasks(prev => prev.map(t => t._id === id ? response.data : t));
  } catch (err) {
    // 5. Rollback on error
    setTasks(previousTasks);
    setError(err.userMessage);
  }
};
```

### Auto-fetch on Filter Change

```javascript
// Filters trigger refetch automatically
useEffect(() => {
  fetchTasks();
}, [fetchTasks]); // fetchTasks depends on filters via useCallback
```

---

## 🎯 Implemented Flows

### 1. Fetch Tasks on Page Load

```
App mounts
  → useTasks hook initializes
    → fetchTasks() called
      → taskService.getTasks(filters)
        → GET /api/tasks?status=all&sortBy=dueDate&order=asc
          → Response: { success: true, data: [...tasks] }
            → setTasks(data)
              → UI renders TaskList
```

### 2. Add New Task

```
User clicks "Add Task"
  → Modal opens with AddTaskForm
    → User fills form, clicks Submit
      → handleAddTask(taskData)
        → addTask(taskData)
          → taskService.createTask(taskData)
            → POST /api/tasks
              → Response: { success: true, data: newTask }
                → setTasks([...prev, newTask])
                  → showNotification("Task added!")
                    → Modal closes
```

### 3. Edit Task

```
User clicks Edit icon on TaskCard
  → Modal opens with EditTaskForm (pre-populated)
    → User modifies, clicks Save
      → handleUpdateTask(id, taskData)
        → updateTask(id, taskData)
          → Optimistic: setTasks with merged data
            → taskService.updateTask(id, taskData)
              → PUT /api/tasks/:id
                → Response: { success: true, data: updatedTask }
                  → setTasks with server data
                    → showNotification("Task updated!")
                      → Modal closes
```

### 4. Delete Task

```
User clicks Delete icon
  → window.confirm("Are you sure?")
    → If confirmed:
      → deleteTask(id)
        → Optimistic: setTasks(filter out task)
          → taskService.deleteTask(id)
            → DELETE /api/tasks/:id
              → Response: { success: true }
                → showNotification("Task deleted!")
    → If cancelled: nothing happens
```

### 5. Toggle Completed

```
User clicks checkbox on TaskCard
  → toggleComplete(id)
    → Optimistic: setTasks with toggled completed
      → taskService.updateTask(id, { completed: !completed })
        → PUT /api/tasks/:id
          → Response: { success: true, data: updatedTask }
            → setTasks with server data
              → UI shows green checkmark / strikethrough
```

### 6. Filter Tasks

```
User clicks "Pending" in FilterBar
  → onFilterChange({ status: 'pending' })
    → updateFilters({ status: 'pending' })
      → setFilters merged
        → useEffect triggers fetchTasks
          → GET /api/tasks?status=pending&sortBy=dueDate&order=asc
            → setTasks with filtered results
```

### 7. Sort Tasks

```
User selects "Priority" in sort dropdown
  → onFilterChange({ sortBy: 'priority' })
    → updateFilters({ sortBy: 'priority' })
      → useEffect triggers fetchTasks
        → GET /api/tasks?status=all&sortBy=priority&order=asc
          → setTasks with sorted results
```

---

## 📊 Request/Response Examples

### GET /api/tasks

**Request:**
```
GET /api/tasks?status=pending&sortBy=priority&order=desc
```

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "abc123",
      "title": "Complete Assignment",
      "description": "Math homework",
      "priority": "high",
      "dueDate": "2026-01-15T00:00:00.000Z",
      "completed": false,
      "createdAt": "2026-01-11T10:00:00.000Z"
    }
  ]
}
```

### POST /api/tasks

**Request:**
```json
{
  "title": "New Task",
  "description": "Description here",
  "priority": "medium",
  "dueDate": "2026-01-20T00:00:00.000Z"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "xyz789",
    "title": "New Task",
    "priority": "medium",
    "completed": false,
    "createdAt": "2026-01-11T12:00:00.000Z"
  }
}
```

### Error Response

```json
{
  "success": false,
  "error": "Title is required"
}
```

---
