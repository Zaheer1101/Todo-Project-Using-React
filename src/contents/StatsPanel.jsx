import React from "react";

const StatsPanel = ({ todos, clearCompleted, markAllComplete }) => {
  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  const active = total - completed;

  return (
    <div className="stats-panel">
      <p>Total: {total}</p>
      <p>Active: {active}</p>
      <p>Completed: {completed}</p>

      <button onClick={markAllComplete}>Mark All Complete</button>
      <button onClick={clearCompleted}>Clear Completed</button>
    </div>
  );
};

export default StatsPanel;