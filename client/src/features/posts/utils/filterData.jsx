const filterData = (arr, prop, f) => {
  return arr.filter((item) => item[prop].toUpperCase().includes(f.toUpperCase()));
};

export default filterData;
