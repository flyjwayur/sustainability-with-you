import { useState } from 'react';
import { countries } from '../../../api/data';

const useCountriesSuggestion = (name, defaultValue, validate) => {
  const [value, setValue] = useState(defaultValue);
  const [error, setError] = useState(null);
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  // const [userInput, setUserInput] = useState(defaultValue);

  // Handle Inputs
  const handleChange = e => {
    const value = e.currentTarget.value;
    setValue(e.target.value);

    // 1) filter by indexOf
    // const filteredSuggestions = countries.filter(
    //   country => country.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    // );

    // 2) filter by includes
    const filteredCountries = countries.filter(country =>
      country.toLowerCase().includes(value.toLowerCase())
    );
    setActiveSuggestion(0);
    setFilteredSuggestions(filteredCountries);
    setShowSuggestions(true);
    setValue(value);
  };

  const handleOnClick = e => {
    console.log('e.target', e.target);
    console.log('e.currentTarget', e.currentTarget);
    setValue(e.currentTarget.innerText);
    setActiveSuggestion(0);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
  };

  const handleOnKeyDown = e => {
    console.log('key down', e.target);
    // key enter
    if (e.keyCode === 13) {
      e.preventDefault();
      console.log('enter coming?');
      setActiveSuggestion(0);
      setShowSuggestions(false);
      setValue(filteredSuggestions[activeSuggestion]);
      console.log(filteredSuggestions[activeSuggestion]);
      // key down
    } else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }
      setActiveSuggestion(activeSuggestion - 1);
      // key up
    } else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }
      setActiveSuggestion(activeSuggestion + 1);
    }
  };

  // Handle validate
  const handleValidate = () => {
    const error = validate(name, value);
    setError(error);
  };

  const handleBlur = () => {
    handleValidate();
    // setShowSuggestions(false);
  };

  console.log('showSuggesitons', showSuggestions);
  console.log('active suggestion', activeSuggestion);
  return {
    props: {
      name,
      value,
      onChange: handleChange,
      onBlur: handleBlur,
    },
    error,
    // handleChange,
    handleOnClick,
    handleOnKeyDown,
    activeSuggestion,
    filteredSuggestions,
    showSuggestions,
    // userInput,
  };
};

export default useCountriesSuggestion;
