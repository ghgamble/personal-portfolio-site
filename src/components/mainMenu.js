import React from 'react';

const MainMenu = props => {
  return (
    <div>
      <nav className="main-menu">
        <ul>
          <li><a href="#aboutSection">About</a></li>
          <li><a href="#portfolioSectionHome">Portfolio</a></li>
          <li><a href="#hubspotForm">Contact</a></li>
        </ul>
      </nav>
    </div>
  );
}

export default MainMenu;
