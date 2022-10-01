const storeState = (name, state) => {
  try {
    localStorage.setItem(name, JSON.stringify(state));
    return true;
  } catch (error) {
    return false;
  }
};

const fetchState = (name) => {
  try {
    return JSON.parse(localStorage.getItem(name));
  } catch (error) {
    return null;
  }
};

export { storeState, fetchState };
