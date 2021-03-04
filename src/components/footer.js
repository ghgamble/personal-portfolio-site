import React from 'react';

import '../styles/footer.css';
import BackToTop from './backToTop';
import SocialIcons from './socialIcons';

const Footer = () => {

  return (
    <div className="footer-content">
      <BackToTop />
      <SocialIcons />
      <p className="copyright">Grace Gamble © {new Date().getFullYear()}</p>
    </div>
  );

}

export default Footer;
