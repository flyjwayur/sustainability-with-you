import React, { useState, useEffect, useRef, useReducer, useMemo } from 'react';

// Sustainability words
const words = ['RenewableEnergy', 'Recycling', 'Biodiversity'];

const wordsWithCheckBox = words.reduce((allWords, currentWord) => {
  return { ...allWords, [currentWord]: false };
}, {});

//Custom hook
const useFormWithLocalStorage = defaultValue => {
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
      formDataId.current += 1;
      return [...state, { id: formDataId.current, content: action.content }];
    }
    return state;
  }, useMemo(initialFormData, []));

  //Only write formData to localStorage when the array has changed with 2nd arg
  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);
  return [formData, dispatch];
};

const Form = () => {
  //destructured useState returns array (state, fn for updating state)
  const [text, setText] = useState({ age: '', birth: '', residence: '' });
  const [checked, setChecked] = useState(wordsWithCheckBox);

  const [formData, dispatch] = useFormWithLocalStorage([]);
  // const [formData, submitFormData] = useState(initialFormData);

  const handleText = e => {
    setText({ ...text, [e.target.name]: e.target.value });
  };

  const handleCheckbox = e => {
    setChecked({ ...checked, [e.target.name]: e.target.checked });
  };

  const handleSubmit = e => {
    e.preventDefault();
    window.alert(JSON.stringify({ id: Date.now(), content: { text, checked } }, null, 4));
    dispatch({ type: 'ADD_FORMDATA', content: { text, checked } });
    setText({ age: '', birth: '', residence: '' });
  };

  return (
    <section>
      <ul>
        <li>{text.age}</li>
        <li>{text.birth}</li>
        <li>{text.residence}</li>
      </ul>
      <ul>
        {Object.values(checked).map((checkedValue, index) => (
          <li key={index}>{checkedValue.toString()}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <h2>Words I associate with sustainability?</h2>
        {words.map((word, index) => {
          return (
            <div key={word + index}>
              <label>{word}</label>
              <input
                name={word}
                key={word + index}
                type="checkbox"
                value={checked}
                onChange={e => handleCheckbox(e)}
              />
            </div>
          );
        })}
        <label>My age</label>
        <input name="age" type="number" value={text.age} onChange={e => handleText(e)} />
        <label>My country of birth</label>
        <input name="birth" type="text" value={text.birth} onChange={e => handleText(e)} />
        <label>My country of residence</label>
        <input name="residence" type="text" value={text.residence} onChange={e => handleText(e)} />
        <button type="submit">I am done</button>
      </form>
    </section>
  );
};

export default Form;
