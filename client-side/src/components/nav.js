import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {clearAuth} from '../actions/auth';
import {changeTab, unselectDate} from '../actions/tasks';

export class Nav extends React.Component {

    render() {
        const bindThis = this;

        function logout() {
            bindThis.props.dispatch(unselectDate())
            bindThis.props.dispatch(clearAuth())
        }

        function settings() {
            bindThis.props.dispatch(changeTab('settings'));
        }

        function calendar() {
            bindThis.props.dispatch(changeTab('calendar'));
        }

        if (this.props.loggedIn) {
            return (
            <nav className="nav">
                <h1 className="nav__h1">Flow Tools</h1>
                <ul className="nav__ul">
                    <li className="nav__ul__li"><a onClick={calendar} className="nav__ul__li__button">Calendar</a></li>
                    <li className="nav__ul__li"><a onClick={settings} className="nav__ul__li__button">Settings</a></li>
                    <li className="nav__ul__li"><a onClick={logout} href="/" className="nav__ul__li__button">Logout</a></li>
                </ul>
            </nav>
            )
        } else {
            return (
                <nav className="nav">
                    <h1 className="nav__h1">Flow Tools</h1>
                    <ul className="nav__ul">
                        <li className="nav__ul__li"><a href="/login" className="nav__ul__li__button">Login</a></li>
                        <li className="nav__ul__li"><a href="/signup" className="nav__ul__li__button">Signup</a></li>
                    </ul>
                </nav>
            )
        }
    }

}

const mapStateToProps = state => ({
    loggedIn: state.auth.userId !== null
})

export default withRouter(connect(mapStateToProps)(Nav))