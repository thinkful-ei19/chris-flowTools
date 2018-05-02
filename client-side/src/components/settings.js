import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import requiresLogin from './requires-login';
import PasswordChange from './password-change';

export function Login (props) {
    console.log(props.currentTab)
    if (!props.loggedIn) {
        return <Redirect to="/login" />
    }
    if (props.currentTab === 'calendar') {
        return <Redirect to='/calendar' />
    } else if (props.currentTab === 'tasks') {
        return <Redirect to ='/tasks' />
    }

    return (
            <div className="settings">
                <div className="settings__password">
                    <h3 className="settings__password__header">
                        Change Password
                    </h3>
                    <PasswordChange />
                </div>
            </div>
        )

}

const mapStateToProps = state => ({
    loggedIn: state.auth.userId !== null,
    currentTab: state.tasks.currentTab
})

export default requiresLogin()(connect(mapStateToProps)(Login))
