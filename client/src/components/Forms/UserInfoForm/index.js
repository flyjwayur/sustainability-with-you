import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './styles.scss';

const UserInfoForm = ({
  text,
  handleText,
  radioChecked,
  handleRadiobox,
  handlePreviousPage,
  handleTouch,
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
            <input
              name="age"
              id="age"
              type="number"
              value={text.age}
              onChange={e => handleText(e)}
              className="validate"
              required
              onBlur={e => handleTouch(e)}
            />
            <label htmlFor="age" className="active">
              What is your age?
            </label>
            <span className="helper-text" data-error="wrong" data-success="right">
              Number is required
            </span>
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
                onBlur={e => handleTouch(e)}
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
            <input
              name="countryBirth"
              id="countryBirth"
              type="text"
              value={text.countryBirth}
              onChange={e => handleText(e)}
              className="validate"
              required
              onBlur={e => handleTouch(e)}
            />
            <label htmlFor="countryBirth" className="active">
              Which country did you born?
            </label>
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
              required
              onBlur={e => handleTouch(e)}
            />
            <label htmlFor="countryResidence" className="active">
              Which country do you live currently?
            </label>
            <span className="helper-text" data-error="wrong" data-success="right">
              Text is required
            </span>
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
  text: PropTypes.object.isRequired,
  handleText: PropTypes.func.isRequired,
  radioChecked: PropTypes.string.isRequired,
  handleRadiobox: PropTypes.func.isRequired,
  handlePreviousPage: PropTypes.func.isRequired,
};

export default UserInfoForm;
