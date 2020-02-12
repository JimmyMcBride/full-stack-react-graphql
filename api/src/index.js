// We need ApolloServer to server up our GQL database
// We need gql so that we can write our queries out
const { ApolloServer, gql, PubSub } = require("apollo-server");

// typeDefs is where we define our query types
const typeDefs = gql`
  type Query {
    Hello(name: String!): String!
    Users: [User!]!
    User(id: ID!): User
    Posts: [Post]
    UserPosts(user_id: ID!): [Post]
    Post(id: ID!): Post!
  }
  type User {
    id: ID!
    username: String!
    posts: [Post!]
    firstLetterOfUserName: String
  }
  type Post {
    id: ID!
    title: String
    body: String
    author: User
  }
  type Error {
    field: String!
    message: String!
  }
  type RegisterResponse {
    Errors: [Error]
    Users: [User!]!
  }
  type PostResponse {
    Posts: [Post!]
  }
  input UserCreds {
    id: ID!
    username: String!
    password: String
    age: Int
  }
  type Mutation {
    register(creds: UserCreds!): RegisterResponse!
    login(creds: UserCreds!): String!
    addPost(id: ID!, title: String!, body: String!, author_id: ID!): Post!
  }
  type Subscription {
    newUser: User!
  }
`;

const NEW_USER = "NEW_USER";
const NEW_POST = "NEW_POST";

users = [
  {
    id: 1,
    username: "FireNinja"
  },
  {
    id: 2,
    username: "BillyTheKid"
  },
  {
    id: 3,
    username: "GeorgieBoi"
  }
];

POSTS = [
  {
    id: 1,
    title: "My Cool Hammer",
    body: "Can't touch this!",
    author: users[0]
  },
  {
    id: 2,
    title: "Madonna",
    body: "Papa don't preach, I'm keeping my Apollo server!",
    author: users[0]
  },
  {
    id: 3,
    title: "Fergalicious",
    body:
      "You can look at my data, but you can't touch it! You don't want no drama. No, no, no drama.",
    author: users[1]
  }
];

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
    username: parent => parent.username,
    id: parent => parent.id
  },
  Query: {
    Hello: (parent, { name }) => {
      return `Hello, ${name}!`;
    },
    Users: () => [...users],
    // User: (parent, { id }) => User.find(user => user.id === id)
    User: (parent, { id }) => users.find(user => user.id == id),
    Posts: () => POSTS,
    UserPosts: (_, { user_id }) =>
      POSTS.filter(post => post.author.id == user_id),
    Post: (_, { id }) => POSTS.find(post => post.id == id)
  },
  Mutation: {
    addPost: (_, { id, title, body, author_id }, { pubsub }) => {
      USER = users.find(user => user.id == author_id);
      const newPost = {
        id: id,
        title: title,
        body: body,
        author: USER
      };
      pubsub.publish(NEW_POST, {
        newPost: newPost
      });
      POSTS.push(newPost);
      console.log(POSTS);
      return newPost;
    },
    login: async (parent, { creds: { username } }, context, info) => {
      console.log(context);
      return username;
    },
    register: (_, { creds: { id, username } }, { pubsub }) => {
      const user = {
        id: id,
        username: username
      };
      users.push(user);
      pubsub.publish(NEW_USER, {
        newUser: user
      });
      return {
        Errors: [
          {
            field: "username",
            message: "Not formated properly."
          }
        ],
        Users: [...users]
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
