function FilterBar({ setFilter, left, clearCompleted, completedCount }) {
  return (
    <>
      <div className="filters">
        <button onClick={() => setFilter("all")}>📋 All</button>
        <button onClick={() => setFilter("active")}>🔥 Active</button>
        <button onClick={() => setFilter("completed")}>✅ Completed</button>
      </div>

      <p>{left} tasks left</p>

      {completedCount > 0 && (
        <button onClick={clearCompleted}>🧹 Clear completed</button>
      )}
    </>
  );
}

export default FilterBar;