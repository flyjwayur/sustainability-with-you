import { useState } from 'react';

const useSubmit = (inputs, success) => {
  const [errorItems, setErrorItems] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    const errorItems = inputs.filter(input => !input.validate());

    setErrorItems(errorItems);
    if (errorItems && errorItems.length === 0) {
      success &&
        success(
          inputs.map(({ props: { name, value } }) => ({
            name,
            value,
          }))
        );
    }
  }
  return {
    props: {
      onSubmit: handleSubmit,
    },
    errorItems,
  };
};

export default useSubmit;
