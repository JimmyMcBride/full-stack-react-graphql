# How To Use A GraphQL Database In Your React App

### Step 1

You need to bootstrap your React app first. You can use the regular create-react-app, but I'm going to boostrap this project with my bushido-lite template.

`create-react-app client --template bushido-lite`

### Step 2

Now we need to add our dependencies:

`yarn add react-graphql react-apollo graphql-tag apollo-boost`

### Step 3

Let's add our ApolloProvider and pass in our ApolloClient to our add. Inside `src/index.js` in your client directory add:

```javascript
/* 
We're going to need to pass our local GQL client to out ApolloProvider so we have access to our database throughout our app 
*/
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

// We need to point our ApolloClient to the right database
// In this instance, it's our localhost port 4000
const client = new ApolloClient({
  uri: "http://localhost:4000/"
});

// Now we need to wrap our app in our ApolloProvider
ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
);
```

### Step 4

At the top of `src/views/Dashboard/index.js` lets set up our query!

```javascript
// import Query component
// Anything inside our Query component will have access to the data from our query.
import { Query } from "react-apollo";
// We will need gql to pass our queries in an interpolated string
import gql from "graphql-tag";
```

Inside our React component, we can add:

```javascript
<Query
  query={gql`
    query {
      hello
    }
  `}
>
  {({ data }) => {
    console.log(data);
    return <p>{data?.hello}</p>;
  }}
</Query>
```

And it should return a p tag with "Hello, world!"

## Congratulations!

You just made you first full stack React + GraphQL implementation!!!
