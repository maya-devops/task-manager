import { useState, useEffect } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/tasks";

function TaskForm({ onTaskAdded, onTaskUpdated, editingTask, onCancelEdit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setError("");
    } else {
      setTitle("");
      setDescription("");
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title.trim() || !description.trim()) {
      setError("Title and description are required.");
      return;
    }

    try {
      setSaving(true);
      if (editingTask) {
        const response = await axios.put(`${API_URL}/${editingTask._id}`, {
          title,
          description,
        });
        onTaskUpdated(response.data);
      } else {
        const response = await axios.post(API_URL, { title, description });
        onTaskAdded(response.data);
        setTitle("");
        setDescription("");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Could not save task.");
    } finally {
      setSaving(false);
    }
  };

    return (
    <form className="box" onSubmit={handleSubmit}>
      <h2>{editingTask ? "Edit Task" : "Add Task"}</h2>
      <input
        className="field"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="field"
        rows="3"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      {error && <p className="error-text">{error}</p>}
      <button type="submit" disabled={saving}>
        {saving ? "Saving..." : editingTask ? "Update Task" : "Add Task"}
      </button>
      {editingTask && (
        <button type="button" className="btn-secondary" onClick={onCancelEdit}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default TaskForm;