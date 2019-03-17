import React, { useState } from 'react';
import axios from 'axios';

import { words, wordsWithCheckBox } from '../../api/data';
import { useFormWithLocalStorage } from './customHooks/useFormWithLocalStorage';

const Form = () => {
  //destructured useState returns array (state, fn for updating state)
  const [text, setText] = useState({ age: '', countryBirth: '', countryResidence: '' });
  const [checked, setChecked] = useState(wordsWithCheckBox);

  const [formData, dispatch] = useFormWithLocalStorage([]);
  console.log('formData', formData);

  const handleText = e => {
    setText({ ...text, [e.target.name]: e.target.value });
  };

  const handleCheckbox = e => {
    setChecked({ ...checked, [e.target.name]: e.target.checked });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { age, countryBirth, countryResidence } = text;
    const words = checked;

    axios
      .post('/api/formData', { words, age, countryBirth, countryResidence })
      .then(res => {
        dispatch({ type: 'ADD_FORMDATA', content: res.data });
        window.alert(JSON.stringify(res.data, null, 4));
      })
      .catch(err => console.log('post response error'));

    setText({ age: '', countryBirth: '', countryResidence: '' });
  };

  return (
    <section>
      <ul>
        <li>{text.age}</li>
        <li>{text.countryBirth}</li>
        <li>{text.countryResidence}</li>
      </ul>
      <ul>
        {Object.values(checked).map((checkedValue, index) => (
          <li key={index}>{checkedValue.toString()}</li>
        ))}
      </ul>
      <div class="row">
        <div class="input-field col s6">
          <input value="Alvin" id="first_name2" type="text" class="validate" />
          <label class="active" for="first_name2">
            First Name
          </label>
        </div>
      </div>
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
        <input
          name="countryBirth"
          type="text"
          value={text.countryBirth}
          onChange={e => handleText(e)}
        />
        <label>My country of residence</label>
        <input
          name="countryResidence"
          type="text"
          value={text.countryResidence}
          onChange={e => handleText(e)}
        />
        <button type="submit">I am done</button>
      </form>
    </section>
  );
};

export default Form;
