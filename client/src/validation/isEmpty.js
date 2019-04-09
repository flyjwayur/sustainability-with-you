const isEmpty = val => {
  return (
    (typeof val === 'string' && val.trim().length === 0) ||
    val === undefined ||
    val === null ||
    Object.keys(val).length === 0
  );
};

export default isEmpty;
