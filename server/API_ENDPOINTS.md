# API Endpoints Documentation

Base URL (Development): `http://localhost:5000`  
Base URL (Production): `https://your-service.onrender.com`

## Health Check

### GET /

Check if the API server is running.

**Authentication:** Not required

**Response:**
```json
{
  "status": "ok",
  "message": "Student Task Planner API is healthy",
  "timestamp": "2026-01-13T10:30:00.000Z"
}
```

**Status Codes:**
- `200 OK` - Server is running

---

## Tasks

All task endpoints require authentication via Firebase ID token.

**Authentication Header:**
```
Authorization: Bearer <firebase-id-token>
```

### GET /api/tasks

Get all tasks for the authenticated user.

**Query Parameters:**
- `status` (optional) - Filter by status: `completed` or `pending`
- `priority` (optional) - Filter by priority: `low`, `medium`, or `high`
- `sortBy` (optional) - Sort field: `dueDate`, `priority`, or `createdAt` (default)
- `order` (optional) - Sort order: `asc` or `desc` (default)

**Example:**
```
GET /api/tasks?status=pending&priority=high&sortBy=dueDate&order=asc
```

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Complete assignment",
      "description": "Finish math homework",
      "dueDate": "2026-01-15T00:00:00.000Z",
      "priority": "high",
      "completed": false,
      "userId": "firebase-user-uid",
      "createdAt": "2026-01-13T10:00:00.000Z",
      "updatedAt": "2026-01-13T10:00:00.000Z"
    }
  ]
}
```

**Status Codes:**
- `200 OK` - Success
- `401 Unauthorized` - Missing or invalid token
- `500 Internal Server Error` - Server error

---

### GET /api/tasks/:id

Get a specific task by ID.

**Parameters:**
- `id` - Task ID (MongoDB ObjectId)

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Complete assignment",
    "description": "Finish math homework",
    "dueDate": "2026-01-15T00:00:00.000Z",
    "priority": "high",
    "completed": false,
    "userId": "firebase-user-uid",
    "createdAt": "2026-01-13T10:00:00.000Z",
    "updatedAt": "2026-01-13T10:00:00.000Z"
  }
}
```

**Status Codes:**
- `200 OK` - Success
- `401 Unauthorized` - Missing or invalid token
- `403 Forbidden` - Task belongs to another user
- `404 Not Found` - Task not found
- `500 Internal Server Error` - Server error

---

### POST /api/tasks

Create a new task.

**Request Body:**
```json
{
  "title": "Complete assignment",
  "description": "Finish math homework",
  "dueDate": "2026-01-15",
  "priority": "high"
}
```

**Validation Rules:**
- `title` (required) - String, 1-100 characters
- `description` (optional) - String, max 500 characters
- `dueDate` (optional) - ISO 8601 date string
- `priority` (optional) - Enum: `low`, `medium`, `high` (default: `medium`)
- `completed` (optional) - Boolean (default: `false`)

**Response:**
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Complete assignment",
    "description": "Finish math homework",
    "dueDate": "2026-01-15T00:00:00.000Z",
    "priority": "high",
    "completed": false,
    "userId": "firebase-user-uid",
    "createdAt": "2026-01-13T10:00:00.000Z",
    "updatedAt": "2026-01-13T10:00:00.000Z"
  }
}
```

**Status Codes:**
- `201 Created` - Task created successfully
- `400 Bad Request` - Validation error
- `401 Unauthorized` - Missing or invalid token
- `500 Internal Server Error` - Server error

---

### PUT /api/tasks/:id

Update an existing task.

**Parameters:**
- `id` - Task ID (MongoDB ObjectId)

**Request Body:**
```json
{
  "title": "Updated assignment",
  "completed": true,
  "priority": "medium"
}
```

**Note:** Only include fields you want to update. `userId` cannot be changed.

**Response:**
```json
{
  "success": true,
  "message": "Task updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Updated assignment",
    "description": "Finish math homework",
    "dueDate": "2026-01-15T00:00:00.000Z",
    "priority": "medium",
    "completed": true,
    "userId": "firebase-user-uid",
    "createdAt": "2026-01-13T10:00:00.000Z",
    "updatedAt": "2026-01-13T11:00:00.000Z"
  }
}
```

**Status Codes:**
- `200 OK` - Task updated successfully
- `400 Bad Request` - Validation error or attempt to change userId
- `401 Unauthorized` - Missing or invalid token
- `403 Forbidden` - Task belongs to another user
- `404 Not Found` - Task not found
- `500 Internal Server Error` - Server error

---

### DELETE /api/tasks/:id

Delete a task.

**Parameters:**
- `id` - Task ID (MongoDB ObjectId)

**Response:**
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

**Status Codes:**
- `200 OK` - Task deleted successfully
- `401 Unauthorized` - Missing or invalid token
- `403 Forbidden` - Task belongs to another user
- `404 Not Found` - Task not found
- `500 Internal Server Error` - Server error

---

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "error": "Error message",
  "status": 400,
  "path": "/api/tasks",
  "method": "POST",
  "timestamp": "2026-01-13T10:30:00.000Z"
}
```

### Common Error Messages

**Authentication Errors:**
- `Authorization token missing` (401)
- `Invalid or expired token` (401)

**Validation Errors:**
- `Title is required` (400)
- `Title must be between 1 and 100 characters` (400)
- `Priority must be one of: low, medium, high` (400)
- `Due date must be a valid date` (400)

**Authorization Errors:**
- `You do not have permission to access this task` (403)

**Not Found Errors:**
- `Task not found` (404)
- `Route /api/unknown not found` (404)

---

## Rate Limiting

Currently no rate limiting is implemented. Consider adding rate limiting for production deployments.

## CORS

CORS is enabled for the domain specified in `CLIENT_URL` environment variable.

---

**Last Updated:** January 13, 2026

