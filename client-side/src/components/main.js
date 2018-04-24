import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';
import Notifications from './notifications';
import moment from 'moment';
import {fetchProtectedData} from '../actions/users';
import {login} from './login';
import requiresLogin from './requires-login';

import DaysRow from './daysRow';
import DateRows from './dateRows';

export class Main extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        console.log(this)
        // this.props.dispatch(fetchProtectedData());
    }

    render() {
        const monthYear = moment().format('MMMM YYYY');

        return (
            <div className="main">
                <div className="main__notifications">
                    <Notifications />
                </div>
                <div className="main__right">
                    <button className="main__previous">Previous</button>
                    <h2 className="main__month">{monthYear}</h2>
                    <button className="main__next">Next</button>
                    <div className="main__calendar">
                        <DaysRow />
                        <DateRows />
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    console.log(state)
    return({
        userId: state.auth.userId
    })
}


export default requiresLogin()(connect(mapStateToProps)(Main));