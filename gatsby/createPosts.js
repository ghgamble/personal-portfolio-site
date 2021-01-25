const path = require(`path`);
module.exports = async ({ actions, graphql }) => {
  // Set up our query
  const GET_POSTS = `
    query GET_POSTS($first:Int $after:String) {
      wpgraphql {
        posts(
          first: $first
          after: $after
        ) {
          pageInfo {
            endCursor
            hasNextPage
          }
          nodes {
            id
            uri
            postId
            title
            postProjectUrl {
              projectLink
            }
          }
        }
      }
    }
  `;
  // Create a function for getting posts
  const { createPage } = actions;
  const allPosts = [];
  const portfolioPages = [];
  let pageNumber = 0;
  const fetchPages = async variables =>
    await graphql(GET_POSTS, variables).then(({ data }) => {
      const {
        wpgraphql: {
          posts: {
            nodes,
            pageInfo: { hasNextPage, endCursor },
          },
        },
      } = data;

      const nodeIds = nodes.map(node => node.postId);
      const postsTemplate = path.resolve(`./src/templates/posts.js`);
      const postsPath = !variables.after ? `/portfolio/` : `/portfolio/page/${pageNumber}`;

      portfolioPages[pageNumber] = {
        path: postsPath,
        component: postsTemplate,
        context: {
          id: nodeIds,
          pageNumber: pageNumber,
          hasNextPage: hasNextPage
        },
        ids: nodeIds
      }

      nodes.map(post => {
        allPosts.push(post)
      });
      if (hasNextPage) {
        pageNumber++;
        return fetchPages({ first: 12, after: endCursor });
      }
      return allPosts;
    })

  // Map over all the pages and call createPage
  await fetchPages({ first: 12, after: null }).then(allPosts => {
    const postTemplate = path.resolve(`./src/templates/post.js`);

    portfolioPages.map(page => {
      console.log(`create post archive: ${page.path}`);
      createPage(page);
    })

    allPosts.map(post => {
      console.log(`create post: ${post.uri}`)
      createPage({
        path: `${post.uri}`,
        component: postTemplate,
        context: post
      })
    })
  })
}
