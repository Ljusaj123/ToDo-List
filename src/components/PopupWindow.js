import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import DaysPopupWindow from "./DaysPopupWindow";
import ListPopupWindow from "./ListPopupWindow";

function PopupWindow({ trigger, setTrigger }) {
  const [listTrigger, setListTrigger] = useState(false);
  const [dayTrigger, setDayTrigger] = useState(false);
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
              <button
                className="select-btn"
                onClick={() => setDayTrigger(true)}
              >
                Select day
              </button>
              <DaysPopupWindow
                trigger={dayTrigger}
                setTrigger={setDayTrigger}
              />
              <button
                className="select-btn"
                onClick={() => setListTrigger(true)}
              >
                Select list
              </button>
              <ListPopupWindow
                trigger={listTrigger}
                setTrigger={setListTrigger}
              />
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
