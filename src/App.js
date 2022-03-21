import React, { useState } from "react";
import "./styles/css/styles.css";
import { BsGithub, BsInstagram, BsHeartFill } from "react-icons/bs";
import PopupWindow from "./components/PopupWindow";

function App() {
  const [trigger, setTrigger] = useState(false);
  const [taskList, setTasklist] = useState([]);
  const [singleTask, setSingleTask] = useState("");

  return (
    <div className="todo">
      <header className="title-container">
        <h1>Simple ToDo App</h1>
      </header>
      <div className="create-button-container">
        <button className="create-btn" onClick={() => setTrigger(true)}>
          Create New Task
        </button>
      </div>
      <div className="filter-sort-container">
        <div className="filter-by-list-container"></div>
        <div className="sort-container"></div>
      </div>
      <main className="tasks-containers">
        <div className="task-name-container">
          <header>
            <h1>Task Name</h1>
          </header>
          {taskList.map((task, index) => {
            return (
              <div
                className="task-container"
                key={index}
                onClick={() => setSingleTask(task)}
              >
                <p>{task.name}</p>
                <p>{task.day}</p>
              </div>
            );
          })}
        </div>
        <div className="task-info-container">
          <header>
            <h1>Task Info</h1>
          </header>
          <div className="task-info">
            <h2>Task name:</h2>
            <p>{singleTask.name}</p>
            <h2>Notes:</h2>
            <p>{singleTask.notes}</p>
            <h2>Day:</h2>
            <p>{singleTask.day}</p>
            <h2>List:</h2>
            <p>{singleTask.list}</p>
          </div>
          <div className="buttons-container">
            <button className="create-btn">Check as done</button>
            <button className="delete-btn">Delete</button>
          </div>
        </div>
      </main>
      <PopupWindow
        trigger={trigger}
        setTrigger={setTrigger}
        taskList={taskList}
        setTaskList={setTasklist}
      />
      <footer>
        <div className="footer-container">
          <div className="social-icons-container">
            <BsGithub />
            <BsInstagram />
          </div>
          <p className="footer-text-info">
            This is a personal project website made for practice. Application
            holds all entered tasks and user can filter them, remove or check as
            done.
          </p>
          <p className="footer-thanks-text">
            Thank you for having a look <BsHeartFill />
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
