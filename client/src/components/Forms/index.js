import React, { useState } from 'react';
import axios from 'axios';
import classNames from 'classnames';

import { words, wordsWithCheckBox } from '../../api/data';
import { useFormWithLocalStorage } from './customHooks/useFormWithLocalStorage';
import WordsForm from './WordsForm';
import UserInfoForm from './UserInfoForm';
import { capitalizedFirstLetter } from '../../utils/formatValue';
import validateForm from '../../validation/validateForm';
import useTextInput from './customHooks/useTextInput';

import './styles.scss';

const Form = () => {
  const ageInput = useTextInput('age', '', validateForm.age);
  const countryBirthInput = useTextInput('countryBirth', '', validateForm.countryBirth);
  const countryResidenceInput = useTextInput('countryResidence', '', validateForm.countryResidence);
  //destructured useState returns array (state, fn for updating state)
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

  const handleCheckbox = e => {
    //To store boolean values in table
    setChecked({ ...checked, [e.target.name]: Number(e.target.checked) });
  };

  const handleRadiobox = e => {
    //When the radio button is checked, assign the value
    if (e.target.checked) setRadioChecked(e.target.value);
  };

  const handleSubmit = e => {
    // To reload the page to get correct number of answers, make refresh the page on submit the form
    // e.preventDefault();
    const age = ageInput.props.value;
    let countryBirth = countryBirthInput.props.value;
    let countryResidence = countryResidenceInput.props.value;
    countryBirth = capitalizedFirstLetter(countryBirth);
    countryResidence = capitalizedFirstLetter(countryResidence);

    const words = checked;
    const gender = radioChecked;

    axios
      .post('/api/formData', {
        words,
        age,
        gender,
        countryBirth,
        countryResidence,
      })
      .then(res => {
        dispatch({ type: 'ADD_FORMDATA', content: res.data });
        window.alert('Thank you for submitting the form :D');
      })
      .catch(err => console.log('post response error'));

    // Clean the checkbox and radio inputs after submit
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
          <form className="col s12">
            <SubForm
              words={words}
              checked={checked}
              handleCheckbox={handleCheckbox}
              age={ageInput}
              countryBirth={countryBirthInput}
              countryResidence={countryResidenceInput}
              radioChecked={radioChecked}
              handleRadiobox={handleRadiobox}
              handleNextPage={handleNextPage}
              handlePreviousPage={handlePreviousPage}
              handleSubmit={handleSubmit}
              handleEnterSubmit={handleEnterSubmit}
            />
          </form>
        </div>
      </section>
    </div>
  );
};

export default Form;
