import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

//components

import Messenger from './pages/messages';
import Login from './pages/LoginForm';
import Signup from './pages/SignupForm';
import Navbar from './components/Navbar';
import Room from './pages/Room';
import Cover from './components/Cover'

// Redux
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './utils/reducers';

const focus = createStore(reducer)

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
      <Provider store={focus}>
        <Router>
          <>
          <Navbar />
            <Switch>
              <Route exact path="/" component={Cover}/>
              <Route exact path='/LoginForm' component={Login} />
              <Route exact path='/SignupForm' component={Signup} />
              <Route exact path='/messages' component={Messenger} />
              <Route path='/create-room' component={Room} />
              {/* Add link to create room and use other room.ejs. Generate random id-link */}
            </Switch>
          </>
        </Router>
      </Provider>
    </ApolloProvider>
  );
}

export default App;