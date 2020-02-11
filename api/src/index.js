// We need ApolloServer to server up our GQL database
// We need gql so that we can write our queries out
const { ApolloServer, gql } = require("apollo-server");

// typeDefs is where we define our query types
const typeDefs = gql`
  type Query {
    hello: String!
    users: [User!]!
    posts: [Post!]!
  }
  type User {
    id: ID!
    username: String!
    posts: [Post!]
  }
  type Post {
    id: ID!
    # author: User!
    title: String!
    body: String!
  }
`;

/* resolvers is where we can essentially seed information 
that we defined in our typeDefs */
const resolvers = {
  Query: {
    hello: () => "Hello, world!",
    users: () => [
      {
        id: 1,
        username: "FireNinja",
        posts: [
          {
            id: 1,
            // author: 1,
            title: "Title 1",
            body: "This is my body, don't touch it!"
          },
          {
            id: 2,
            // author: 1,
            title: "Title 2",
            body: "This is my body, don't touch it!"
          },
          {
            id: 3,
            // author: 1,
            title: "Title 3",
            body: "This is my body, don't touch it!"
          }
        ]
      },
      {
        id: 2,
        username: "BillyTheKid"
      },
      {
        id: 3,
        username: "GeorgieBoi"
      }
    ],
    posts: () => [
      {
        id: 1,
        author: 1,
        title: "Title 1",
        body: "This is my body, don't touch it!"
      },
      {
        id: 2,
        author: 1,
        title: "Title 2",
        body: "This is my body, don't touch it!"
      },
      {
        id: 3,
        author: 1,
        title: "Title 3",
        body: "This is my body, don't touch it!"
      }
    ]
  }
  // Users: {
  //   id: () => 1,
  //   username: () => "FireNinja"
  // }
};

// Now we need to create an instance of our Apollo server
const server = new ApolloServer({ typeDefs, resolvers });

// Finally we listen to what our server has to say!
server
  .listen()
  .then(({ url }) => console.log(`The server is running on ${url}`));
