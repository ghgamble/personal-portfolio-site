import React from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';

import { createLocalLink } from '../utils';

const MAIN_MENU_QUERY = graphql`
  query GET_MENU_ITEMS {
    wpgraphql {
      menuItems(where: {location: PRIMARY}) {
          nodes {
            id
            url
            label
          }
      }
    }
  }
`;

const MainMenu = props => {
  return (
    <StaticQuery
      query={MAIN_MENU_QUERY}
      render={({
        wpgraphql: {
          menuItems: { nodes: menu }
        }
      }) => {
        return (
          <div>
            <nav className="main-menu">
              <ul>
                {menu.map(item => (
                  <li key={item.id}><Link to={createLocalLink(item.url)}>{item.label}</Link></li>
                ))}
              </ul>
            </nav>
          </div>
        )
      }}
    />
  );
}

export default MainMenu;
