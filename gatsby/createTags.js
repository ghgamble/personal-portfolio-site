const path = require(`path`);
module.exports = async ({ actions, graphql }) => {
  // Set up our query
  const GET_TAGS = `
    query GET_TAGS($first:Int) {
      wpgraphql {
        tags(first: $first) {
          pageInfo {
            endCursor
            hasNextPage
          }
          nodes {
            id
            tagId
            slug
          }
        }
      }
    }
  `;
  // Create a function for getting categories
  const { createPage } = actions;
  const allTags = [];
  const fetchTags = async variables =>
    await graphql(GET_TAGS, variables).then(({ data }) => {
      const {
        wpgraphql: {
          tags: {
            nodes,
            pageInfo: { hasNextPage, endCursor },
          },
        },
      } = data;
      nodes.map(tag => {
        allTags.push(tag)
      });
      if (hasNextPage) {
        return fetchTags({ first: variables.first, after: endCursor })
      }
      return allTags;
    })

  // Map over all the categories and call createPage
  await fetchTags({ first: 100, after: null }).then(allTags => {
    const tagTemplate = path.resolve(`./src/templates/tag.js`);
    allTags.map(tag => {
      console.log(`create tag: ${tag.slug}`)
      createPage({
        path: `portfolio/tag/${tag.slug}`,
        component: tagTemplate,
        context: tag
      })
    })
  })
}
