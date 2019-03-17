import React, { useState } from 'react';
import axios from 'axios';
import classNames from 'classnames';
import { words, wordsWithCheckBox } from '../../api/data';
import { useFormWithLocalStorage } from './customHooks/useFormWithLocalStorage';

import './styles.scss';

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
      <div className="row">
        <form className="col s12" onSubmit={handleSubmit}>
          <div className="row">
            <h2>Words I associate with sustainability?</h2>
            {words.map((word, index) => {
              console.log('checked', checked);
              return (
                <p
                  className={classNames('chip', { form__checkbox: checked[word] })}
                  key={word + index}
                >
                  <label>
                    <input
                      id="indeterminate-checkbox"
                      name={word}
                      key={word + index}
                      type="checkbox"
                      value={checked}
                      onChange={e => handleCheckbox(e)}
                    />
                    <span className={classNames({ form__checkbox__text: checked[word] })}>
                      {word}
                    </span>
                  </label>
                </p>
              );
            })}
          </div>
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
      </div>
    </section>
  );
};

export default Form;
