import React from 'react';
import {connect} from 'react-redux';

import imageNotifications from '../styles/images/notifications.jpg';
import imageCalendar from '../styles/images/calendar.jpg';
import imageWidgets from '../styles/images/widgets.jpg';
import imageTasks from '../styles/images/tasks.jpg';
import imageHeadWay from '../styles/images/headway.jpg';

import svgCalendar from '../styles/images/SVG/calendar.svg';
import svgMusic from '../styles/images/SVG/music.svg';
import svgAlarm from '../styles/images/SVG/alarm.svg';
import svgFiletext from '../styles/images/SVG/filetext.svg';

export class LandingPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentTab: 0,
            clicked: false
        }
    }

    changeTab() {
        if (this.state.currentTab < 4) {
            this.setState({currentTab: this.state.currentTab + 1});
        } else {
            this.setState({currentTab: 0});
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {

        let bindThis = this;
        if (this.interval) {
            clearInterval(this.interval);
        }
        if (!this.state.clicked) {
            this.interval = setInterval(function() {
                bindThis.changeTab();
            }, 5000)
        }

        let tab;

        if (this.state.currentTab < 0) {
            this.setState({currentTab: 4})
        } else if (this.state.currentTab > 4) {
            this.setState({currentTab: 0});
        }

        if (this.state.currentTab === 0) {
            tab = (
                <div>
                    <img src={imageHeadWay} className="landing-page__main__image landing-page__main__image__0" alt="Computer"></img>
                    <h2 className="landing-page__main__header">Make productivity simple</h2>
                </div>
            )
        } else if (this.state.currentTab === 1) {
            tab = (
                <div>
                    <img src={imageCalendar} className="landing-page__main__image landing-page__main__image__1" alt="Computer"></img>
                    <h2 className="landing-page__main__header">Click-and-go Simple Calendars</h2>
                </div>
            )
        } else if (this.state.currentTab === 2) {
            tab = (
                <div>
                    <img src={imageTasks} className="landing-page__main__image landing-page__main__image__2" alt="Computer"></img>
                    <h2 className="landing-page__main__header">Planning is only a few clicks away</h2>
                </div>
            )
        } else if (this.state.currentTab === 3) {
            tab = (
                <div>
                    <img src={imageNotifications} className="landing-page__main__image landing-page__main__image__3" alt="Computer"></img>
                    <h2 className="landing-page__main__header">Never forget anything anymore</h2>
                </div>
            )
        } else if (this.state.currentTab === 4) {
            tab = (
                <div>
                    <img src={imageWidgets} className="landing-page__main__image landing-page__main__image__4" alt="Computer"></img>
                    <h2 className="landing-page__main__header">Productivity should be enjoyable</h2>
                </div>
            )
        }

        return (
            <div>
                <div className="landing-page">
                    <div className="landing-page__main">
                        {/* <a onClick={() => this.setState({currentTab: this.state.currentTab - 1, clicked: true})}  className="landing-page__main__left-button">&#8592;</a> */}
                        {tab}
                        {/* <a onClick={() => this.setState({currentTab: this.state.currentTab + 1, clicked: true})} className="landing-page__main__right-button">&#8594;</a> */}
                    </div>
                    <div className="landing-page__tabs">
                        <ul className="landing-page__tabs__ul">
                            <li onClick={() => this.setState({currentTab: 1, clicked: true})} className="landing-page__tabs__li">
                                <a className="landing-page__tabs__li__select">
                                    <img className="landing-page__tabs__li__image" src={svgCalendar} alt="Calendar"></img>
                                    <span className="landing-page__tabs__li__text">Intuitively Simple Calendars</span>
                                </a>
                            </li>
                            <li onClick={() => this.setState({currentTab: 2, clicked: true})} className="landing-page__tabs__li">
                                <a  className="landing-page__tabs__li__select">
                                    <img className="landing-page__tabs__li__image" src={svgFiletext} alt="Calendar"></img>
                                    <span className="landing-page__tabs__li__text">Fast-tracked Planning</span>
                                </a>
                            </li>
                            <li onClick={() => this.setState({currentTab: 3, clicked: true})} className="landing-page__tabs__li">
                                <a  className="landing-page__tabs__li__select">
                                    <img className="landing-page__tabs__li__image" src={svgAlarm} alt="Calendar"></img>
                                    <span className="landing-page__tabs__li__text">Responsive Notifications</span>
                                </a>
                            </li>
                            <li onClick={() => this.setState({currentTab: 4, clicked: true})} className="landing-page__tabs__li">
                                <a className="landing-page__tabs__li__select">
                                    <img className="landing-page__tabs__li__image" src={svgMusic} alt="Calendar"></img>
                                    <span className="landing-page__tabs__li__text">Excitingly Productive Widgets</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="signup-now">
                    <p className="signup-now__message">Sign up now! <a href="/signup">Create a new account</a></p>
                </div>
            </div>
            )
    }

}

const mapStateToProps = state => ({
    loggedIn: state.auth.userId !== null
})

export default (connect(mapStateToProps)(LandingPage))
