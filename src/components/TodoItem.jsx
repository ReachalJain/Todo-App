function TodoItem({
  todo,
  isEditing,
  editText,
  setEditText,
  toggleTodo,
  deleteTodo,
  startEdit,
  saveEdit,
  cancelEdit,
}) {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />

      {isEditing ? (
        <input
          type="text"
          value={editText}
          autoFocus
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") saveEdit(todo.id);
            if (e.key === "Escape") cancelEdit();
          }}
        />
      ) : (
        <span
          className={todo.completed ? "done" : ""}
          onDoubleClick={() => startEdit(todo)}
          title="Double-click to edit"
        >
          {todo.text}
        </span>
      )}

      {todo.dueDate && <small>📅 {todo.dueDate}</small>}

      <button onClick={() => deleteTodo(todo.id)} title="Delete">
        🗑️
      </button>
    </li>
  );
}

export default TodoItem;