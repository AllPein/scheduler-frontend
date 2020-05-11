import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import {ApolloClient} from 'apollo-boost';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import AppRouter  from './AppRouter';



const httpLink = createHttpLink({
  uri: 'https://todobackenddev.herokuapp.com/'
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
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