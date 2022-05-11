import React from "react";
import { AiOutlineClose } from "react-icons/ai";

function ListPopupWindow({ setTrigger, trigger, setTask, task, data }) {
  const handleSubmit = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
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
              {data.value.map((d, index) => {
                return (
                  <button
                    className="popup-btn"
                    key={index}
                    onClick={handleSubmit}
                    name={data.name}
                    value={d}
                  >
                    {d}
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
