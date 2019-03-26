import React from 'react';
import classNames from 'classnames';

import './styles.scss';

const Header = () => {
  return (
    <nav>
      <div className="nav-wrapper">
        <span className={classNames('brand-logo left', 'header__logo')}>Sustainability</span>
      </div>
    </nav>
  );
};

export default Header;
