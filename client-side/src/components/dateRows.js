import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';
import moment from 'moment';
import {getTasks, setWeek} from '../actions/tasks';

export class DateRows extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const currentYear = moment().format('YYYY');
        
        const currentMonth = String(this.props.selectedMonth)
        const maxDays = moment(`${currentMonth}`).daysInMonth()

        const firstDayOfMonth = moment(`${currentYear}-${currentMonth}`).startOf('month').format('e');
        const previousMonthDate = moment(`${currentYear}-${currentMonth}`).subtract(1, 'months').endOf('month').format('YYYY-MM-DD')
        const maxDaysPrevious = moment(`${previousMonthDate}`).daysInMonth();
        const previousMonth = previousMonthDate.slice(5, 7);

        let dateArray = [];
        //First Push the previous month's days
        for (let i=maxDaysPrevious; i>maxDaysPrevious-firstDayOfMonth; i--) {
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

        const dispatchGetTasks = (value) => {
            this.props.dispatch(getTasks(value))
        }
        const bindThis = this;
        const htmlArray = dateArray.map(function(item) {
            const handleClick = (value, data) => {
                dispatchGetTasks(value.target.id)
                bindThis.props.dispatch(setWeek(Math.ceil(data/7)))
            }

        

            if (item.ref === 'previous') {
                return (
                    <span onClick={(value) => handleClick(value, dateArray.indexOf(item) + 1)} key={item.value} id={item.value} className="main__block previous-month-day">{item.day}</span>
                )
            } else if (item.ref === 'next') {
                return (
                    <span onClick={(value) => handleClick(value, dateArray.indexOf(item) + 1)}  key={item.value} id={item.value} className="main__block next-month-day">{item.day}</span>
                )
            } else {
                return (
                    <span onClick={(value) => handleClick(value, dateArray.indexOf(item) + 1)}  key={item.value} id={item.value} className="main__block">{item.day}</span>
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