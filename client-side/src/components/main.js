import React from 'react';
import {connect} from 'react-redux';
import Notifications from './notifications';
import moment from 'moment';
import {fetchProtectedData} from '../actions/users';
import requiresLogin from './requires-login';
import {Redirect} from 'react-router-dom';
import {changeTab, selectMonth, selectYear} from '../actions/tasks';

import DaysRow from './daysRow';
import DateRows from './dateRows';

import backArrow from '../styles/images/PNG/002-back.png';
import nextArrow from '../styles/images/PNG/001-next.png';

export class Main extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            redirect: false
        }
    }

    componentDidMount() {
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

        function redirectToWeekly() {
            bindThis.props.dispatch(changeTab('weekly'))
            bindThis.setState({redirect: true})            
        }
        
        if (this.props.currentTab === 'settings') {
            return <Redirect to='/settings' />
        } else if (this.props.currentTab === 'tasks') {
            return <Redirect to='/tasks' />
        }

        if (this.state.redirect === true) {
            return <Redirect to='/weekly' />
        }
        else {
            return (
                <div className="main">
                    <Notifications />
                    <div className="main__right">
                    <a onClick={redirectToWeekly} className="main__toggleWeekly" >Toggle Weekly View</a>
                        <a className="main__previous"><img onClick={decrement} className="main__previous__button" src={backArrow}/></a>
                        <h2 className="main__month">{monthYear}</h2>
                        <a className="main__next"><img onClick={increment} className="main__next__button" src={nextArrow}/></a>
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
        selectedYear: state.tasks.selectedYear,
        currentTab: state.tasks.currentTab
    })
}


export default requiresLogin()(connect(mapStateToProps)(Main));