import { useState, useEffect } from "react";
import axios from "axios";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import SearchBar from "./components/SearchBar";
import StatusFilter from "./components/StatusFilter";

// const API_URL = "http://localhost:5000/api/tasks";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [search, setSearch] = useState("");
const [statusFilter, setStatusFilter] = useState("All");

    useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        setError("");
        const response = await axios.get(API_URL, {
          params: { search, status: statusFilter },
        });
        setTasks(response.data);
      } catch (err) {
        setError("Could not load tasks. Please try again.");
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [search, statusFilter]);

  const handleTaskAdded = (newTask) => {
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === updatedTask._id ? updatedTask : task
      )
    );
    setEditingTask(null);
  };

  const handleTaskDeleted = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Could not delete task.");
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, { status });
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === id ? response.data : task))
      );
    } catch (err) {
      alert(err.response?.data?.message || "Could not update status.");
    }
  };

     return (
    <div className="container">
      <h1>Task Manager</h1>
      <TaskForm
        onTaskAdded={handleTaskAdded}
        onTaskUpdated={handleTaskUpdated}
        editingTask={editingTask}
        onCancelEdit={() => setEditingTask(null)}
      />
      <SearchBar search={search} onSearchChange={setSearch} />
      <StatusFilter activeStatus={statusFilter} onStatusChange={setStatusFilter} />
      {loading && <p className="info-text">Loading tasks...</p>}
      {error && <p className="error-text">{error}</p>}
      {!loading && !error && (
        <TaskList
          tasks={tasks}
          onDelete={handleTaskDeleted}
          onStatusChange={handleStatusChange}
          onEdit={setEditingTask}
        />
      )}
    </div>
  );
}

export default App;