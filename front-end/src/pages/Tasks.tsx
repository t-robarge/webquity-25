import React, { useState } from "react";
import "./Tasks.css";

const Tasks: React.FC = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<string[]>([]);

  const addTask = () => {
    if (!task.trim()) return;
    setTasks([...tasks, task]);
    setTask("");
  };

  const deleteTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="tasks-page">

      <div className="container">
        <div className="title">Tasks</div>

        <div className="task-input">
          <input
            type="text"
            value={task}
            placeholder="Enter a task..."
            onChange={(e) => setTask(e.target.value)}
          />
          <button onClick={addTask}>Add</button>
        </div>

        <div className="task-list">
          {tasks.map((t, index) => (
            <div key={index} className="task">
              <span>{t}</span>
              <button
                className="delete-btn"
                onClick={() => deleteTask(index)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Tasks;
