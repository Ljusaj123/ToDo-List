import React, { useState, useEffect, useContext } from "react";
import TaskContext from "../contexts/TaskContext";
import { BiDownArrow, BiUpArrow } from "react-icons/bi";
import days from "../const/Days";
import sortingList from "../const/SortingList";
import NameAZ from "../utilities/NameAZ";
import NameZA from "../utilities/NameZA";
import DayZA from "../utilities/DayZA";
import DayAZ from "../utilities/DayAZ";

function FilterSort() {
  const { taskListInit, setTaskList } = useContext(TaskContext);
  const [showArrowDaysOptions, setShowArrowDaysOptions] = useState(false);
  const [showArrowSortOptions, setShowArrowSortOptions] = useState(false);

  const [initSelectValue, setInitSelectValue] = useState({
    days: "Select Day",
    sort: "Sort by:",
  });

  const handleSelect = (e) => {
    const container = e.target.nextSibling;
    container.classList.toggle("active");
    switch (container.id) {
      case "days":
        setShowArrowDaysOptions((prev) => !prev);
        break;
      case "sort":
        setShowArrowSortOptions((prev) => !prev);
        break;
      default:
        break;
    }
  };

  const handleOption = (e) => {
    const { name, value } = e.target.firstChild;
    setInitSelectValue({
      ...initSelectValue,
      [name]: value,
    });
    const container = e.target.parentElement;
    container.classList.remove("active");

    switch (name) {
      case "days":
        setShowArrowDaysOptions(false);
        break;
      case "sort":
        setShowArrowSortOptions(false);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    switch (initSelectValue.days) {
      case "All":
        setTaskList(taskListInit);
        break;
      case "Today":
        setTaskList(taskListInit.filter((task) => task.day === "Today"));
        break;
      case "Tommorow":
        setTaskList(taskListInit.filter((task) => task.day === "Tommorow"));
        break;
      case "Next Week":
        setTaskList(taskListInit.filter((task) => task.day === "Next Week"));
        break;
      case "Never":
        setTaskList(taskListInit.filter((task) => task.day === "Never"));
        break;
      default:
        break;
    }
  }, [initSelectValue.days, setTaskList, taskListInit]);

  useEffect(() => {
    switch (initSelectValue.sort) {
      case "Name (A-Z)":
        //So, this line of code is wrong, as it modifies state (sorts the array, which is in the state) in place.
        //And React “thinks” that setTaskList is being called with the same array that it already had, therefore no re-render.
        // ### setTaskList(taskListInit.sort(NameAZ))
        setTaskList([...taskListInit].sort(NameAZ));
        break;
      case "Name (Z-A)":
        setTaskList([...taskListInit].sort(NameZA));
        break;
      case "Day (A-Z)":
        setTaskList([...taskListInit].sort(DayAZ));
        break;
      case "Day (Z-A)":
        setTaskList([...taskListInit].sort(DayZA));
        break;
      default:
        break;
    }
  }, [initSelectValue.sort, setTaskList, taskListInit]);

  return (
    <div className="filter-sort-container">
      <div className="container filter-by-day">
        <div className="selected" onClick={handleSelect}>
          <p>{initSelectValue.days}</p>
          <p>{showArrowDaysOptions ? <BiUpArrow /> : <BiDownArrow />}</p>
        </div>
        <div className="options-container" id="days">
          <div className="option" onClick={handleOption}>
            <input type="radio" className="radio" name="days" value="All" />
            <label>All</label>
          </div>
          {days.value.map((day, index) => {
            return (
              <div className="option" onClick={handleOption} key={index}>
                <input
                  type="radio"
                  className="radio"
                  id={day}
                  value={day}
                  name="days"
                />
                <label>{day}</label>
              </div>
            );
          })}
        </div>
      </div>
      <div className="container sort">
        <div className="selected" onClick={handleSelect}>
          <p>{initSelectValue.sort}</p>
          <p>{showArrowSortOptions ? <BiUpArrow /> : <BiDownArrow />}</p>
        </div>
        <div className="options-container" id="sort">
          {sortingList.map((sort, index) => {
            return (
              <div className="option" onClick={handleOption} key={index}>
                <input
                  type="radio"
                  className="radio"
                  id={sort}
                  name="sort"
                  value={sort}
                />
                <label>{sort}</label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default FilterSort;
