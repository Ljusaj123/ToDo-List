import React from "react";
import lists from "../const/List";
import { AiOutlineClose } from "react-icons/ai";
function ListPopupWindow({ trigger, setTrigger }) {
  return (
    <>
      {trigger ? (
        <div className="popup">
          <div className="popup-container">
            <header>
              <h1>Select List:</h1>
            </header>
            <div
              className="close-popup-container"
              onClick={() => setTrigger(false)}
            >
              <AiOutlineClose />
            </div>
            <div className="days-container">
              {lists.map((day, index) => {
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

export default ListPopupWindow;