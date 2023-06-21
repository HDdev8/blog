const filterData = (arr, prop, f) => {
  if (!arr) return;
  return arr.filter((item) => item[prop].toUpperCase().includes(f.toUpperCase()));
};

export default filterData;
