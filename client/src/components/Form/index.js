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
    <div className="section grey lighten-3">
      <section className={classNames('container center white', 'form__container')}>
        {/* <ul>
        <li>{text.age}</li>
        <li>{text.countryBirth}</li>
        <li>{text.countryResidence}</li>
      </ul>
      <ul>
        {Object.values(checked).map((checkedValue, index) => (
          <li key={index}>{checkedValue.toString()}</li>
        ))}
      </ul> */}

        <div className="section">
          <form className="col s12" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col s12 m6">
                <div className="card blue-grey darken-1">
                  <div className="card-content white-text">
                    <span className="card-title">Words I associate with sustainability?</span>
                  </div>
                </div>
              </div>
              <div className="col s12 m6">
                <div className="card">
                  <div className={classNames('card-content', 'form__checkboxs')}>
                    {words.map((word, index) => {
                      console.log('checked', checked);
                      return (
                        <div
                          className={classNames(
                            'row',
                            'chip',
                            {
                              form__checkboxs__checked: checked[word],
                            },
                            'form__checkboxs__checkbox'
                          )}
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
                            <span
                              className={classNames({
                                form__checkboxs__checked__text: checked[word],
                              })}
                            >
                              {word}
                            </span>
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="divider" />
            <div className="section">
              <div className="row">
                <div className="input-field col s8">
                  <input
                    name="age"
                    id="age"
                    type="number"
                    value={text.age}
                    onChange={e => handleText(e)}
                    className="validate"
                  />
                  <label htmlFor="age">My age</label>
                  <span className="helper-text" data-error="wrong" data-success="right">
                    Number is required
                  </span>
                </div>
              </div>
            </div>
            <div className="section">
              <div className="row">
                <div className="input-field col s8">
                  <input
                    name="countryBirth"
                    id="countryBirth"
                    type="text"
                    value={text.countryBirth}
                    onChange={e => handleText(e)}
                    className="validate"
                    required
                  />
                  <label htmlFor="countryBirth">My country of birth</label>
                  <span className="helper-text" data-error="wrong" data-success="right">
                    Text is required
                  </span>
                </div>
              </div>
            </div>
            <div className="section">
              <div className="row">
                <div className="input-field col s8">
                  <input
                    name="countryResidence"
                    id="countryResidence"
                    type="text"
                    value={text.countryResidence}
                    onChange={e => handleText(e)}
                    className="validate"
                  />
                  <label htmlFor="countryResidence">My country of residence</label>
                  <span className="helper-text" data-error="wrong" data-success="right">
                    Text is required
                  </span>
                </div>
              </div>
            </div>
            <button className="btn waves-effect waves-light" type="submit" name="action">
              I am done
              <i className="material-icons right">send</i>
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Form;
