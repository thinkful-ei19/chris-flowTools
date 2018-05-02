import React from 'react';
import {connect} from 'react-redux';
import imageDueTasks from '../styles/images/due-tasks.jpg'
import imageCalendar from '../styles/images/calendar.jpg'
import imageWidgets from '../styles/images/widgets.jpg'

export function LandingPage (props) {

    return (
            <div className="landing-page">
                <div className="landing-page__div-first">
                    <img className="landing-page__image" alt="Computer"></img>
                    <h2 className="landing-page__header">Make productivity simple</h2>
                </div>
                <div className="landing-page__div-second">
                    <h3 className="landing-page__secondary-header"></h3>
                    <p className="landing-page__paragraph"></p>
                </div>
                <div className="landing-page__div-third">
                    <ul className="landing-page__about">
                        <p className="landing-page__about__message">Made with busy computer users in mind!</p>
                        <li className="landing-page__about__li">
                        <p className="landing-page__about__li__paragraph">Gain access to a calendar in which you can manage your daily tasks.</p>
                        <img class="landing-page__about__li__image imageDueTasks" src={imageCalendar} alt="Calendar Tab"/>
                        </li>
                        <li className="landing-page__about__li">
                            <p className="landing-page__about__li__paragraph">Be alerted of past due tasks and tasks due on the current day.</p>
                            <img class="landing-page__about__li__image imageDueTasks" src={imageDueTasks} alt="Due Tasks Tab"/>
                        </li >
                        <li className="landing-page__about__li">
                        <p className="landing-page__about__li__paragraph">Gain access to multiple widgets to assist you in being productive.</p>
                        <img class="landing-page__about__li__image imageDueTasks" src={imageWidgets} alt="Calendar Tab"/>
                        </li>
                    </ul>
                </div>
                <div className="landing-page__div-fourth">
                    <h3 className="landing-page__secondary-header"></h3>
                    <ol className="landing-page__list"> 
                        {/* <li className="landing-page__list-item"></li>
                        <li className="landing-page__list-item"></li>
                        <li className="landing-page__list-item"></li>
                        <li className="landing-page__list-item"></li> */}
                    </ol>
                    <p className="landing-page__div-fourth__paragraph">Sign up now! <a href="/login">Create a new account</a></p>
                </div>
            </div>
        )

}

const mapStateToProps = state => ({
    loggedIn: state.auth.userId !== null
})

export default (connect(mapStateToProps)(LandingPage))
