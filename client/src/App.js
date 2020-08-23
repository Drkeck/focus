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
import Homepage from './pages/Homepage';
import Header from './components/Header';
import Main from './components/Main';



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
      <>
     <Header></Header>
     <Navbar></Navbar>
     <Main></Main>
          <Switch>
            
          <Route exact path='/' component={Homepage} />
            <Route exact path='/LoginForm' component={Login} />
            <Route exact path='/SignupForm' component={Signup} />
          <Route exact path='/messages' component={Messenger} />
        
          </Switch>
          
        </>
        
          
          
        
        
      </Router>
      
    </ApolloProvider>
    

  
    
    
    
    
  );
}

export default App;