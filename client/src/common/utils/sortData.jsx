const orderBy = (arr, props, orders) =>
  [...arr].sort((a, b) =>
    props.reduce((acc, prop, i) => {
      let accCopy = acc;
      if (accCopy === 0) {
        const [p1, p2] = orders && orders[i] === "desc" ? [b[prop], a[prop]] : [a[prop], b[prop]];
        accCopy = p1 > p2 ? 1 : p1 < p2 ? -1 : 0;
      }
      return accCopy;
    }, 0)
  );

const sortData = (items, prop, sortState) => {
  const sortedAsc = orderBy([...items], [prop], ["asc", "desc"]);
  const sortedDesc = orderBy([...items], [prop], ["desc", "asc"]);
  return sortState === false ? sortedAsc : sortedDesc;
};

export default sortData;
