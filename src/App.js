import React from 'react';
import { ApolloProvider, useLazyQuery } from '@apollo/react-hooks';
import {ApolloClient} from 'apollo-boost';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import AppRouter  from './AppRouter';



const httpLink = createHttpLink({
  uri: 'https://58fdd0fd.ngrok.io/'
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
      'Access-Control-Allow-Origin': '*'
    }
  }
});

const cache = new InMemoryCache();
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  resolvers: {}
});


cache.writeData({
  data: {
    loggedIn: !!localStorage.getItem("token"),
    user: {
      __typename: 'User',
      username: '',
      email: ''
    }
  },
});


const App = () => {
  return (
    <div className="wrapper">
      <ApolloProvider client={client}>
        <AppRouter client={client} />
      </ApolloProvider>
    </div>
    
  );
}

export default App;