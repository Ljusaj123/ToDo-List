const NameAZ = (a, b) => {
  if (a.name > b.name) {
    return 1;
  } else if (b.name > a.name) {
    return -1;
  } else {
    return 0;
  }
};

export default NameAZ;
