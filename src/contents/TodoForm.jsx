import React, { useState } from "react";

const TodoForm = ({ addTodo }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    addTodo(trimmedInput);
    setInput("");
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <label htmlFor="todo-input" className="sr-only">
        Add Task
      </label>

      <input
        id="todo-input"
        type="text"
        placeholder="Enter task..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button type="submit">Add</button>
    </form>
  );
};

export default TodoForm;