import React, { Component } from 'react';
import {Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import LandingPage from './components/landing-page';
import Signup from './components/signup';
import Login from './components/login';
import Nav from './components/nav';
import Main from './components/main';
import WeeklyView from './components/weeklyview';
import Footer from './components/footer';
import Tasks from './components/tasks';
import Settings from './components/settings';
import Youtube from './components/windows/youtube/youtube-draggable';

export class App extends Component {

  render() {
    let baseJSX = []
    if (this.props.youtube.on) {
        baseJSX.push(<div key={0} className="youtube"><Youtube/></div>)
    }

    baseJSX.push(
      <div key={1} className="app">
        <Nav />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/calendar" component={Main} />
        <Route exact path="/weekly" component={WeeklyView} />
        <Route exact path="/tasks" component={Tasks} />
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/" component={LandingPage} />
        <Footer />
      </div>
    )

    return (
      <div>
      {baseJSX}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    youtube: {
      on: state.widgets.youtube.on,
      minimized: state.widgets.youtube.minimized,
      currentTab: state.tasks.currentTab
    }
  }
}


export default withRouter(connect(mapStateToProps)(App))