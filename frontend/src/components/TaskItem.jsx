function TaskItem({ task, onDelete, onStatusChange, onEdit }) {
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      onDelete(task._id);
    }
  };

  const badgeClass = `badge badge-${task.status.toLowerCase().replace(" ", "-")}`;

  return (
    <div className="box">
      <div className="task-header">
        <h3>{task.title}</h3>
        <span className={badgeClass}>{task.status}</span>
      </div>
      <p>{task.description}</p>
      <p className="task-meta">
        Created: {new Date(task.createdAt).toLocaleDateString()}
      </p>
      <p>
        Status:{" "}
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task._id, e.target.value)}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </p>
      <button onClick={() => onEdit(task)}>Edit</button>
      <button className="btn-danger" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}

export default TaskItem;