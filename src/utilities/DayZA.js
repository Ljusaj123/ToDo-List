const DayZA = (a, b) => {
  if (a.day > b.day) {
    return -1;
  } else if (b.day > a.day) {
    return 1;
  } else {
    return 0;
  }
};

export default DayZA;
