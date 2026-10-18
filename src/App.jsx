import { useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import TodoForm from "./components/TodoForm";
import FilterBar from "./components/FilterBar";
import TodoList from "./components/TodoList";
import CalendarView from "./components/CalendarView";
import StatCard from "./components/StatCard";
import "./App.css";

function App() {
  const [todos, setTodos] = useLocalStorage("todos", []);
  const [text, setText] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const addTodo = (e) => {
    e.preventDefault();

    const trimmedText = text.trim();
    if (trimmedText === "") return;

    const newTodo = {
      id: Date.now(),
      text: trimmedText,
      completed: false,
      dueDate: selectedDate,
    };

    setTodos([...todos, newTodo]);
    setText("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const saveEdit = (id) => {
    const trimmedText = editText.trim();
    if (trimmedText === "") return;

    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: trimmedText } : todo
      )
    );
    cancelEdit();
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const left = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.length - left;

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const today = new Date().toLocaleDateString("en-CA");
  const todayTotal = todos.filter((todo) => todo.dueDate === today).length;
  const todayDone = todos.filter(
    (todo) => todo.dueDate === today && todo.completed
  ).length;

  return (
    <div className="app">
      <h1>✅ My Todo App</h1>

      <div className="bento">
        <div className="card card-wide">
          <h2 className="card-title">✏️ Add task</h2>
          <TodoForm
            text={text}
            setText={setText}
            dueDate={selectedDate}
            setDueDate={setSelectedDate}
            addTodo={addTodo}
          />
        </div>

        <StatCard
          label="🎯 Today's tasks"
          value={todayTotal}
          hint="due today"
          tone="soft"
        />

        <StatCard
          label="🌟 Done today"
          value={todayDone}
          hint={`of ${todayTotal} completed`}
          tone="solid"
        />

        <div className="card card-wide">
          <h2 className="card-title">📋 Tasks</h2>
          <FilterBar
            setFilter={setFilter}
            left={left}
            clearCompleted={clearCompleted}
            completedCount={completedCount}
          />
          <TodoList
            todos={filteredTodos}
            editingId={editingId}
            editText={editText}
            setEditText={setEditText}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            startEdit={startEdit}
            saveEdit={saveEdit}
            cancelEdit={cancelEdit}
          />
        </div>

        <div className="card card-wide">
          <h2 className="card-title">🗓️ Calendar</h2>
          <CalendarView
            todos={todos}
            selected={selectedDate}
            setSelected={setSelectedDate}
          />
        </div>
      </div>
    </div>
  );
}

export default App;