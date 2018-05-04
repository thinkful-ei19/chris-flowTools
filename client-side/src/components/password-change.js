import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import {changePassword} from '../actions/users';

// Notice this import of Input component;

class PasswordChange extends React.Component {

    render() {

        const bindThis = this;
        function updateThis(value) {
            if (value.newPassword === value.repeatNewPassword) {
                return bindThis.props.dispatch(changePassword(bindThis.props.userId, value.newPassword))
            } else {
                alert('Passwords do not match!')
            }
        }

        return (
                <form className="settings__password__form"
                    onSubmit={this.props.handleSubmit(value =>{
                        updateThis(value)
                    })}
                >
                    <label htmlFor="newPassword">New Password</label>
                    <Field
                        placeholderText={this.props.placeholder}
                        autoFocus={false}
                        component={Input}
                        type="password"
                        name="newPassword"
                        id="newPassword"
                    />
                    <label htmlFor="repeatNewPassword">Repeat New Password</label>
                    <Field
                        className="settings__password__input"
                        placeholderText={this.props.placeholder}
                        autoFocus={false}
                        component={Input}
                        type="password"
                        name="repeatNewPassword"
                        id="repeatNewPassword"
                    />
                    <button
                        className="settings__password__form__button"
                        disabled={this.props.pristine || this.props.submitting}>
                        Submit
                    </button>
                </form>
        )
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.userId !== null,
    userId: state.auth.userId,
})

export default reduxForm({
    form: 'edit',
    onSubmitFail: (errors, dispatch) => dispatch(focus('edit', 'editNote'))
})(connect(mapStateToProps)(PasswordChange));
