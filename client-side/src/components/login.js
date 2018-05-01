import React from 'react';
import {connect} from 'react-redux';
import {login} from '../actions/auth';
import LoginForm from './login-form';
import {Redirect} from 'react-router-dom';
import {changeTab} from '../actions/tasks';

export function Login (props) {

    if (props.loggedIn) {
        return <Redirect to="/calendar" />
    }

    function onSubmit(values) {
        this.props.dispatch(changeTab('calendar'))
        return this.props.dispatch(login(values.username, values.password))
    }

    return (
            <div className="login">
                <LoginForm />
            </div>
        )

}

const mapStateToProps = state => ({
    loggedIn: state.auth.userId !== null
})

export default (connect(mapStateToProps)(Login))
