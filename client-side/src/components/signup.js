import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
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