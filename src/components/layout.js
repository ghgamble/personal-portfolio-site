/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import Header from './header';
import Footer from './footer';
import '../styles/layout.css';
import '../styles/styles.css';

const Layout = ({ children }) => {
  return (
    <StaticQuery
      query={graphql`
        {
          wpgraphql {
            generalSettings {
              title
              description
            }
          }
        }
      `}
      render={props => (
        <div id="site-content">
          <Header siteTitle={props.wpgraphql.generalSettings.title || `Title`} />
          <div>
            <div id="layout-wrapper">{children}</div>
            <Footer />
          </div>
        </div>
      )}
    />
  );
}

export default Layout;
