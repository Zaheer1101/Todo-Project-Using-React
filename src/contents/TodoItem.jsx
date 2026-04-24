import React, { useState } from "react";

const TodoItem = ({ todo, toggleTodo, deleteTodo, editTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);
  const [removing, setRemoving] = useState(false);

  const handleEdit = () => {
    if (isEditing) {
      const trimmedText = newText.trim();
      if (!trimmedText) return;
      editTodo(todo.id, trimmedText);
    }
    setIsEditing(!isEditing);
  };

  const handleDelete = () => {
    setRemoving(true);
    setTimeout(() => {
      deleteTodo(todo.id);
    }, 300);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleEdit();
    }
  };

  return (
    <li
      className={`todo-item ${todo.completed ? "completed" : ""} ${
        removing ? "remove" : ""
      }`}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />

      {isEditing ? (
        <input
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <span className="task-text">{todo.text}</span>
      )}

      <button className="btn edit-btn" onClick={handleEdit}>
        {isEditing ? "Save" : "Edit"}
      </button>

      {todo.completed && (
        <button className="btn delete-btn" onClick={handleDelete}>
          Delete
        </button>
      )}
    </li>
  );
};

export default TodoItem;