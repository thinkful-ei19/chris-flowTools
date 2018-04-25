import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';
import Notifications from './notifications';
import moment from 'moment';
import {fetchProtectedData} from '../actions/users';
import {login} from './login';
import requiresLogin from './requires-login';
import {Link, Redirect} from 'react-router-dom';
import {selectMonth, selectYear} from '../actions/tasks'

import DaysRow from './daysRow';
import DateRows from './dateRows';

export class Main extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        console.log(this.props)
        this.props.dispatch(fetchProtectedData(this.props.userId));
    }

    render() {
        let currentMonth = this.props.selectedMonth;
        let currentYear = this.props.selectedYear;
        const bindThis = this;
        function increment() {
            currentMonth ++
            if (currentMonth > 12) {
                currentMonth = 1
                currentYear ++
                bindThis.props.dispatch(selectYear(currentYear))
            }
            if (currentMonth < 10) {
                currentMonth = '0' + currentMonth
            }
            bindThis.props.dispatch(selectMonth(currentMonth))
        }
        function decrement() {
            currentMonth --
            if (currentMonth < 1) {
                currentMonth = 12
                currentYear --
                bindThis.props.dispatch(selectYear(currentYear))
            }
            if (currentMonth < 10) {
                currentMonth = '0' + currentMonth
            }
            bindThis.props.dispatch(selectMonth(currentMonth))
        }
        const monthYear = moment(String(`${currentYear}-${currentMonth}`)).format('MMMM YYYY');

        if (this.props.selectedDate) {
            return <Redirect to='/tasks' />
        }
        else {
            return (
                <div className="main">
                    <Notifications />
                    <div className="main__right">
                        <button onClick={decrement} className="main__previous">&#8592;</button>
                        <h2 className="main__month">{monthYear}</h2>
                        <button onClick={increment} className="main__next">&#8594;</button>
                        <div className="main__calendar">
                            <DaysRow />
                            <DateRows />
                        </div>
                    </div>
                </div>
            )
        }
    }

}

const mapStateToProps = state => {
    return({
        userId: state.auth.userId,
        selectedDate: state.tasks.selectedDate,
        selectedMonth: state.tasks.selectedMonth,
        selectedYear: state.tasks.selectedYear
    })
}


export default requiresLogin()(connect(mapStateToProps)(Main));