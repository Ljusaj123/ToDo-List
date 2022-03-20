import React, { useState } from "react";
import "./styles/css/styles.css";
import { BsGithub, BsInstagram, BsHeartFill } from "react-icons/bs";
import PopupWindow from "./components/PopupWindow";

function App() {
  const [trigger, setTrigger] = useState(false);
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
        <div className="task-name-container"></div>
        <div className="task-info-container"></div>
      </main>
      <PopupWindow trigger={trigger} setTrigger={setTrigger} />
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
