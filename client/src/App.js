import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Messenger from './pages/messages';
import Login from './pages/Login';
import './App.css';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  request: operation => {
    const token = localStorage.getItem('User_token');

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });
  },
  uri: '/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route exact path='/messages' component={Messenger} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
