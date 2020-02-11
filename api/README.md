# Starting your first GraphQL server!

### Step 1

`yarn init -y`

> Note: The -y tag just does a small and quick init of package.json that doesn't ask you any questions. Since this is just a small side project to learn, we don't need to waste time answering questions here.

### Step 2

**Install dependencies:**

`yarn add apollo-server graphql nodemon`

### Step 3

Change main in package.json to point and `src/index.js` instead of `index.js` && add start script in package.json:

```json
{
  "main": "src/index.js",
  "scripts": {
    "start": "nodemon src/index.js"
  }
}
```

### Step 4

**Add src folder and index.js inside it:**

`mkdir src && touch src/index.js`

### Step 5

We can now set up our basic server! Let's go into our index.js in our src folder and add the following:

```javascript
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
    hello: () => "Hello, World!"
  }
};

// Now we need to create an instance of our Apollo server
const server = new ApolloServer({ typeDefs, resolvers });

// Finally we listen to what our server has to say!
server
  .listen()
  .then(({ url }) => console.log(`The server is running on ${url}`));
```

### Step 6

`yarn start` and go to [localhost 4000](http://localhost:4000) in your browser and you should see the GraphQL playground now and should be able to successfully run:

```graphql
{
  hello
}
```

And get back:

```json
{
  "data": {
    "hello": "Hello, World!"
  }
}
```

## Congratulations!

You've officially got your first GraphQL server up and running! Now lets figure out how to access that database in our React app!
