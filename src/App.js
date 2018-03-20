import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom'
import Item from './pages/Item.js'
import Popup from './pages/Popup.js'
import Dashboard from './pages/Dashboard.js'
import Login from './pages/Login.js'
import Page from './pages/Page.js'
import Auth from './store/AuthStore.js'
import Store from './store/Store.js'

const prod = process.env.REACT_APP_BUILD;

const paths = {
  main: prod ? '/system/' : '/',
  dashboard:  prod ? '/system/dashboard/' : '/dashboard',
  banner:  prod ? '/system/banner/' : '/banner',
  popup:  prod ? '/system/popup/' : '/popup',
  page:  prod ? '/system/page/' : '/page'
}

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
        <Switch>
          <Route path={paths.main} exact component={Login}/>
          <PrivateRoute path={paths.dashboard} component={Dashboard}/>
          <Route path={paths.banner} component={Item}/>
          <Route path={paths.popup} component={Popup}/>
          <Route path={paths.page} component={Page}/>
          <Route path='*' exact component={() => (<div>404<p>NOT FOUND</p></div>)} />
        </Switch>
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
        pathname: '/',
        state: { from: props.location }
      }} />)
  )} />
)


export default App;
