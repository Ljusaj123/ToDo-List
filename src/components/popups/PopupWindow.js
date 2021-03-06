import React, { useEffect, useState, useContext } from "react";
import ReactDOM from "react-dom";
import { AiOutlineClose } from "react-icons/ai";
import ListPopupWindow from "./ListPopupWindow";
import TaskContext from "../../contexts/TaskContext";
import days from "../../const/Days";
import tags from "../../const/Tags";

function PopupWindow({ open, setOpen }) {
  const { taskListInit, setTaskListInit } = useContext(TaskContext);

  const initialSelect = {
    day: "Select Day",
    tag: "Select Tag",
  };

  const initialTask = {
    id: "",
    name: "",
    notes: "",
    day: "",
    tag: "",
    completed: false,
  };

  const [initSelectValue, setInitSelectValue] = useState(initialSelect);

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

  const handleClose = () => {
    setOpen(false);
    setError({ ...error, isError: false });
  };

  const removeTag = () => {
    setInitSelectValue({
      ...initSelectValue,
      tag: initialSelect.tag,
    });

    setTask({ ...task, tag: "" });
  };
  const removeDay = () => {
    setInitSelectValue({
      ...initSelectValue,
      day: initialSelect.day,
    });

    setTask({ ...task, day: "" });
  };

  const handleSubmit = () => {
    if (task.name && task.day) {
      setTaskListInit([...taskListInit, task]);
      setTask(initialTask);
      setError({ ...error, isError: false });
      setOpen(false);
    } else {
      setError({ ...error, isError: true });
    }
  };

  useEffect(() => {
    const random = Math.floor(Math.random() * 10000);
    setTask((task) => ({ ...task, id: random.toString() }));
  }, [dayTrigger]);

  useEffect(() => {
    const abortCont = new AbortController();
    setTimeout(() => {
      setError(
        (e) => {
          return { ...e, isError: false };
        },
        { signal: abortCont.signal }
      );
    }, 5000);

    return abortCont.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error.isError === true]);

  if (!open) return null;

  return ReactDOM.createPortal(
    <div className="popup">
      <div className="popup-container">
        <header>
          <h2>New Task</h2>
        </header>
        <div className="close-popup-container" onClick={() => handleClose()}>
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
            <button className="select-btn" onClick={() => setDayTrigger(true)}>
              {initSelectValue.day}
            </button>
            {task.day ? <p onClick={() => removeDay()}>remove</p> : ""}
            <ListPopupWindow
              trigger={dayTrigger}
              setTrigger={setDayTrigger}
              task={task}
              setTask={setTask}
              data={days}
              setInitSelectValue={setInitSelectValue}
              initSelectValue={initSelectValue}
            />
          </div>
          <div className="button-container day">
            <button className="select-btn" onClick={() => setListTrigger(true)}>
              {initSelectValue.tag}
            </button>
            {console.log(task)}
            {task.tag ? <p onClick={() => removeTag()}>remove</p> : ""}
            <ListPopupWindow
              trigger={listTrigger}
              setTrigger={setListTrigger}
              task={task}
              setTask={setTask}
              data={tags}
              setInitSelectValue={setInitSelectValue}
              initSelectValue={initSelectValue}
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
