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
  const [allFetchedData, setFetch] = useState([]);

  const handleText = e => {
    setText({ ...text, [e.target.name]: e.target.value });
  };

  const handleCheckbox = e => {
    setChecked({ ...checked, [e.target.name]: e.target.checked });
  };

  const handleFetchAllFormData = e => {
    axios
      .get('/api/formData')
      .then(res => {
        const data = res.data;
        setFetch(data);
        console.log('allfectchedData', data);
      })
      .catch(err => console.log('get response error'));
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

  const sustainabilityWords = allFetchedData.words;

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

      <button type="button" onClick={handleFetchAllFormData}>
        Fetch all form data
      </button>
      <ul>
        {allFetchedData &&
          allFetchedData.map((data, index) => (
            <div key={data + index}>
              <li>{data.id}</li>
              <ul>
                {Object.entries(data.words).map((word, index) => (
                  <li key={word + index}>{word}</li>
                ))}
              </ul>
              <li>{data.countrybirth}</li>
              <li>{data.countryresidence}</li>
            </div>
          ))}
      </ul>
    </section>
  );
};

export default Form;
