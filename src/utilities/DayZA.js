const DayZA = (a, b) => {
  if (a.day.toLowerCase() > b.day.toLowerCase()) {
    return -1;
  } else if (b.day.toLowerCase() > a.day.toLowerCase()) {
    return 1;
  } else {
    return 0;
  }
};

export default DayZA;
