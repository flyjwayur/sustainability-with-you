import isEmpty from './isEmpty';
import { countries } from '../api/data';

const validateInput = {
  age: function(name, value) {
    if (value.match(/[a-zA-Z]+/gi)) {
      return `The ${name} field should be number`;
    }
    if (isEmpty(value)) {
      return `The ${name} field is required.`;
    }
    return;
  },
  countryBirth: function(name, value) {
    if (value && !countries.includes(value)) {
      return 'Country name should be correct';
    }
    if (isEmpty(value)) {
      return `The ${name} field is required.`;
    }
  },
  countryResidence: function(name, value) {
    if (value && !countries.includes(value)) {
      return 'Country name should be correct';
    }
    if (isEmpty(value)) {
      return `The ${name} field is required.`;
    }
  },
};

export default validateInput;
