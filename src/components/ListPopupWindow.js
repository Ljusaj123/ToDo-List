import React from "react";
import lists from "../const/List";
import { AiOutlineClose } from "react-icons/ai";
function ListPopupWindow({ trigger, setTrigger, setTask, task }) {
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
              <h2>Select List:</h2>
            </header>
            <div
              className="close-popup-container"
              onClick={() => setTrigger(false)}
            >
              <AiOutlineClose />
            </div>
            <div className="lists-container">
              {lists.map((list, index) => {
                return (
                  <button
                    className="popup-btn"
                    key={index}
                    onClick={handleSubmit}
                    name="list"
                    value={list}
                  >
                    {list}
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

export default ListPopupWindow;
