import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

import '../styles/socialIcons.css';

const SocialIcons = () => {

  return (
    <StaticQuery
      query={graphql`
        {
          wpgraphql {
            menu(id: "3", idType: DATABASE_ID) {
              footerInfo {
                email
                fieldGroupName
                github
                linkedin
                phone
              }
            }
          }
        }
      `}
      render={props => (
        <div className="social-icon-container">
          <a href={`mailto:${props.wpgraphql.menu.footerInfo.email}?subject=New Email from Portfolio Site`}><FontAwesomeIcon icon={faEnvelope} /></a>
          <a href={`tel:${props.wpgraphql.menu.footerInfo.phone}`}><FontAwesomeIcon icon={faPhone} /></a>
          <a href={props.wpgraphql.menu.footerInfo.linkedin} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedin} /></a>
          <a href={props.wpgraphql.menu.footerInfo.github} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faGithub} /></a>
        </div>
      )}
    />
  );

};

export default SocialIcons;
