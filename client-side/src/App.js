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
import Pomodoro from './components/windows/pomodoro/pomodoro-draggable';

export class App extends Component {

  render() {
    let baseJSX = [];
    let youtube;
    let pomodoro;
    if (this.props.youtube.on) {
        // baseJSX.push(<div key={0} className="youtube"><Youtube/></div>)
        youtube = (<div key={0} className="youtube"><Youtube/></div>)
    }
    if (this.props.pomodoro.on) {
      // baseJSX.push(<div key={1} className="pomodoro"><Pomodoro/></div>)
      pomodoro = (<div key={1} className="pomodoro"><Pomodoro/></div>)
    }

    baseJSX.push(
      <div key={2} className="app">
        <Nav />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/calendar" component={Main} />
        <Route exact path="/weekly" component={WeeklyView} />
        <Route exact path="/tasks" component={Tasks} />
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/signup" component={Footer} />
        <Route exact path="/login" component={Footer} />
        <Route exact path="/calendar" component={Footer} />
        <Route exact path="/weekly" component={Footer} />
        <Route exact path="/tasks" component={Footer} />
        <Route exact path="/settings" component={Footer} />

        <Route exact path="/" component={LandingPage} />
      </div>
    )

    return (
      <main>
      {youtube}
      {pomodoro}
      {baseJSX}
      </main>
    );
  }
}
const mapStateToProps = state => {
  return {
    currentTab: state.tasks.currentTab,
    youtube: {
      on: state.widgets.youtube.on,
      minimized: state.widgets.youtube.minimized,
    },
    pomodoro: {
      on: state.widgets.pomodoro.on,
      minimized: state.widgets.pomodoro.minimized,
    }
  }
}


export default withRouter(connect(mapStateToProps)(App))