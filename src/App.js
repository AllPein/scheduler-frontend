import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import {ApolloClient} from 'apollo-boost';
import { Route, Redirect, Switch } from 'react-router-dom';
import { Home, Auth } from './pages/index';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = createHttpLink({
  uri: 'https://2197dc90.ngrok.io/'
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

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});


const App = () => {
  const loggedIn = false;

  return (
    <div className="wrapper">
      <ApolloProvider client={client}>
        <Switch>
            <Route
              path={["/login", "/register"]}
              render={() => (!loggedIn ? <Auth />  : <Redirect to="/schedule" />)}
            />
            <Route
              path="/"  
              render={() => (loggedIn ? <Home /> : <Redirect to="/login" />)}
            />
          </Switch>
      </ApolloProvider>
    </div>
    
  );
}

export default App;