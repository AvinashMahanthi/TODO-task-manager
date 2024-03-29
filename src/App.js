import { useState, useEffect } from "react";
import Header from "./Components/Header.js";
import Tasks from "./Components/Tasks";
import AddTask from "./Components/AddTask";

function App() {
  const [showAddTask, setShowAddTask] = useState([false]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTask();
      setTasks(tasksFromServer);
    };
    getTasks();
  });

  // Fetch Tasks
  const fetchTask = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();
    return data;
  };

  // Adding Tasks
  const addTask = async (task) => {
    const res = await fetch(`http://localhost:5000/tasks`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const data = await res.json();
    setTasks([...tasks, data]);
  };

  // deleting tasks
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });

    setTasks(tasks.filter((task) => task.id !== id));
    console.log("deleted", id);
  };

  //tOGGLE rEMAINDER
  const ToggleRemainder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updTask),
    });

    const data = await res.json();

    setTasks(
      tasks.map(
        (task) =>
          task.id === id ? { ...task, reminder: !data.reminder } : task,
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
