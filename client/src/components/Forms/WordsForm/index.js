import React from 'react';
import classNames from 'classnames';

const WordsForm = ({ words, checked, handleCheckbox, handleNextPage }) => {
  return (
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
                    {/* checked={checked[word]} is needed for consistent Materialize style  between switching subforms*/}
                    <input
                      id="indeterminate-checkbox"
                      name={word}
                      key={word + index}
                      type="checkbox"
                      value={checked}
                      onChange={e => handleCheckbox(e)}
                      checked={checked[word]}
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
      <button type="button" className="btn waves-effect waves-light right" onClick={handleNextPage}>
        I chose my sustainability words
      </button>
    </div>
  );
};

export default WordsForm;
