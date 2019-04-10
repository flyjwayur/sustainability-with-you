import React from 'react';

const CountrySuggestions = (
  filteredSuggestions,
  showSuggestions,
  text,
  handleOnClickSuggestions,
  searchName
) => {
  console.log('show', showSuggestions);
  console.log(filteredSuggestions, showSuggestions, text, handleOnClickSuggestions, searchName);
  return (
    <>
      <ul className="userInfoForm__autocomplete__items">
        {showSuggestions &&
          text &&
          filteredSuggestions &&
          filteredSuggestions.map((country, index) => (
            <li
              name="countryBirth"
              key={country + index}
              value={country}
              onClick={e => handleOnClickSuggestions(e, searchName)}
              tabIndex={1}
              role="button"
            >
              {country}
            </li>
          ))}
      </ul>
    </>
  );
};

export default CountrySuggestions;
