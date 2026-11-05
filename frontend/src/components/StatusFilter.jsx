const FILTERS = ["All", "Pending", "In Progress", "Completed"];

function StatusFilter({ activeStatus, onStatusChange }) {
  return (
    <div className="filters">
      {FILTERS.map((status) => (
        <button
          key={status}
          className={activeStatus === status ? "active" : ""}
          onClick={() => onStatusChange(status)}
        >
          {status === "All" ? "All Tasks" : status}
        </button>
      ))}
    </div>
  );
}

export default StatusFilter;