import React from 'react';

const Header = ({ loggedInUser }) => {
  return (
    <header className="header">
      <div className="app-name">ListEd</div> {/* Static header */}
      <div className="user-name">{loggedInUser}</div>
    </header>
  );
};

export default Header;