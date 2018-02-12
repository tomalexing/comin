import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Item from './pages/Item.js'
import Dashboard from './pages/Dashboard.js'



class App extends Component {
  render() {
    return(
      <Router>
      <div>
        <div className="Layout-iframe">
          <Route path="/" component={Item}/>
        </div>
      </div>
    </Router>
    );
  }
}



export default App;
