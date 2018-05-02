import React, { Component } from 'react';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom';

export class PomodoroApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            minutes: 25,
            seconds: 0
        }
    }


    render() {
        return (
            <div className="pomodoro__main">
                Placeholder
            </div>
            );
    }
}

const mapStateToProps = state => {
    return {
      pomodoro: {
        on: state.widgets.pomodoro.on,
        minimized: state.widgets.pomodoro.minimized
      }
    }
  }
    
export default connect(mapStateToProps)(PomodoroApp)