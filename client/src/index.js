import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

// Import css file from bushido-strap for global style overhaul
import "bushido-strap/css/main.css";

// Keep this puppy here for later!
import * as serviceWorker from "./serviceWorker";

import { BrowserRouter as Router } from "react-router-dom";

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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
