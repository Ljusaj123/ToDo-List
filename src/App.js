import React, { useState, useEffect } from "react";
import "./styles/css/styles.css";

import Header from "./components/Header";
import FilterSort from "./components/FilterSort";
import TaskContainers from "./components/TaskContainers";
import PopupWindow from "./components/popups/PopupWindow";
import Footer from "./components/Footer";
import TaskContext from "./contexts/TaskContext";

function App() {
  const localStorageData = localStorage.getItem("tasks")
    ? JSON.parse(localStorage.getItem("tasks"))
    : [];

  const [taskListInit, setTaskListInit] = useState(localStorageData);
  const [open, setOpen] = useState(false);
  const [taskList, setTaskList] = useState(taskListInit);
  const [singleTask, setSingleTask] = useState("");
  console.log(open);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskListInit));
    setTaskList(taskListInit);
  }, [taskListInit]);

  return (
    <div className="todo">
      <TaskContext.Provider
        value={{
          taskListInit,
          setTaskListInit,
          setTaskList,
        }}
      >
        <Header setOpen={setOpen} />
        <FilterSort />
        <TaskContainers
          setSingleTask={setSingleTask}
          singleTask={singleTask}
          taskList={taskList}
        />
        <PopupWindow open={open} setOpen={setOpen} />
      </TaskContext.Provider>
      <Footer />
    </div>
  );
}

export default App;
