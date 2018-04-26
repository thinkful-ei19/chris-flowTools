import React, { Component } from 'react';
import {Route, withRouter} from 'react-router-dom';
import Signup from './components/signup';
import Login from './components/login';
import Nav from './components/nav';
import Main from './components/main';
import Footer from './components/footer';
import Tasks from './components/tasks';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Nav />
        <Route exact path="/" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/calendar" component={Main} />
        <Route exact path="/tasks" component={Tasks} />
        <Footer />
      </div>
    );
  }
}

export default App;
