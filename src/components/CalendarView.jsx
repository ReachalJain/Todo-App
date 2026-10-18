import { useState } from "react";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function CalendarView({ todos, selected, setSelected }) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const toDateString = (day) =>
    `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  const todayString = today.toLocaleDateString("en-CA");

  const tasksOn = (dateString) =>
    todos.filter((todo) => todo.dueDate === dateString);

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={prevMonth}>&lt;</button>
        <h2>
          {MONTHS[month]} {year}
        </h2>
        <button onClick={nextMonth}>&gt;</button>
      </div>

      <div className="calendar-grid">
        {WEEKDAYS.map((name) => (
          <div key={name} className="weekday">
            {name}
          </div>
        ))}

        {cells.map((day, index) => {
          if (day === null) return <div key={index} />;

          const dateString = toDateString(day);
          const dayTasks = tasksOn(dateString);
          const allDone =
            dayTasks.length > 0 && dayTasks.every((todo) => todo.completed);

          let className = "day";
          if (dateString === todayString) className += " today";
          if (dateString === selected) className += " selected";

          return (
            <button
              key={index}
              className={className}
              onClick={() => setSelected(dateString)}
            >
              {day}
              {dayTasks.length > 0 &&
                (allDone ? (
                  <span className="star">⭐</span>
                ) : (
                  <span className="dot">•</span>
                ))}
            </button>
          );
        })}
      </div>

      <p>{selected ? `Selected: ${selected}` : "No date selected"}</p>

      {selected && (
        <button onClick={() => setSelected("")}>✖ Clear date</button>
      )}

      {selected && (
        <ul>
          {tasksOn(selected).length === 0 && <li>No task on this day 😴</li>}
          {tasksOn(selected).map((todo) => (
            <li key={todo.id} className={todo.completed ? "done" : ""}>
              {todo.completed ? "⭐" : "📝"} {todo.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CalendarView;