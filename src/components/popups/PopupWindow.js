import React, { useEffect, useState, useContext } from "react";
import ReactDOM from "react-dom";
import { AiOutlineClose } from "react-icons/ai";
import DaysPopupWindow from "./DaysPopupWindow";
import ListPopupWindow from "./ListPopupWindow";
import TaskContext from "../../contexts/TaskContext";

function PopupWindow({ open, setOpen }) {
  const { taskListInit, setTaskListInit } = useContext(TaskContext);

  const initialTask = {
    id: "",
    name: "",
    notes: "",
    day: "",
    list: "",
    completed: false,
  };

  const [listTrigger, setListTrigger] = useState(false);
  const [dayTrigger, setDayTrigger] = useState(false);
  const [task, setTask] = useState(initialTask);
  const [error, setError] = useState({
    isError: false,
    message: "You need to enter at least task name and task day!",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = () => {
    if (task.name && task.day) {
      setTaskListInit([...taskListInit, task]);
      setTask(initialTask);
      setOpen(false);
    } else {
      setError({ ...error, isError: true });
    }
  };

  useEffect(() => {
    const random = Math.floor(Math.random() * 10000);
    setTask((task) => ({ ...task, id: random.toString() }));
  }, [dayTrigger]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setError({ ...error, isError: false });
  //   }, 2000);
  // }, [error, error.isError]);
  // fali useEffect cleanup

  if (!open) return null;

  return ReactDOM.createPortal(
      <div className="popup">
        <div className="popup-container">
          <header>
            <h2>New Task</h2>
          </header>
          <div className="close-popup-container" onClick={() => setOpen(false)}>
            <AiOutlineClose />
          </div>
          <div className="container task-name">
            <input
              type="text"
              placeholder="Enter new task..."
              name="name"
              onChange={handleChange}
            />
          </div>
          <div className="container task-description">
            <textarea
              placeholder="Enter notes..."
              name="notes"
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="container day-list">
            <div className="button-container day">
              <button
                className="select-btn"
                onClick={() => setDayTrigger(true)}
              >
                Select day
              </button>
              {task.day ? <p>Day selected: {task.day}</p> : ""}
              <DaysPopupWindow
                trigger={dayTrigger}
                setTrigger={setDayTrigger}
                task={task}
                setTask={setTask}
              />
            </div>
            <div className="button-container day">
              <button
                className="select-btn"
                onClick={() => setListTrigger(true)}
              >
                Select list
              </button>
              {task.list ? <p>List selected: {task.list}</p> : ""}
              <ListPopupWindow
                trigger={listTrigger}
                setTrigger={setListTrigger}
                task={task}
                setTask={setTask}
              />
            </div>
          </div>

          <div className="container new-task">
            <button
              type="submit"
              className={task.name && task.day ? "create-btn" : "no-task-btn"}
              onClick={handleSubmit}
            >
              Create task
            </button>
            {error.isError ? <p>{error.message}</p> : ""}
          </div>
        </div>
      </div>,
    document.getElementById("portal-root")
  );
}

export default PopupWindow;
