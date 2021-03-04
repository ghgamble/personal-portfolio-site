const path = require(`path`);
module.exports = async ({ actions, graphql }) => {
  // Set up our query
  const GET_CONTACT_PAGE = `
    query GET_CONTACT_PAGE($first:Int $after:String) {
      wpgraphql {
        pages(
          first: $first
          after: $after
          where: {
            parent: null
            id: 301
          }
        ) {
          pageInfo {
            endCursor
            hasNextPage
          }
          nodes {
            id
            uri
            pageId
            title
          }
        }
      }
    }
  `;
  // Create a function for getting pages
  const { createPage } = actions;
  const allPages = [];
  const fetchPages = async variables =>
    await graphql(GET_CONTACT_PAGE, variables).then(({ data }) => {
      const {
        wpgraphql: {
          pages: {
            nodes,
            pageInfo: { hasNextPage, endCursor },
          },
        },
      } = data;
      nodes.map(page => {
        allPages.push(page)
      });
      if (hasNextPage) {
        return fetchPages({ first: variables.first, after: endCursor })
      }
      return allPages;
    })

  // Map over all the pages and call createPage
  await fetchPages({ first: 100, after: null }).then(allPages => {
    const pageTemplate = path.resolve(`./src/templates/contact.js`);
    allPages.map(page => {
      console.log(page.isFrontPage);
      console.log(`create page: ${page.uri}`)
      createPage({
        path: `${page.uri}`,
        component: pageTemplate,
        context: page
      })
    })
  })
}
