import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './styles.scss';

const UserInfoForm = ({
  radioChecked,
  handleRadiobox,
  handlePreviousPage,
  age,
  countryBirth,
  countryResidence,
}) => {
  return (
    <div className={classNames('section', 'userInfoForm')}>
      <div className="section">
        <div className="row">
          <button
            type="button"
            className="btn waves-effect waves-light"
            onClick={handlePreviousPage}
          >
            Back
            <i className="material-icons left">arrow_back</i>
          </button>
        </div>
      </div>
      <div className="section">
        <div className="row">
          <div className="input-field col s8">
            <input {...age.props} type="text" required />
            <label htmlFor="age" className="active">
              What is your age?
            </label>
            {age.error && <span className="userInfoForm__helper-text">{age.error}</span>}
          </div>
        </div>
      </div>
      <div className="section">
        <p> What is your Gender? </p>
        <div className="row">
          <p>
            <label htmlFor="male">
              {/* checked={radioChecked === 'male'} is needed for consistent Materialize style  between switching subforms */}
              <input
                type="radio"
                id="male"
                name="gender"
                onChange={e => handleRadiobox(e)}
                value="male"
                className="with-gap"
                checked={radioChecked === 'male'}
                required
              />
              <span>Male</span>
            </label>
          </p>
          <p>
            <label htmlFor="female">
              <input
                type="radio"
                id="female"
                name="gender"
                onChange={e => handleRadiobox(e)}
                value="female"
                className="with-gap"
                checked={radioChecked === 'female'}
              />
              <span>Female</span>
            </label>
          </p>
          <p>
            <label htmlFor="other">
              <input
                type="radio"
                id="other"
                name="gender"
                onChange={e => handleRadiobox(e)}
                value="other"
                className="with-gap"
                checked={radioChecked === 'other'}
              />
              <span>Other</span>
            </label>
          </p>
        </div>
      </div>
      <div className="section">
        <div className="row">
          <div className="input-field col s8">
            <input {...countryBirth.props} type="text" required />
            <label htmlFor="countryBirth" className="active">
              Which country did you born?
            </label>
            {countryBirth.error && (
              <span className="userInfoForm__helper-text">{countryBirth.error}</span>
            )}
          </div>
        </div>
      </div>
      <div className="section">
        <div className="row">
          <div className="input-field col s8">
            <input {...countryResidence.props} type="text" required />
            <label htmlFor="countryResidence" className="active">
              Which country do you live currently?
            </label>
            {countryResidence.error && (
              <span className="userInfoForm__helper-text">{countryResidence.error}</span>
            )}
          </div>
        </div>
      </div>
      <div className="section">
        <div className="row">
          <button className="btn waves-effect waves-light right" type="submit" name="action">
            I am done
            <i className="material-icons right">send</i>
          </button>
        </div>
      </div>
    </div>
  );
};

UserInfoForm.propTypes = {
  age: PropTypes.object.isRequired,
  countryBirth: PropTypes.object.isRequired,
  countryResidence: PropTypes.object.isRequired,
  radioChecked: PropTypes.string.isRequired,
  handleRadiobox: PropTypes.func.isRequired,
  handlePreviousPage: PropTypes.func.isRequired,
};

export default UserInfoForm;
