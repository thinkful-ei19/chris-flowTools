import React from 'react';
import {connect} from 'react-redux';
import LoginForm from './login-form';
import {Redirect} from 'react-router-dom';

export function Login (props) {

    if (props.loggedIn) {
        return <Redirect to="/calendar" />
    }

    return (
        <div className="login">
            <LoginForm />
        </div>
    )
}

const mapStateToProps = state => ({
    loggedIn: state.auth.userId !== null,
})

export default (connect(mapStateToProps)(Login))
