import React, { useEffect } from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

const Contact = props => {
  const {
      data: {
        wpgraphql: { page },
      },
  } = props;

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

  const { title, content } = page;
  return (
    <Layout>
      <SEO title={title} />
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <div id="hubspotForm"></div>
    </Layout>
  );
}

export default Contact;
export const pageQuery = graphql`
  query GET_CONTACT_PAGE($id: ID!) {
    wpgraphql {
      page(id: $id) {
        title
        content
        uri
      }
    }
  }
`;
