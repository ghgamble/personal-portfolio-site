import { Link, graphql, StaticQuery } from 'gatsby';
import React from 'react';

import MainMenu from './mainMenu';
import BannerImage from './bannerImage';

const Header = ({ siteTitle }) => {
  return (
    <StaticQuery
      query={graphql`
        {
          wpgraphql {
            mediaItemBy(mediaItemId: 434) {
              title(format: RENDERED)
              id
              uri
              sourceUrl(size: LARGE)
              slug
            }
          }
        }
      `}
      render={props => (
        <>
          <BannerImage />
        </>
      )}
    />
  );

}

export default Header;
