import TodoItem from "./TodoItem";

function TodoList({
  todos,
  editingId,
  editText,
  setEditText,
  toggleTodo,
  deleteTodo,
  startEdit,
  saveEdit,
  cancelEdit,
}) {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          isEditing={editingId === todo.id}
          editText={editText}
          setEditText={setEditText}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          startEdit={startEdit}
          saveEdit={saveEdit}
          cancelEdit={cancelEdit}
        />
      ))}
    </ul>
  );
}

export default TodoList;