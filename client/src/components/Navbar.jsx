import React from 'react';

const Navbar = ({ username }) => {
  return (
    <nav>
      <div className="navbar-left">
        <span>{username}</span>
      </div>
      <div className="navbar-right">
        <button>Sign In</button>
      </div>
    </nav>
  );
};

export default Navbar;
