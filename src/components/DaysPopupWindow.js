import React from "react";
import days from "../const/Days";
import { AiOutlineClose } from "react-icons/ai";
function DaysPopupWindow({ trigger, setTrigger }) {
  return (
    <>
      {trigger ? (
        <div className="popup">
          <div className="popup-container">
            <header>
              <h1>Select day:</h1>
            </header>
            <div
              className="close-popup-container"
              onClick={() => setTrigger(false)}
            >
              <AiOutlineClose />
            </div>
            <div className="days-container">
              {days.map((day, index) => {
                return (
                  <div className="day-container" key={index}>
                    <p>{day}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default DaysPopupWindow;
