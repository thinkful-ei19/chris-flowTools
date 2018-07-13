import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {API_BASE_URL} from '../config';
import {login} from '../actions/auth';

import imageOffice from '../styles/images/office.jpg';

import svgCalendar from '../styles/images/SVG/calendar.svg';
import svgMusic from '../styles/images/SVG/music.svg';
import svgAlarm from '../styles/images/SVG/alarm.svg';
import svgFiletext from '../styles/images/SVG/filetext.svg';

import imageCalendar from '../styles/images/calendar.jpg';
import imageWidgets from '../styles/images/widgets.jpg';

export class LandingPage extends React.Component {

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    componentDidMount() {
        console.log('run');
        fetch(`${API_BASE_URL}/wake-up`, {
            method: 'GET', 
            headers: {
                'Accept': 'application/json',
              }
        })
        .then(res => console.log('Sent artbitrary get request to heroku server to wake it up...', res)).catch(err => {});        
    }

    render() {
        if (this.props.loggedIn) {
            return <Redirect to="/calendar" />
        }
        let bindThis = this;
        function loginDemo() {
            return bindThis.props.dispatch(login("test", "test"))
        }

        return (
            <section className="landing-page">
                <div className="landing-page__cover">
                    <div className="landing-page__cover__overlay"></div>
                    <h2 className="landing-page__cover__header">Make your computer using experience as productive as possible!</h2>
                    <img className="landing-page__cover__image" src={imageOffice}/>
                </div>
                <div className="landing-page__about">
                    <div className="landing-page__about__first">
                        <div className="landing-page__about__first__left">
                            <h3 className="landing-page__about__first__header">Intuitive Planning</h3>
                            <p className="landing-page__about__first__description">
                            Flow Tools offers a custom-built calendar specifically for tracking daily tasks!
                            Numbers are color-coded based off their due status. Included with the calendar is
                            a task tracker which shows both overdue tasks in red as well as tasks due on the current day.
                            </p>
                        </div>
                        <div className="landing-page__about__first__right">
                            <img src={imageCalendar} className="landing-page__about__first__image" />
                        </div>
                    </div>
                    <div className="landing-page__about__second">
                        <div className="landing-page__about__second__left">
                            <img src={imageWidgets} className="landing-page__about__second__image" />
                        </div>
                        <div className="landing-page__about__second__right">
                            <h3 className="landing-page__about__second__header">Daily Task Tracking</h3>
                            <p className="landing-page__about__second__description">
                            Clicking on a calendar day will bring you to a dedicated task tracker for that day!
                            </p>
                            <h3 className="landing-page__about__second__header">Helpful Widgets</h3>
                            <p className="landing-page__about__second__description">
                            Minimum youtube access for music and specific tutorials? No problem! Need a pomodoro timer? Flow tools also has that!
                            These windows are draggable and can be repositioned anywhere inside the application!
                            </p>
                        </div>
                    </div>
                    <div className="landing-page__about__third">
                        <a onClick={loginDemo} className="landing-page__about__third__demo-button">Try a free demo!</a>
                    </div>
                </div>
            </section>
            )
    }

}

const mapStateToProps = state => ({
    loggedIn: state.auth.userId !== null
})

export default (connect(mapStateToProps)(LandingPage))
