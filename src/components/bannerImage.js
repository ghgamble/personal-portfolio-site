import { Link } from 'gatsby';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const BannerImage = () => {
  return (
    <>
      <div className="banner-body" translate="no">
        <div className="banner-title">
          <h1 className="first-line">Hi, I'm <Link to="#aboutSectionHome" className="link-to-about banner-link"><span className="banner-name">Grace Gamble</span></Link>.</h1>
          <h1 className="second-line">I'm a software engineer.</h1>
          <Link to="#portfolioSectionHome" className="link-to-work banner-link">View my work <FontAwesomeIcon icon={faArrowRight} /></Link>
        </div>
        <div className="lines">
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </div>
    </>
  );

}

export default BannerImage;
