const parseJwt = (t) => {
  try {
    return JSON.parse(atob(t.split(".")[1]));
  } catch (e) {
    return null;
  }
};

export default parseJwt;
