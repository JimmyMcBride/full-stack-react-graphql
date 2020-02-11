// We need ApolloServer to server up our GQL database
// We need gql so that we can write our queries out
const { ApolloServer, gql } = require("apollo-server");

// typeDefs is where we define our query types
const typeDefs = gql`
  type Query {
    hello: String!
    users: [User!]!
  }
  type User {
    id: ID!
    username: String!
    posts: [Post!]
  }
  type Post {
    id: ID!
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
            title: "My Cool Hammer",
            body: "Can't touch this!"
          },
          {
            id: 2,
            title: "Madonna",
            body: "Papa don't preach, I'm keeping my Apollo server!"
          }
        ]
      },
      {
        id: 2,
        username: "BillyTheKid",
        posts: [
          {
            id: 1,
            title: "Fergalicious",
            body:
              "You can look at my data, but you can't touch it! You don't want no drama. No, no, no drama."
          }
        ]
      },
      {
        id: 3,
        username: "GeorgieBoi"
      }
    ]
  }
};

// Now we need to create an instance of our Apollo server
const server = new ApolloServer({ typeDefs, resolvers });

// Finally we listen to what our server has to say!
server
  .listen()
  .then(({ url }) => console.log(`The server is running on ${url}`));
