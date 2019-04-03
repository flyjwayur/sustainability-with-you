import React, { useState, useEffect } from 'react';
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
  const [radioChecked, setRadioChecked] = useState('');
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
  // console.log('formData', formData);

  const handleText = e => {
    setText({ ...text, [e.target.name]: e.target.value });
  };

  const handleCheckbox = e => {
    //To store boolean values in table
    // const convertedZeroOrOne = e.target.checked ? 1 : 0;
    setChecked({ ...checked, [e.target.name]: e.target.value });
  };
  // useEffect(() => console.log('all checked', checked));

  const handleRadiobox = e => {
    //When the radio button is checked, assign the value
    if (e.target.checked) setRadioChecked(e.target.value);
  };

  const handleSubmit = e => {
    // To reload the page to get correct number of answers, make refresh the page on submit the form
    e.preventDefault();
    const { age, countryBirth, countryResidence } = text;
    const words = checked;

    console.log('checked', checked);
    const gender = radioChecked;

    axios
      .post('/api/formData', { words, age, gender, countryBirth, countryResidence })
      .then(res => {
        dispatch({ type: 'ADD_FORMDATA', content: res.data });
        window.alert(JSON.stringify(res.data, null, 4));
      })
      .catch(err => console.log('post response error'));

    // Clean the text, checkbox and radio inputs after submit
    setText({ age: '', countryBirth: '', countryResidence: '' });
    setChecked(wordsWithCheckBox);
    setRadioChecked('');
    // Lead a user to first Subform to be ready for next user's inputs
    setCurrentPageIndex(0);
  };

  const handleEnterSubmit = e => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
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
          <form className="col s12" onSubmit={handleSubmit} onKeyPress={handleEnterSubmit}>
            <SubForm
              words={words}
              checked={checked}
              handleCheckbox={handleCheckbox}
              text={text}
              handleText={handleText}
              radioChecked={radioChecked}
              handleRadiobox={handleRadiobox}
              handleNextPage={handleNextPage}
              handlePreviousPage={handlePreviousPage}
            />
          </form>
        </div>
      </section>
    </div>
  );
};

export default Form;
