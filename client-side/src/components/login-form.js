import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import {login} from '../actions/auth'
import {Link, Redirect} from 'react-router-dom';

class LoginForm extends React.Component {
    constructor(props) {
        super(props)
    }

    onSubmit(values) {
        return this.props.dispatch(login(values.username, values.password))
    }

    render() {

        return (
                <form className="login__form"
                    onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
                >
                    <h4 className="login__header">Login</h4>
                    <label className="login__label" htmlFor="username">Username</label>
                    {/* <input className="login__input"></input> */}
                    <Field
                        component={Input}
                        type="text"
                        name="username"
                        id="username"
                    />
                    <label className="login__label" htmlFor="password">Password</label>
                    {/* <input className="login__input"></input> */}
                    <Field
                        component={Input}
                        type="password"
                        name="password"
                        id="password"
                    />
                    <button
                        className="login__button"
                        disabled={this.props.pristine || this.props.submitting}>
                        Log in
                    </button>
                    <a href="/signup"
                    className="login__signup" >Sign up</a>
                </form>
        )
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.userId !== null
})

export default reduxForm({
    form: 'login',
    onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(connect(mapStateToProps)(LoginForm));
