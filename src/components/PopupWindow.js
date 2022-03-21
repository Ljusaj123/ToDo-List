import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import DaysPopupWindow from "./DaysPopupWindow";
import ListPopupWindow from "./ListPopupWindow";

function PopupWindow({ trigger, setTrigger, taskList, setTaskList }) {
  const initialTask = { name: "", notes: "", day: "", list: "" };

  const [listTrigger, setListTrigger] = useState(false);
  const [dayTrigger, setDayTrigger] = useState(false);
  const [task, setTask] = useState(initialTask);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = () => {
    setTaskList([...taskList, task]);
    setTask(initialTask);
    setTrigger(false);
  };

  return (
    <>
      {console.log(trigger)}
      {trigger ? (
        <div className="popup">
          <div className="popup-container">
            <header className="popup-title-container">
              <h1>New Task</h1>
            </header>
            <div
              className="close-popup-container"
              onClick={() => setTrigger(false)}
            >
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
            <div className="day-list container">
              <div className="day-container">
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
              <div className="list-container">
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

            <div className="new-task container">
              <button
                type="submit"
                className={task.name && task.day ? "create-btn" : "no-task-btn"}
                onClick={handleSubmit}
              >
                Create task
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default PopupWindow;
