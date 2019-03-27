import React from 'react';
import PropTypes from 'prop-types';

const Footer = ({ countAnswers }) => {
  return (
    <footer className="page-footer">
      <div className="container center">
        <div className="row">
          <div className="col l6 s12">
            <h5 className="grey-text text-lighten-4">{countAnswers} people are answered.</h5>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="container">© 2019 Copyright Cat & Hyesoo</div>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  countAnswers: PropTypes.number.isRequired,
};

export default Footer;
