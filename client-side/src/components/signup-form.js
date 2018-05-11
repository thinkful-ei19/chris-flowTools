import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import {signUp, login} from '../actions/auth'

class SignupForm extends React.Component {

    onSubmit(values) {
        return this.props.dispatch(signUp(values.username, values.password))
    }

    render() {

        let bindThis = this;
        function loginDemo() {
            return bindThis.props.dispatch(login("test", "test"))
        }

        return (
                <form className="signup__form"
                    onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
                >
                <h4 className="signup__header">Signup</h4>
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
                    <a href="#" onClick={loginDemo} className="free-demo">Log in with demo account</a>
                </form>
        )
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.userId !== null
})

export default reduxForm({
    form: 'signup',
    onSubmitFail: (errors, dispatch) => dispatch(focus('signup', 'username'))
})(connect(mapStateToProps)(SignupForm));
