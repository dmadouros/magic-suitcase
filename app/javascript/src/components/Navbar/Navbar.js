import React from 'react';

import {Link, NavLink} from 'react-router-dom';

const navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="#">Magic Suitcase</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse"
              data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown"
              aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" to="/cards">Cards</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/decks">Decks</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default navbar;
