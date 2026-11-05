# Task Manager (MERN)

A simple Task Manager built with MongoDB, Express.js, React.js and Node.js.
Users can create, view, update, delete, search and filter tasks.

## Features

- Add a task (title and description)
- View all tasks with title, description, status and created date
- Edit a task
- Delete a task (with confirmation)
- Change task status: Pending, In Progress, Completed
- Search by title or description
- Filter by status
- Validation, error messages, loading and empty states
- Responsive layout

## Tech Stack

- Frontend: React (Vite), Axios, plain CSS
- Backend: Node.js, Express.js
- Database: MongoDB with Mongoose

## Project Structure

```
task-manager/
├── backend/
│   ├── config/db.js            MongoDB connection
│   ├── controllers/            request logic
│   ├── models/Task.js          Task schema
│   ├── routes/taskRoutes.js    API routes
│   └── index.js                server entry point
└── frontend/
    └── src/
        ├── components/         TaskForm, TaskList, TaskItem, SearchBar, StatusFilter
        ├── App.jsx             state and API calls
        └── index.css           styles
```

## Setup and Run

### Prerequisites

- Node.js and npm
- MongoDB running locally (`mongodb://127.0.0.1:27017`)

### 1. Backend

```
cd backend
npm install
```

Create a `.env` file in `backend`:

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/taskManager
```

Start the server:

```
npm run dev
```

The API runs at http://localhost:5000

### 2. Frontend

Open a second terminal:

```
cd frontend
npm install
npm run dev
```

The app runs at http://localhost:5173

## API Documentation

Base URL: `http://localhost:5000/api/tasks`

### Task object

```json
{
  "_id": "6ae96d63bc64789c3c67c207",
  "title": "Learn React",
  "description": "Understand React fundamentals",
  "status": "Pending",
  "createdAt": "2026-11-03T05:13:07.682Z"
}
```

Allowed status values: `Pending`, `In Progress`, `Completed`.

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/tasks | Get all tasks |
| GET | /api/tasks/:id | Get one task |
| POST | /api/tasks | Create a task |
| PUT | /api/tasks/:id | Update a task |
| DELETE | /api/tasks/:id | Delete a task |

### GET /api/tasks

Optional query parameters:

- `search`: keyword matched against title or description (case-insensitive)
- `status`: `Pending`, `In Progress` or `Completed` (`All` returns everything)

Example: `/api/tasks?search=react&status=Pending`

Response: `200 OK` with an array of tasks.

### GET /api/tasks/:id

Responses: `200 OK` with the task, `400` for an invalid ID, `404` if not found.

### POST /api/tasks

Request body:

```json
{
  "title": "Learn React",
  "description": "Understand React fundamentals"
}
```

Status defaults to `Pending`.
Responses: `201 Created` with the new task, `400` if title or description is missing or empty.

### PUT /api/tasks/:id

Request body (send any of these fields):

```json
{
  "title": "Learn React Advanced",
  "description": "Learn React hooks",
  "status": "In Progress"
}
```

Responses: `200 OK` with the updated task, `400` for an invalid ID or invalid data, `404` if not found.

### DELETE /api/tasks/:id

Responses: `200 OK` with a success message, `400` for an invalid ID, `404` if not found.

### Status codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad request (validation error or invalid ID) |
| 404 | Not found |
| 500 | Internal server error |

## Screenshots

See the `screenshots` folder.