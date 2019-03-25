import React from 'react';

const UserInfoForm = ({ text, handleText, radioChecked, handleRadiobox, handlePreviousPage }) => {
  return (
    <>
      <button type="button" className="btn waves-effect waves-light" onClick={handlePreviousPage}>
        Back
      </button>
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
            />
            <label htmlFor="age">My age</label>
            <span className="helper-text" data-error="wrong" data-success="right">
              Number is required
            </span>
          </div>
        </div>
      </div>
      <div className="section">
        <p> * Select Gender :</p>
        <div className="row">
          <p>
            <label htmlFor="male">
              <input
                type="radio"
                id="male"
                name="gender"
                onChange={e => handleRadiobox(e)}
                value="male"
                className="with-gap"
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
              />
              <span>Female</span>
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
              required
            />
            <label htmlFor="countryResidence">My country of residence</label>
            <span className="helper-text" data-error="wrong" data-success="right">
              Text is required
            </span>
          </div>
        </div>
      </div>
      <button className="btn waves-effect waves-light right" type="submit" name="action">
        I am done
        <i className="material-icons right">send</i>
      </button>
    </>
  );
};

export default UserInfoForm;
