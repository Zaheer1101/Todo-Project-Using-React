import React, { useState, useEffect } from "react";
import Header from "./contents/Header.jsx";
import Footer from "./contents/Footer.jsx";
import TodoForm from "./contents/TodoForm.jsx";
import TodoList from "./contents/TodoList.jsx";
import SearchBar from "./contents/SearchBar.jsx";
import StatsPanel from "./contents/StatsPanel.jsx";
import DarkModeToggle from "./contents/DarkModeToggle.jsx";
import ProgressBar from "./contents/ProgressBar.jsx";

const App = () => {
  // Todo States
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Save Todos in localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Add Todo
  const addTodo = (text) => {
    const newTodo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
    };
    setTodos((prevTodos) => [newTodo, ...prevTodos]);
  };

  // Toggle Todo
  const toggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  // Delete Todo
  const deleteTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.filter((todo) => todo.id !== id)
    );
  };

  // Edit Todo
  const editTodo = (id, newText) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  // Clear Completed
  const clearCompleted = () => {
    setTodos((prevTodos) =>
      prevTodos.filter((todo) => !todo.completed)
    );
  };

  // Mark All Complete
  const markAllComplete = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => ({
        ...todo,
        completed: true,
      }))
    );
  };

  // Filter + Search Todos
  const filteredTodos = todos
    .filter((todo) => {
      if (filter === "active") return !todo.completed;
      if (filter === "completed") return todo.completed;
      return true;
    })
    .filter((todo) =>
      todo.text.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Header />

      <DarkModeToggle
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <ProgressBar todos={todos} />

      <TodoForm addTodo={addTodo} />

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <StatsPanel
        todos={todos}
        clearCompleted={clearCompleted}
        markAllComplete={markAllComplete}
      />

      {/* Filters */}
      <div className="filters">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>

      {/* Todo List */}
      <TodoList
        todos={filteredTodos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
      />

      <Footer />
    </div>
  );
};

export default App;