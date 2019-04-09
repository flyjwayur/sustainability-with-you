import { useState } from 'react';

const useTextInput = (name, defaultValue, validate) => {
  const [value, setValue] = useState(defaultValue);
  const [error, setError] = useState(null);

  const handleChange = e => {
    setValue(e.target.value);
    // setError(null);
  };

  const handleValidate = () => {
    const error = validate(name, value);
    setError(error);
  };

  const handleBlur = () => {
    handleValidate();
  };

  return {
    props: {
      name,
      value,
      onChange: handleChange,
      onBlur: handleBlur,
    },
    error,
  };
};

export default useTextInput;
