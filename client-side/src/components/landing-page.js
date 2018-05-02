import React from 'react';
import {connect} from 'react-redux';

export function LandingPage (props) {

    return (
            <div className="landing-page">
                <div className="landing-page__div-first">
                    <img className="landing-page__image" alt="Computer"></img>
                    <h2 className="landing-page__header">Make productivity simple</h2>
                </div>
                <div className="landing-page__div-second">
                    <h3 className="landing-page__secondary-header">What is flow tools?</h3>
                    <p className="landing-page__paragraph">Deadlines? <br/> Do you ever feel like you do not enough time to accomplish everything you want?<br/>
                    Flow tools is a productivity web application designed specifically for busy computer users who need to make the most of their time!</p>
                </div>
                <div className="landing-page__div-third">
                    <h3 className="landing-page__secondary-header">What can you do with flow tools?</h3>
                    <ol className="landing-page__list">Flow tools offers simple solutions to planning out your days. 
                        <li className="landing-page__list-item">Make simple to-do lists for each day.</li>
                        <li className="landing-page__list-item">View your tasks in weekly or monthly views.</li>
                        <li className="landing-page__list-item">Be reminded of the tasks past due or due for the current day.</li>
                        <li className="landing-page__list-item">Access various widgets designed to improve your productivity, such as a pomodoro timer.</li>
                    </ol>
                    <p className="landing-page__paragraph">Signing up is free! <a href="/login">Create an account</a> and explore what flow tools has to offer now!</p>
                </div>
            </div>
        )

}

const mapStateToProps = state => ({
    loggedIn: state.auth.userId !== null
})

export default (connect(mapStateToProps)(LandingPage))
