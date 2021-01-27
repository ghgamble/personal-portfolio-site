import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
// import Comments from '../components/comments';

const Post = props => {
  const {
      data: {
        wpgraphql: { post },
      },
  } = props;

  const { title, content, postProjectUrl, author, categories, tags } = post;
  return (
    <Layout>
      <SEO title={title} />
      <h1>{title}</h1>
      <ul className="meta">
        <li>Author: <Link to={`/portfolio/user/${author.node.slug}`}>{author.node.name}</Link></li>
        {` // `}
        <li>
          Categories:
          <ul>
            {categories.nodes.map(cat => (
              <li><Link to={`/portfolio/category/${cat.slug}`}>{cat.name}</Link></li>
            ))}
          </ul>
        </li>
        {` // `}
        <li>
          Tags:
          <ul>
            {tags.nodes.map(tag => (
              <li><Link to={`/portfolio/tag/${tag.slug}`}>{tag.name}</Link></li>
            ))}
          </ul>
        </li>
      </ul>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      {typeof postProjectUrl.projectLink === 'string' && <a target="_blank" rel="noopener noreferrer" href={postProjectUrl.projectLink}>Project</a>}
    </Layout>
  );
}

export default Post;

export const pageQuery = graphql`
  query GET_POST($id: ID!) {
    wpgraphql {
      post(id: $id) {
        title
        content
        uri
        postProjectUrl {
          projectLink
        }
        author {
          node {
            name
            slug
          }
        }
        categories {
          nodes {
            slug
            name
          }
        }
        tags {
          nodes {
            slug
            name
          }
        }
        comments {
          nodes {
            author {
              node {
                ... on WPgraphql_CommentAuthor {
                  id
                  email
                  name
                }
              }
            }
            date
            content(format: RENDERED)
          }
        }
      }
    }
  }
`;
