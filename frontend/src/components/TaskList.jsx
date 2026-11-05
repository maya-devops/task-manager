import TaskItem from "./TaskItem";

function TaskList({ tasks, onDelete, onStatusChange , onEdit}) {
  if (tasks.length === 0) {
      return <p className="info-text">No tasks found.</p>;
  }

  return (
    <div>
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
           onEdit={onEdit}
        />
      ))}
    </div>
  );
}

export default TaskList;