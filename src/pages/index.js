import React, { useEffect } from 'react';
import { graphql, StaticQuery } from 'gatsby';

import Layout from '../components/layout';
import '../styles/fonts.css';
import SEO from '../components/seo';
import HomeAbout from '../components/homeAbout';
import PortfolioItems from '../components/portfolioItems';
const IndexPage = () => {

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.hsforms.net/forms/v2.js';
    document.body.appendChild(script);

    script.addEventListener('load', () => {
      if(window.hbspt) {
        window.hbspt.forms.create({
          portalId: '4339035',
          formId: 'e5eac8b4-cb2c-4ec7-b1be-136d7e5e9886',
          target: '#hubspotForm'
        })
      }
    });
  });

  return (
    <StaticQuery
      query={graphql`
        {
          wpgraphql {
            pageBy(pageId: 323) {
              title(format: RENDERED)
              uri
              content(format: RENDERED)
            }
          }
        }
      `}
      render={props => (
        <Layout>
          <SEO title={props.wpgraphql.pageBy.title} />
          <HomeAbout />
          <PortfolioItems />
          <div id="hubspotForm"></div>
        </Layout>
      )}
    />
  );

};

export default IndexPage;
