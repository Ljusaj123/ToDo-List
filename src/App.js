import React, { useState, useEffect } from "react";
import "./styles/css/styles.css";
import { BsGithub, BsInstagram, BsHeartFill } from "react-icons/bs";
import { BiDownArrow, BiUpArrow } from "react-icons/bi";
import PopupWindow from "./components/PopupWindow";
import days from "./const/Days";
import sortingList from "./const/SortingList";
import NameAZ from "./utilities/NameAZ";
import NameZA from "./utilities/NameZA";
import DayZA from "./utilities/DayZA";
import DayAZ from "./utilities/DayAZ";

function App() {
  const [trigger, setTrigger] = useState(false);
  const [taskListInit, setTaskListInit] = useState(
    localStorage.getItem("tasks")
      ? JSON.parse(localStorage.getItem("tasks"))
      : []
  );
  const [taskList, setTaskList] = useState(taskListInit);

  const [singleTask, setSingleTask] = useState("");
  const [selectValue, setSelectValue] = useState({
    days: "Select Day",
    sort: "Sort by:",
  });
  const [showArrowDaysOptions, setShowArrowDaysOptions] = useState(false);
  const [showArrowSortOptions, setShowArrowSortOptions] = useState(false);

  const handleDelete = () => {
    const newList = taskListInit.filter((task) => {
      return task !== singleTask;
    });
    setTaskListInit(newList);
    setSingleTask("");
  };

  const toggleComplete = (id) => {
    const newTodos = [...taskListInit].map((task) => {
      if (task.id === id) {
        task.completed = !task.completed;
      }
      return task;
    });

    setTaskListInit(newTodos);
  };

  const handleOption = (e) => {
    const name = e.target.children[0].name;
    const value = e.target.children[1].innerHTML;
    setSelectValue({
      ...selectValue,
      [name]: value,
    });
    const container = e.target.parentElement;
    container.classList.remove("active");

    switch (name) {
      case "days":
        setShowArrowDaysOptions(false);
        break;
      case "sort":
        setShowArrowSortOptions(false);
        break;
      default:
        break;
    }
  };

  const handleSelect = (e) => {
    const container = e.target.nextSibling;
    container.classList.toggle("active");
    switch (container.id) {
      case "days":
        setShowArrowDaysOptions((prev) => !prev);
        break;
      case "sort":
        setShowArrowSortOptions((prev) => !prev);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    switch (selectValue.days) {
      case "Today":
        setTaskList(taskListInit.filter((task) => task.day === "Today"));
        break;
      case "Tommorow":
        setTaskList(taskListInit.filter((task) => task.day === "Tommorow"));
        break;
      case "Next Week":
        setTaskList(taskListInit.filter((task) => task.day === "Next Week"));
        break;
      case "Never":
        setTaskList(taskListInit.filter((task) => task.day === "Never"));
        break;
      default:
        break;
    }
  }, [selectValue.days, taskListInit]);

  useEffect(() => {
    switch (selectValue.sort) {
      case "Name (A-Z)":
        //So, this line of code is wrong, as it modifies state (sorts the array, which is in the state) in place.
        //And React “thinks” that setTaskList is being called with the same array that it already had, therefore no re-render.
        // ### setTaskList(taskListInit.sort(NameAZ))
        setTaskList([...taskListInit].sort(NameAZ));
        break;
      case "Name (Z-A)":
        setTaskList([...taskListInit].sort(NameZA));
        break;
      case "Day (A-Z)":
        setTaskList([...taskListInit].sort(DayAZ));
        break;
      case "Day (Z-A)":
        setTaskList([...taskListInit].sort(DayZA));
        break;
      default:
        break;
    }
  }, [selectValue.sort, taskListInit]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskListInit));
    setTaskList(taskListInit);
  }, [taskListInit]);

  return (
    <div className="todo">
      <header className="title-container">
        <h1>Simple ToDo App</h1>
        <div className="create-button-container">
          <button className="create-btn" onClick={() => setTrigger(true)}>
            Create New Task
          </button>
        </div>
      </header>

      <div className="filter-sort-container">
        <div className="container filter-by-day">
          <div className="selected" onClick={handleSelect}>
            <p>{selectValue.days}</p>
            <p>{showArrowDaysOptions ? <BiUpArrow /> : <BiDownArrow />}</p>
          </div>
          <div className="options-container" id="days">
            {days.map((day, index) => {
              return (
                <div className="option" onClick={handleOption} key={index}>
                  <input type="radio" className="radio" id={day} name="days" />
                  <label>{day}</label>
                </div>
              );
            })}
          </div>
        </div>
        <div className="container sort">
          <div className="selected" onClick={handleSelect}>
            <p>{selectValue.sort}</p>
            <p>{showArrowSortOptions ? <BiUpArrow /> : <BiDownArrow />}</p>
          </div>
          <div className="options-container" id="sort">
            {sortingList.map((sort, index) => {
              return (
                <div className="option" onClick={handleOption} key={index}>
                  <input type="radio" className="radio" id={sort} name="sort" />
                  <label>{sort}</label>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <main className="tasks-containers">
        <div className="task-container" id="task-name">
          <header>
            <h2>Task Name</h2>
          </header>
          {taskListInit.length !== 0 ? (
            taskList.map((task, index) => {
              return (
                <div
                  className={task.completed ? "task crossed" : "task"}
                  key={index}
                  onClick={() => setSingleTask(task)}
                >
                  <input
                    type="checkbox"
                    onChange={() => toggleComplete(task.id)}
                    checked={task.completed}
                  />
                  <p>{task.name}</p>
                  <p className="day">{task.day}</p>
                </div>
              );
            })
          ) : (
            <p className="info-message">There are no tasks, make one!</p>
          )}
        </div>
        <div className="task-container" id="task-info">
          <header>
            <h2>Task Info</h2>
          </header>

          {singleTask ? (
            <div className="task-info">
              <h3>Task name:</h3>
              <p>{singleTask.name}</p>
              <h3>Notes:</h3>
              <p>{singleTask.notes ? singleTask.notes : "No notes"}</p>
              <h3>Day:</h3>
              <p>{singleTask.day}</p>
              <h3>List:</h3>
              <p>{singleTask.list ? singleTask.list : "No list"}</p>
            </div>
          ) : (
            <p className="info-message">Click on task for more info</p>
          )}
          {singleTask ? (
            <div className="button-container">
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
        taskList={taskListInit}
        setTaskList={setTaskListInit}
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
