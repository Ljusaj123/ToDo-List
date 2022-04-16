import React, { useContext } from "react";
import TaskContext from "../contexts/TaskContext";

function Header() {
  const { setTrigger } = useContext(TaskContext);

  return (
    <header className="title-container">
      <h1>Simple ToDo App</h1>
      <div className="create-button-container">
        <button className="create-btn" onClick={() => setTrigger(true)}>
          Create New Task
        </button>
      </div>
    </header>
  );
}

export default Header;
