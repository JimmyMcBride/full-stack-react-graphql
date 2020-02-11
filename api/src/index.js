const { ApolloServer, gql } = require("apollo-server");

// We need ApolloServer to server up our GQL database
// We need gql so that we can write our queries out
const { ApolloServer, gql } = require("apollo-server");

// typeDefs is where we define our query types
const typeDefs = gql`
  type Query {
    hello: String!
  }
`;

/* resolvers is where we can essentially seed information 
that we defined in our typeDefs */
const resolvers = {
  Query: {
    hello: () => "Hello, world!"
  }
};

// Now we need to create an instance of our Apollo server
const server = new ApolloServer({ typeDefs, resolvers });

// Finally we listen to what our server has to say!
server
  .listen()
  .then(({ url }) => console.log(`The server is running on ${url}`));
