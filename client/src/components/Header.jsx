import React from 'react';
import './Header.css';

const Header = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return (
    <div className="header">
      <div className="header-left">
      </div>
      <div className="header-right">
        <div className="user-profile">
          <div className="avatar">
            {user.emailOrMobile?.charAt(0).toUpperCase() || 'U'}
          </div>
          <span className="user-email">{user.emailOrMobile || 'User'}</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
