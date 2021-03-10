import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';

import '../styles/portfolioItems.css';

const PortfolioItems = () => {
  return (
    <StaticQuery
      query={graphql`
        {
          wpgraphql {
            posts {
              nodes {
                uri
                id
                title(format: RENDERED)
                postProjectUrl {
                  fieldGroupName
                  projectLink
                }
                featuredImage {
                  node {
                    slug
                    uri
                    mediaItemUrl
                  }
                }
              }
            }
          }
        }
      `}
      render={props => (
        <div className="home-page-portfolio-container" id="portfolioSectionHome">
          {props.wpgraphql.posts.nodes.map(post => (
            <div className="single-portfolio-item">
              <Link to={post.postProjectUrl.projectLink} target="_blank"><img src={post.featuredImage.node.mediaItemUrl} alt={post.featuredImage.node.mediaItemUrl} /></Link>
            </div>
          ))}
        </div>
      )}
      />
  );
}

export default PortfolioItems;
