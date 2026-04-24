import React from "react";

const ProgressBar = ({ todos }) => {
  const totalTasks = todos.length;
  const completedTasks = todos.filter((todo) => todo.completed).length;

  const progress =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="progress-bar-container">
      <p>
        Progress: {completedTasks}/{totalTasks} Completed ({progress}%)
      </p>

      <progress value={progress} max="100"></progress>
    </div>
  );
};

export default ProgressBar;