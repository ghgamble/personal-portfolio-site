import React from 'react';
import { graphql } from 'gatsby';

const Post = props => {
  const {
      data: {
        wpgraphql: { post },
      },
  } = props;

  const { title, content, postProjectUrl } = post;
  return (
    <div>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      {typeof postProjectUrl.projectLink === 'string' && <a target="_blank" href={postProjectUrl.projectLink}>Project</a>}
    </div>
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
      }
    }
  }
`;
