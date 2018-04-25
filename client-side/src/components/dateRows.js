import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';
import moment from 'moment';
import {getTasks} from '../actions/tasks';

export class DateRows extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const currentYear = moment().format('YYYY');
        
        const currentMonth = String(this.props.selectedMonth)
        console.log(currentMonth);
        const maxDays = moment(`${currentMonth}`).daysInMonth()

        const firstDayOfMonth = moment(`${currentYear}-${currentMonth}`).startOf('month').format('e');
        const previousMonth = moment(`${currentYear}-${currentMonth-1}`).format('YYYY-' + String(currentMonth));
        const maxDaysPrevious = moment(`${currentMonth}`).daysInMonth();

        console.log({
            firstDayOfMonth, maxDays, previousMonth, maxDaysPrevious
        })

        let dateArray = [];
        //First Push the previous month's days
        for (let i=maxDaysPrevious; i>maxDaysPrevious-firstDayOfMonth; i--) {
            if (currentMonth >= 10) {
                dateArray.push({
                    value: `${currentYear}-${currentMonth-1}-${i}`,
                    day: `${i}`,
                    ref: 'previous'
                });
            } else {
                dateArray.push({
                    value: `${currentYear}-0${currentMonth-1}-${i}`,
                    day: `${i}`,
                    ref: 'previous'
                });
            }
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

        const dispatchGetTasks = (value) => {
            this.props.dispatch(getTasks(value))
        }
        
        const htmlArray = dateArray.map(function(item) {
            const handleClick = (value) => {
                dispatchGetTasks(value.target.id)
            }

            if (item.ref === 'previous') {
                return (
                    <span onClick={handleClick} key={item.value} id={item.value} className="main__block previous-month-day">{item.day}</span>
                )
            } else if (item.ref === 'next') {
                return (
                    <span onClick={handleClick} key={item.value} id={item.value} className="main__block next-month-day">{item.day}</span>
                )
            } else {
                return (
                    <span onClick={handleClick} key={item.value} id={item.value} className="main__block">{item.day}</span>
                )
            }
            
        })

        return (
            htmlArray
        )
    }

}

const mapStateToProps = state => ({
    noteId: state.tasks.noteId,
    selectedMonth: state.tasks.selectedMonth
})

export default withRouter(connect(mapStateToProps)(DateRows))