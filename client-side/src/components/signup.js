import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';
import {Field, reduxForm, focus} from 'redux-form';
import {Link, Redirect} from 'react-router-dom';
import SignupForm from './signup-form';

export function Signup (props) {

    if (props.loggedIn) {
        return <Redirect to="/calendar" />
    }

    return (
            <div className="signup">
                <SignupForm />
            </div>
        )

}

const mapStateToProps = state => ({
    loggedIn: state.auth.userId !== null
})

export default (connect(mapStateToProps)(Signup))