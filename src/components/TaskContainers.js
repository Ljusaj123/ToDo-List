import React, { useContext } from "react";
import TaskContext from "../contexts/TaskContext";

function TaskContainers({ setSingleTask, singleTask }) {
  const { taskList, taskListInit, setTaskListInit } = useContext(TaskContext);

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

  return (
    <main className="tasks-containers">
      <div className="task-container" id="task-name">
        <header>
          <h2>Task Name</h2>
        </header>
        {taskList.length !== 0 ? (
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
          <p className="info-message">There are no tasks!</p>
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
  );
}

export default TaskContainers;
