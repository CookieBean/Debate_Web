import React from 'react';
import './App.css';
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom"; 
import register from './register'
import info from './info'
import debate from './debate'

function Menu() {
  return (
    <Router>
      <div className="menubar">
        <ul>
          <li>
            <Link to="/register">
              Home
            </Link>
          </li>
          <li>
            <a herf="#" id="current">Products</a>
            <ul>
              <li><a herf="#">Sliders</a></li>
              <li><a herf="#">Gliders</a></li>
              <li><a href="https://reactjs.org" target="_blank">Apps</a></li>
              <li><a herf="#">Extensions</a></li>
            </ul>
          </li>
          <li><a herf="#">Company</a></li>
          <li><a herf="#">Address</a></li>
          <li><Link to="/info">Information</Link></li>
          <li><Link to="chat">Debate</Link></li>
        </ul>
      </div>
      <main>
        <Switch>
          <Route exact path="/register" component={register} />
          <Route exact path="/" component={info} />
          <Route exact path="/info" component={info} />
          <Route exact path="/debate" render={() => <chat />} />
        </Switch>
      </main>
    </Router>
  );
}

export default Menu;
