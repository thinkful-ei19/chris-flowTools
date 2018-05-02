import React, { Component } from 'react';
import {connect} from 'react-redux';

export class PomodoroApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            on: false,
            status: 'pomodoro',
            minutes: 25,
            seconds: 0,
            restMinutes: 5,
            restSeconds: 0,
            count: 0
        }
        
        this.start = this.start.bind(this);
        this.rest = this.rest.bind(this);
    }

    start() {
        const bindThis = this;
        this.setState({status: 'pomodoro', on: true})
        this.interval = setInterval(function(){
            if (bindThis.state.seconds >= 1) {
                bindThis.setState({
                    seconds: (bindThis.state.seconds - 1)
                })
            } else {
                bindThis.setState({
                    seconds: 59,
                    minutes: (bindThis.state.minutes - 1)
                })
            }
            if (bindThis.state.minutes < 0) {
                bindThis.setState({minutes: 25, seconds: 0, on: false})
                clearInterval(bindThis.interval);
                alert('Pomodoro ended, you should take a rest.')
            }
        },1000)
    }

    rest() {
        const bindThis = this;
        this.setState({status: 'rest', on: true})
        this.interval = setInterval(function(){
            if (bindThis.state.restSeconds >= 1) {
                bindThis.setState({
                    restSeconds: (bindThis.state.restSeconds - 1)
                })
            } else {
                bindThis.setState({
                    restSeconds: 59,
                    restMinutes: (bindThis.state.restMinutes - 1)
                })
            }
            if (bindThis.state.restMinutes < 0) {
                bindThis.setState({restMinutes: 5, restSeconds: 0, on: false})
                clearInterval(bindThis.interval);
                alert('Rest ended, you should get back to work.')
            }
        },1000)
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }    

    render() {
        let minutes;
        let seconds;
        if (this.state.status === 'pomodoro') {

            if (this.state.minutes <= 9) {
                minutes = '0' + String(this.state.minutes)
            } else {
                minutes = String(this.state.minutes);
            }
            if (this.state.seconds <= 9) {
                seconds = '0' + String(this.state.seconds);
            } else {
                seconds = this.state.seconds;
            }
        } else if (this.state.status === 'rest') {
            if (this.state.restMinutes <= 9) {
                minutes = '0' + String(this.state.restMinutes)
            } else {
                minutes = String(this.state.restMinutes);
            }
            if (this.state.restSeconds <= 9) {
                seconds = '0' + String(this.state.restSeconds);
            } else {
                seconds = this.state.restSeconds;
            }

        }

        if (this.state.on === false) {
            return (
                <div className="pomodoro__main">
                    <div className="pomodoro__options">
                        <button onClick={this.start} className="pomodoro__options__start">Start</button>
                        <button onClick={this.rest} className="pomodoro__options__rest">Rest</button>
                    </div>
                </div>
                );
        } else {
            return (
                <div className="pomodoro__main">
                    <div className="pomodoro__clock">
                        <div className="pomodoro__clock__minutes">{minutes}:</div>
                        <div className="pomodoro__clock__seconds">{seconds}</div>
                    </div>
                </div>
                );
        }

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