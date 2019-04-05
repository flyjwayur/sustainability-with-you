import validator from 'validator';
import isEmpty from './isEmpty';
import { countries } from '../api/data';

const validateForm = (values, touched) => {
  const errors = {};

  const { words, age, gender, countryBirth, countryResidence } = values;

  const touchedWords = touched ? touched.words : false;
  const touchedAge = touched ? touched.age : false;
  const touchedGender = touched ? touched.gender : false;
  const touchedCountryBirth = touched ? touched.countryBirth : false;
  const touchedCountryResidence = touched ? touched.countryResidence : false;

  //Check empty in each input field
  if (touchedWords && isEmpty(words)) {
    errors.words = 'The word field is required.';
  }

  if (touchedAge && isEmpty(age)) {
    errors.age = 'The age field is required.';
  }

  if (touchedGender && isEmpty(gender)) {
    errors.gender = 'The gender field is required.';
  }

  if (touchedCountryBirth && isEmpty(countryBirth)) {
    errors.countryBirth = 'The country of birth field is required.';
  }

  if (touchedCountryResidence && isEmpty(countryResidence)) {
    errors.countryResidence = 'The country of residence field is required.';
  }

  //Check requirement in each field
  if (touchedCountryBirth && !countries.includes(values.countryBirth)) {
    errors.countryBirth = 'Country name should be correct';
  }

  if (touchedCountryResidence && !countries.includes(values.countryResidence)) {
    errors.countryResidence = 'Country name should be correct';
  }

  return {
    errors,
    isVaild: isEmpty(errors),
  };
};

export default validateForm;
