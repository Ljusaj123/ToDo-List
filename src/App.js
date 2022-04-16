import React, { useState, useEffect } from "react";
import "./styles/css/styles.css";

import Header from "./components/Header";
import FilterSort from "./components/FilterSort";
import TaskContainers from "./components/TaskContainers";
import PopupWindow from "./components/popups/PopupWindow";
import Footer from "./components/Footer";
import TaskContext from "./contexts/TaskContext";

function App() {
  const [trigger, setTrigger] = useState(false);
  const [taskListInit, setTaskListInit] = useState(
    localStorage.getItem("tasks")
      ? JSON.parse(localStorage.getItem("tasks"))
      : []
  );
  const [taskList, setTaskList] = useState(taskListInit);
  const [singleTask, setSingleTask] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskListInit));
    setTaskList(taskListInit);
  }, [taskListInit]);

  return (
    <TaskContext.Provider
      value={{
        taskListInit,
        taskList,
        setTaskListInit,
        setTaskList,
        trigger,
        setTrigger,
      }}
    >
      <div className="todo">
        <Header />
        <FilterSort />
        <TaskContainers setSingleTask={setSingleTask} singleTask={singleTask} />
        <PopupWindow />
        <Footer />
      </div>
    </TaskContext.Provider>
  );
}

export default App;
