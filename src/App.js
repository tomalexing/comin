import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'
import Item from './pages/Item.js'
import Dashboard from './pages/Dashboard.js'
import Login from './pages/Login.js'
import Auth from './store/AuthStore.js'
import Store from './store/Store.js'



class App extends Component {
  async componentWillMount() {
    
    Auth.init();

    if (typeof window === 'undefined') return
    window.addEventListener('beforeunload', this.handleBeforeUnload)
  }

  componentWillUnmount() {
    if (typeof window === 'undefined') return
    window.removeEventListener('beforeunload', this.handleBeforeUnload)
  }

  handleBeforeUnload() {

  }

  render() {
    return(
      <Router>
      <div>
        <Route path="/banner" component={Item}/>
        <PrivateRoute path="/dashboard" component={Dashboard}/>
        <Route path="/" exact component={Login}/>
      </div>
    </Router>
    );
  }
}

const PrivateRoute =  ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    Auth.isAuthenticated ? (
       <Component {...rest}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }} />)
  )} />
)


export default App;
