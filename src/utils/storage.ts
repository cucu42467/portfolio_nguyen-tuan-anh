export const getFromLS = (key: string) => {
  const value = window.localStorage.getItem(key);

  if (value) {
    return value;
  }
};
