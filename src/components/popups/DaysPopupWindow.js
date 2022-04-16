import React from "react";
import days from "../../const/Days";
import { AiOutlineClose } from "react-icons/ai";
function DaysPopupWindow({ trigger, setTrigger, setTask, task }) {
  const handleSubmit = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
    setTrigger(false);
  };
  return (
    <>
      {trigger ? (
        <div className="popup">
          <div className="popup-container">
            <header>
              <h2>Select day:</h2>
            </header>
            <div
              className="close-popup-container"
              onClick={() => setTrigger(false)}
            >
              <AiOutlineClose />
            </div>
            <div className="lists-container">
              {days.map((day, index) => {
                return (
                  <button
                    className="popup-btn"
                    key={index}
                    onClick={handleSubmit}
                    value={day}
                    name="day"
                  >
                    {day}
                  </button>
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
