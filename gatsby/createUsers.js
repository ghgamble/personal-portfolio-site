const path = require(`path`);
module.exports = async ({ actions, graphql }) => {
  // Set up our query
  const GET_USERS = `
    query GET_USERS($first:Int) {
      wpgraphql {
        users(first: $first) {
          pageInfo {
            endCursor
            hasNextPage
          }
          nodes {
            id
            userId
            slug
          }
        }
      }
    }
  `;
  // Create a function for getting categories
  const { createPage } = actions;
  const allUsers = [];
  const fetchUsers = async variables =>
    await graphql(GET_USERS, variables).then(({ data }) => {
      const {
        wpgraphql: {
          users: {
            nodes,
            pageInfo: { hasNextPage, endCursor },
          },
        },
      } = data;
      nodes.map(user => {
        allUsers.push(user)
      });
      if (hasNextPage) {
        return fetchUsers({ first: variables.first, after: endCursor })
      }
      return allUsers;
    })

  // Map over all the categories and call createPage
  await fetchUsers({ first: 100, after: null }).then(allUsers => {
    const userTemplate = path.resolve(`./src/templates/user.js`);
    allUsers.map(user => {
      console.log(`create user: ${user.slug}`)
      createPage({
        path: `blog/user/${user.slug}`,
        component: userTemplate,
        context: user
      })
    })
  })
}
