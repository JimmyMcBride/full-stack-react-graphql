// We need ApolloServer to server up our GQL database
// We need gql so that we can write our queries out
const { ApolloServer, gql, PubSub } = require("apollo-server");

// typeDefs is where we define our query types
const typeDefs = gql`
  type Query {
    hello(name: String!): String!
    users: [User!]!
  }
  type Error {
    field: String!
    message: String!
  }
  type User {
    id: ID!
    username: String
    posts: [Post]
    firstLetterOfUserName: String
  }
  type Post {
    id: ID!
    title: String!
    body: String!
  }
  type RegisterResponse {
    errors: [Error]
    users: [User!]!
  }
  input UserCreds {
    id: ID!
    username: String!
    password: String!
    age: Int
  }
  type Mutation {
    register(creds: UserCreds!): RegisterResponse!
    login(creds: UserCreds!): String!
  }
  type Subscription {
    newUser: User!
  }
`;

const NEW_USER = "NEW_USER";

/* resolvers is where we can essentially seed information 
that we defined in our typeDefs */
const resolvers = {
  Subscription: {
    newUser: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(NEW_USER)
    }
  },
  User: {
    firstLetterOfUserName: parent => {
      return parent.username ? parent.username[0] : null;
    },
    username: parent => parent.username
  },
  Query: {
    hello: (parent, { name }) => {
      return `Hello, ${name}!`;
    },
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
      },
      {
        id: 4
      }
    ]
  },
  Mutation: {
    login: async (parent, { creds: { username } }, context, info) => {
      console.log(context);
      return username;
    },
    register: (_, { creds: { id, username } }, { pubsub }) => {
      const user = {
        id,
        username
      };
      pubsub.publish(NEW_USER, {
        newUser: user
      });
      return {
        errors: [
          {
            field: "username",
            message: "Not formated properly."
          }
        ],
        users: [
          // {
          //   id: 1,
          //   username: "FireNinja"
          // }
          user
        ]
      };
    }
  }
};

const pubsub = new PubSub();

// Now we need to create an instance of our Apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (req, res) => ({ req, res, pubsub })
});

// Finally we listen to what our server has to say!
server
  .listen()
  .then(({ url }) => console.log(`The server is running on ${url}`));
