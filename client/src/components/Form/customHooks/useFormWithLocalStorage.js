import { useEffect, useRef, useReducer, useMemo } from 'react';

//Custom hook
export const useFormWithLocalStorage = defaultValue => {
  const formDataId = useRef(0);
  //initialFormData becomes object
  const initialFormData = () => {
    const valueFromLocalStorage = JSON.parse(
      localStorage.getItem('formData') || JSON.stringify(defaultValue)
    );

    formDataId.current = valueFromLocalStorage.reduce((acc, curr) => Math.max(acc, curr), 0);
    return valueFromLocalStorage;
  };

  const [formData, dispatch] = useReducer((state, action) => {
    if (action.type === 'ADD_FORMDATA') {
      return [...state, action.content];
    }
    return state;
  }, useMemo(initialFormData, []));

  //Only write formData to localStorage when the array has changed with 2nd arg
  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);
  return [formData, dispatch];
};
