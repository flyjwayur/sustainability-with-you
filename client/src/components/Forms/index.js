import React, { useState } from 'react';
import axios from 'axios';
import classNames from 'classnames';
import { words, wordsWithCheckBox } from '../../api/data';
import { useFormWithLocalStorage } from './customHooks/useFormWithLocalStorage';
import WordsForm from './WordsForm';
import UserInfoForm from './UserInfoForm';
import './styles.scss';

const Form = () => {
  //destructured useState returns array (state, fn for updating state)
  const [text, setText] = useState({ age: '', countryBirth: '', countryResidence: '' });
  const [checked, setChecked] = useState(wordsWithCheckBox);

  const [formData, dispatch] = useFormWithLocalStorage([]);
  let [currentPageIndex, setCurrentPageIndex] = useState(0);

  const forms = [
    {
      Components: WordsForm,
    },
    {
      Components: UserInfoForm,
    },
  ];
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

  const handleNextPage = () => {
    if (currentPageIndex === forms.length) {
      setCurrentPageIndex = currentPageIndex;
    }
    setCurrentPageIndex(currentPageIndex + 1);
  };

  const handlePreviousPage = () => {
    if (currentPageIndex === 0) {
      setCurrentPageIndex = currentPageIndex;
    }
    setCurrentPageIndex(currentPageIndex - 1);
  };

  const SubForm = forms[currentPageIndex].Components;
  return (
    <div className="section grey lighten-3">
      <section className={classNames('container white', 'form__container')}>
        <div className="section">
          <form className="col s12" onSubmit={handleSubmit}>
            <SubForm
              words={words}
              checked={checked}
              handleCheckbox={handleCheckbox}
              handleNextPage={handleNextPage}
              text={text}
              handleText={handleText}
              handlePreviousPage={handlePreviousPage}
            />
          </form>
        </div>
      </section>
    </div>
  );
};

export default Form;
