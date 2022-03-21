import React from "react";
import { AiOutlineClose } from "react-icons/ai";

function PopupWindow({ trigger, setTrigger }) {
  return (
    <>
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
              <input type="text" placeholder="Enter new task..." />
            </div>
            <div className="container task-description">
              <textarea placeholder="Enter notes..."></textarea>
            </div>
            <div className="day-list container">
              <button className="select-btn">Select day</button>
              <button className="select-btn">Select list</button>
            </div>

            <div className="new-task container">
              <button className="create-btn">Create task</button>
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
