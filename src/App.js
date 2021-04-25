import { useState } from "react";
import Header from "./Components/Header.js";
import Tasks from "./Components/Tasks";
import AddTask from "./Components/AddTask";

function App() {
  const [showAddTask, setShowAddTask] = useState([false]);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "Current bill",
      day: "17/04/2021",
      reminder: true,
    },
    {
      id: 2,
      text: "Go to the Doctor",
      day: "17/04/2021",
      reminder: true,
    },
    {
      id: 3,
      text: "Current bill",
      day: "17/04/2021",
      reminder: false,
    },
  ]);

  // Adding Tasks
  const addTask = (task) => {
    const id = Math.floor(Math.random * 10000) + 1;
    const newTask = { id, ...task };
    setTasks([...tasks, newTask]);
  };

  // deleting tasks
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    console.log("deleted", id);
  };

  //tOGGLE rEMAINDER
  const ToggleRemainder = (id) => {
    setTasks(
      tasks.map(
        (task) =>
          task.id === id ? { ...task, reminder: !task.reminder } : task,
        console.log("Toggle remainder is performed")
      )
    );
  };

  return (
    <div className="container">
      <Header
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={ToggleRemainder} />
      ) : (
        "No Tasks to display"
      )}
    </div>
  );
}

export default App;
