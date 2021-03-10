import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

import '../styles/backToTop.css';

const BackToTop = () => {

  const scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
      window.requestAnimationFrame(scrollToTop);
      window.scrollTo(0, c - c / 10);
    }
  };

  const topFunction = e => {
    e.preventDefault();
    scrollToTop();
  }

  return (
    <>
      <a onClick={topFunction} id="back-to-top">
        <div className="back-to-top">
          <FontAwesomeIcon icon={faArrowUp} className="arrow" />
        </div>
      </a>
    </>
  );
}

export default BackToTop;
