import React, { useState, useEffect } from "react";
import "./styles/css/styles.css";
import { BsGithub, BsInstagram, BsHeartFill } from "react-icons/bs";
import { BiDownArrow, BiUpArrow } from "react-icons/bi";
import PopupWindow from "./components/PopupWindow";
import days from "./const/Days";

function App() {
  const localTodos = localStorage.getItem("tasks");
  const [trigger, setTrigger] = useState(false);
  const [taskList, setTasklist] = useState(
    localTodos ? JSON.parse(localTodos) : []
  );
  const [singleTask, setSingleTask] = useState("");
  const [selectValue, setSelectValue] = useState("Select Day");
  const [showDaysOptions, setShowDaysOptions] = useState(true);

  const handleDelete = () => {
    const newList = taskList.filter((task) => {
      return task !== singleTask;
    });
    setTasklist(newList);
    setSingleTask("");
  };

  const handleDone = (e) => {
    const div = e.target.parentElement;
    div.classList.toggle("crossed");
  };

  const handleOption = (e) => {
    const name = e.target.children[1].innerHTML;
    console.log(name);
    setSelectValue(name);
    const container = e.target.parentElement;
    container.classList.remove("active");
  };
  const handleSelect = (e) => {
    const container = e.target.nextSibling;
    container.classList.toggle("active");
    setShowDaysOptions((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskList));
  }, [taskList]);

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
        <div className="filter-by-day-container">
          <div className="selected" onClick={handleSelect}>
            <p>{selectValue}</p>
            <p>{showDaysOptions ? <BiDownArrow /> : <BiUpArrow />}</p>
          </div>
          <div className="days-options-container">
            {days.map((day, index) => {
              return (
                <div className="day-option" onClick={handleOption} key={index}>
                  <input type="radio" className="radio" id={day} name="days" />
                  <label>{day}</label>
                </div>
              );
            })}
          </div>
        </div>
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
                <input type="checkbox" onClick={handleDone} />
                <p>{task.name}</p>
                <p className="day">{task.day}</p>
              </div>
            );
          })}
        </div>
        <div className="task-info-container">
          <header>
            <h1>Task Info</h1>
          </header>

          {singleTask ? (
            <div className="task-info">
              <h2>Task name:</h2>
              <p>{singleTask.name}</p>
              <h2>Notes:</h2>
              <p>{singleTask.notes ? singleTask.notes : "No notes"}</p>
              <h2>Day:</h2>
              <p>{singleTask.day}</p>
              <h2>List:</h2>
              <p>{singleTask.list ? singleTask.list : "No list"}</p>
            </div>
          ) : (
            ""
          )}
          {singleTask ? (
            <div className="buttons-container">
              <button className="delete-btn" onClick={handleDelete}>
                Delete
              </button>
            </div>
          ) : (
            ""
          )}
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
