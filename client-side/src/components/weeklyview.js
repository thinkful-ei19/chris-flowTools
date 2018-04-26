import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import {fetchProtectedData} from '../actions/users';
import {login} from './login';
import requiresLogin from './requires-login';
import {Redirect} from 'react-router-dom';
import {selectMonth, selectYear, selectWeek} from '../actions/tasks'

import DaysRow from './daysRow-Weekly';

export class WeeklyView extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            redirect: false
        }
    }

    render() {
        const bindThis = this;
        function redirectToMonthly() {
            bindThis.setState({redirect: true})
        }

        if (this.state.redirect === true ) {
            return <Redirect to='/calendar' />
        }


        const currentYear = String(this.props.selectedYear);
        const currentMonth = String(this.props.selectedMonth)
        
        const maxDays = moment(`${currentMonth}`).daysInMonth()

        const currentDay = moment().format('DD');
        const monthYear = moment(String(`${currentYear}-${currentMonth}`)).format('MMMM YYYY');

        const firstDayOfMonth = moment(`${currentYear}-${currentMonth}`).startOf('month').format('e');
        const previousMonthDate = moment(`${currentYear}-${currentMonth}`).subtract(1, 'months').endOf('month').format('YYYY-MM-DD')
        const maxDaysPrevious = moment(`${previousMonthDate}`).daysInMonth();
        const previousMonth = previousMonthDate.slice(5, 7);

        let dateArray = [];
        //First Push the previous month's days
        let monthBuffer = 0;
        for (let i=maxDaysPrevious; i>maxDaysPrevious-firstDayOfMonth; i--) {
            monthBuffer ++;
            dateArray.push({
                value: `${currentYear}-${previousMonth}-${i}`,
                day: `${i}`,
                ref: 'previous'
            });
        }
        dateArray.reverse();

        //Push the amount of days in current month
        for (let i=1; i<=maxDays; i++) {
            if (i<10) {
                dateArray.push({value: `${currentYear}-${currentMonth}-0${i}`, day: `0${i}`, ref: 'current'})
            } else {
                dateArray.push({value: `${currentYear}-${currentMonth}-${i}`, day: `${i}`, ref: 'current'})
            }
        }

        //Push the days for the next month
        let nextMonth = String(Number(currentMonth) + 1);
        const remainingBlocks = 35 - dateArray.length;
        if (nextMonth < 10) {
            nextMonth = '0' + nextMonth;
        }
        for (let i=1; i<=remainingBlocks; i++) {
            dateArray.push(
            {
                value: `${currentYear}-${nextMonth}-0${i}`,
                day: `${i}`,
                ref: 'next'
            }
            )
        }
        //Force Stop at 35 blocks
        dateArray = dateArray.slice(0, 35);

        const currentDayValue = Number(monthBuffer) + Number(currentDay);
        const weekOne = dateArray.slice(0, 7)
        const weekTwo = dateArray.slice(7, 14)
        const weekThree = dateArray.slice(14, 21)
        const weekFour = dateArray.slice(21, 28)
        const weekFive = dateArray.slice(28, 35)

        if (!this.props.selectedWeek) {
            console.log(currentDayValue)
            if (currentDayValue <= 7) {
                bindThis.props.dispatch(selectWeek(1))
            } else if (currentDayValue <= 14) {
                bindThis.props.dispatch(selectWeek(2))
            } else if (currentDayValue <= 21) {
                bindThis.props.dispatch(selectWeek(3))
            } else if (currentDayValue <= 28) {
                bindThis.props.dispatch(selectWeek(4))
            } else if (currentDayValue <= 35) {
                bindThis.props.dispatch(selectWeek(5))
            }
        }

        function incrementWeek() {
            bindThis.props.dispatch(selectWeek('increment'))
        }

        function decrementWeek() {
            bindThis.props.dispatch(selectWeek('decrement'))
        }

        console.log(this)

        let renderSelectedWeek;
        if (this.props.selectedWeek === 1) {
            renderSelectedWeek = weekOne
        } else if (this.props.selectedWeek === 2) {
            renderSelectedWeek = weekTwo
        } else if (this.props.selectedWeek === 3) {
            renderSelectedWeek = weekThree
        } else if (this.props.selectedWeek === 4) {
            renderSelectedWeek = weekFour
        } else if (this.props.selectedWeek === 5) {
            renderSelectedWeek = weekFive
        } 

        console.log(this.props.selectedWeek)
        console.log(renderSelectedWeek)

        let buildJSX = [];
        renderSelectedWeek.forEach((day) => {
            buildJSX.push(
                <li key={day.value} className="weekly__li">
                    {day.value}
                </li>
            )
        })

        return (
            <div className="weekly">
                <a className="weekly__toggleMonthly" onClick={redirectToMonthly}>Return to Monthly View</a>
                <button onClick={decrementWeek} className="weekly__previous">&#8592;</button>
                        <h2 className="weekly__month">{monthYear}</h2>
                        <button onClick={incrementWeek} className="weekly__next">&#8594;</button>
                <ul className="weekly__ul" >
                    <DaysRow />
                    {buildJSX}
                </ul>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return({
        userId: state.auth.userId,
        selectedDate: state.tasks.selectedDate,
        selectedMonth: state.tasks.selectedMonth,
        selectedYear: state.tasks.selectedYear,
        selectedWeek: state.tasks.selectedWeek,
        notes: state.tasks.notes
    })
}


export default requiresLogin()(connect(mapStateToProps)(WeeklyView));