export const capitalizedFirstLetter = value => {
  if (value && value.length > 0) {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }
};
