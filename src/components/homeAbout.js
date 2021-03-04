import React, { useEffect } from 'react';
import { graphql, StaticQuery } from 'gatsby';

import '../styles/homeAbout.css';

const HomeAbout = () => {
  return (
    <StaticQuery
      query={graphql`
        {
          wpgraphql {
            pageBy(pageId: 323) {
              title(format: RENDERED)
              uri
              content(format: RENDERED)
              featuredImage {
                node {
                  uri
                  mediaItemUrl
                }
              }
            }
          }
        }
      `}
      render={props => (
        <div id="aboutSectionHome">
          <div class="container">
            <div class="image-stack">
              <div class="image-stack__item image-stack__item--top">
                <div className="content" dangerouslySetInnerHTML={{ __html: props.wpgraphql.pageBy.content }} />
              </div>
              <div class="image-stack__item image-stack__item--bottom">
                <img src={props.wpgraphql.pageBy.featuredImage.node.mediaItemUrl} alt="" />
              </div>
            </div>
          </div>
        </div>
      )}
    />
  );
}

export default HomeAbout;
