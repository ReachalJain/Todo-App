function TodoForm({ text, setText, dueDate, setDueDate, addTodo }) {
  return (
    <form onSubmit={addTodo}>
      <input
        type="text"
        placeholder="Write a new task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button type="submit">➕ Add</button>
    </form>
  );
}

export default TodoForm;