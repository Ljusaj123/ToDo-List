import React, { useState, useEffect } from "react";
import "./styles/css/styles.css";

import Header from "./components/Header";
import FilterSort from "./components/FilterSort";
import TaskContainers from "./components/TaskContainers";
import PopupWindow from "./components/popups/PopupWindow";
import Footer from "./components/Footer";

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

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskListInit));
    setTaskList(taskListInit);
  }, [taskListInit]);

  return (
    <div className="todo">
      <Header setTrigger={setTrigger} />

      <FilterSort
        selectValue={selectValue}
        setSelectValue={setSelectValue}
        taskListInit={taskListInit}
        setTaskList={setTaskList}
      />

      <TaskContainers
        taskList={taskList}
        setSingleTask={setSingleTask}
        singleTask={singleTask}
        taskListInit={taskListInit}
        setTaskListInit={setTaskListInit}
      />

      <PopupWindow
        trigger={trigger}
        setTrigger={setTrigger}
        taskList={taskListInit}
        setTaskList={setTaskListInit}
      />

      <Footer />
    </div>
  );
}

export default App;
