import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './styles.scss';

const WordsForm = ({ words, checked, handleCheckbox, handleNextPage, handleTouch }) => {
  return (
    <div className="section">
      <div className="col s12 m6">
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title center">Words I associate with sustainability?</span>
          </div>
        </div>
      </div>
      <div className="col s12 m6">
        <div className="card">
          <div className={classNames('card-content', 'wordsForm')}>
            {words.map((word, index) => {
              return (
                <div
                  className={classNames(
                    'row',
                    'chip',
                    {
                      wordsForm__checked: checked[word],
                    },
                    'wordsForm__checkbox'
                  )}
                  key={word + index}
                >
                  <label>
                    {/* checked={checked[word]} is needed for consistent Materialize style  between switching subforms*/}
                    <input
                      id="indeterminate-checkbox"
                      name={word}
                      key={word + index}
                      type="checkbox"
                      value={checked[word]}
                      onChange={e => handleCheckbox(e)}
                      checked={checked[word]}
                      onBlur={e => handleTouch(e)}
                    />
                    <span
                      className={classNames({
                        wordsForm__checked__text: checked[word],
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
      <button type="button" className="btn waves-effect waves-light right" onClick={handleNextPage}>
        I chose my sustainability words
      </button>
    </div>
  );
};

WordsForm.propTypes = {
  words: PropTypes.arrayOf(PropTypes.string).isRequired,
  checked: PropTypes.objectOf(PropTypes.number).isRequired,
  handleCheckbox: PropTypes.func.isRequired,
  handleNextPage: PropTypes.func.isRequired,
};

export default WordsForm;
