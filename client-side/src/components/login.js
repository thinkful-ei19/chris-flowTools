import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import {login} from '../actions/auth';
import LoginForm from './login-form';
import requiresLogin from './requires-login';
import {Link, Redirect} from 'react-router-dom';

export function Login (props) {

    if (props.loggedIn) {
        return <Redirect to="/calendar" />
    }

    function onSubmit(values) {
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
