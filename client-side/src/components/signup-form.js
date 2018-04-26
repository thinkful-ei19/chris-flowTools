import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import {login, signUp} from '../actions/auth'
import {Link, Redirect} from 'react-router-dom';

class SignupForm extends React.Component {
    constructor(props) {
        super(props)
    }

    onSubmit(values) {
        return this.props.dispatch(signUp(values.username, values.password))
    }

    render() {

        return (
                <form className="signup__form"
                    onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
                >
                <h4 className="signup__header">Signup Form</h4>
                    <label className="signup__label" htmlFor="username">Username</label>
                    {/* <input className="signup__input"></input> */}
                    <Field
                        component={Input}
                        type="text"
                        name="username"
                        id="username"
                    />
                    <label className="signup__label" htmlFor="password">Password</label>
                    {/* <input className="signup__input"></input> */}
                    <Field
                        component={Input}
                        type="password"
                        name="password"
                        id="password"
                    />
                    <button
                        className="signup__button"
                        disabled={this.props.pristine || this.props.submitting}>
                        Sign up
                    </button>
                    <a href="/login"
                    className="signup__login" >Return to Login</a>
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
})(connect(mapStateToProps)(SignupForm));
