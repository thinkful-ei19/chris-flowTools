import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import {login} from '../actions/auth'

export class Login extends React.Component {
    constructor(props) {
        super(props)
    }

    onSubmit(values) {
        console.log(values);
        return this.props.dispatch(login(values.username, values.password))
    }

    render() {
        return (
            <div className="login">
                <form className="login__form"
                    onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
                >
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
                </form>
            </div>
        )
    }

}

export default reduxForm({
    form: 'login',
    onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(Login);
