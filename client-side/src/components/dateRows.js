import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import moment from 'moment';
import {getTasks, setWeek, changeTab} from '../actions/tasks';

export class DateRows extends React.Component {

    render() {
        const currentYear = String(this.props.selectedYear);
        const fixedCurrentYear = moment().format('YYYY');
        const currentMonth = String(this.props.selectedMonth)
        const fixedCurrentMonth = moment().format('MM');
        const maxDays = moment(`${currentYear}-${currentMonth}-01`).daysInMonth()
        const firstDayOfMonth = moment(`${currentYear}-${currentMonth}-01`).startOf('month').format('e');
        const previousMonthDate = moment(`${currentYear}-${currentMonth}-01`).subtract(1, 'months').endOf('month').format('YYYY-MM-DD')
        const maxDaysPrevious = moment(`${previousMonthDate}`).daysInMonth();
        const previousMonth = previousMonthDate.slice(5, 7);

        let dateArray = [];
        
        //If selected Month is a previous month
        if (fixedCurrentYear > currentYear) {
            //First Push the previous month's days
            for (let i=maxDaysPrevious; i>maxDaysPrevious-firstDayOfMonth; i--) {
                dateArray.push({
                    value: `${currentYear}-${previousMonth}-${i}`,
                    day: `${i}`,
                    ref: 'previous',
                    month: 'previous'
                });
            }
            dateArray.reverse();

            //Push the amount of days in current month
            for (let i=1; i<=maxDays; i++) {
                if (i<10) {
                    dateArray.push({value: `${currentYear}-${currentMonth}-0${i}`, day: `0${i}`, ref: 'current', month: 'previous'})
                } else {
                    dateArray.push({value: `${currentYear}-${currentMonth}-${i}`, day: `${i}`, ref: 'current', month: 'previous'})
                }
            }

            //Push the remaining days for the next month
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
                    ref: 'next',
                    month: 'previous'
                }
                )
            }
        } else if (fixedCurrentYear === currentYear) {
    
        //If selected month is present month.
        if (fixedCurrentMonth === currentMonth) {
            //First Push the previous month's days
            for (let i=maxDaysPrevious; i>maxDaysPrevious-firstDayOfMonth; i--) {
                dateArray.push({
                    value: `${currentYear}-${previousMonth}-${i}`,
                    day: `${i}`,
                    ref: 'previous',
                    month: 'current'
                });
            }
            dateArray.reverse();

            //Push the amount of days in current month
            for (let i=1; i<=maxDays; i++) {
                if (i<10) {
                    dateArray.push({value: `${currentYear}-${currentMonth}-0${i}`, day: `0${i}`, ref: 'current', month: 'current'})
                } else {
                    dateArray.push({value: `${currentYear}-${currentMonth}-${i}`, day: `${i}`, ref: 'current', month: 'current'})
                }
            }

            //Push the remaining days for the next month
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
                    ref: 'next',
                    month: 'current'
                }
                )
            }
        }

            if (fixedCurrentMonth > currentMonth) {
            //First Push the previous month's days
            for (let i=maxDaysPrevious; i>maxDaysPrevious-firstDayOfMonth; i--) {
                dateArray.push({
                    value: `${currentYear}-${previousMonth}-${i}`,
                    day: `${i}`,
                    ref: 'previous',
                    month: 'previous'
                });
            }
            dateArray.reverse();

            //Push the amount of days in current month
            for (let i=1; i<=maxDays; i++) {
                if (i<10) {
                    dateArray.push({value: `${currentYear}-${currentMonth}-0${i}`, day: `0${i}`, ref: 'current', month: 'previous'})
                } else {
                    dateArray.push({value: `${currentYear}-${currentMonth}-${i}`, day: `${i}`, ref: 'current', month: 'previous'})
                }
            }

            //Push the remaining days for the next month
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
                    ref: 'next',
                    month: 'previous'
                }
                )
            }
            }
            //If the selected month is a future month of the current year.
            if (fixedCurrentMonth < currentMonth) {
                //First Push the previous month's days
            for (let i=maxDaysPrevious; i>maxDaysPrevious-firstDayOfMonth; i--) {
                dateArray.push({
                    value: `${currentYear}-${previousMonth}-${i}`,
                    day: `${i}`,
                    ref: 'previous',
                    month: 'future'
                });
            }
            dateArray.reverse();

            //Push the amount of days in current month
            for (let i=1; i<=maxDays; i++) {
                if (i<10) {
                    dateArray.push({value: `${currentYear}-${currentMonth}-0${i}`, day: `0${i}`, ref: 'current', month: 'future'})
                } else {
                    dateArray.push({value: `${currentYear}-${currentMonth}-${i}`, day: `${i}`, ref: 'current', month: 'future'})
                }
            }

            //Push the remaining days for the next month
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
                    ref: 'next',
                    month: 'future'
                }
                )
            }
            }
        }
        //Else if the selected year is a future year.
        else if (fixedCurrentYear < currentYear) {
                //First Push the previous month's days
            for (let i=maxDaysPrevious; i>maxDaysPrevious-firstDayOfMonth; i--) {
                dateArray.push({
                    value: `${currentYear}-${previousMonth}-${i}`,
                    day: `${i}`,
                    ref: 'previous',
                    month: 'future'
                });
            }
            dateArray.reverse();

            //Push the amount of days in current month
            for (let i=1; i<=maxDays; i++) {
                if (i<10) {
                    dateArray.push({value: `${currentYear}-${currentMonth}-0${i}`, day: `0${i}`, ref: 'current', month: 'future'})
                } else {
                    dateArray.push({value: `${currentYear}-${currentMonth}-${i}`, day: `${i}`, ref: 'current', month: 'future'})
                }
            }

            //Push the remaining days for the next month
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
                    ref: 'next',
                    month: 'future'
                }
                )
            }
        }

        //Force Stop at 35 blocks
        dateArray = dateArray.slice(0, 35);

        const dispatchGetTasks = (value) => {
            this.props.dispatch(getTasks(value))
        }

        const bindThis = this;

        let finalDateArray = dateArray.map((date) => {
            let dateNotes = [];
            bindThis.props.notes.forEach((note) => {
                if (date.value === note.duedate) {
                    dateNotes.push(note);
                }
            })
            return {
                value: date.value,
                day: date.day,
                ref: date.ref,
                month: date.month,
                notes: dateNotes
            }
        })

        const htmlArray = finalDateArray.map(function(item) {
            const handleClick = (value, data) => {
                dispatchGetTasks(value.target.id)
                bindThis.props.dispatch(changeTab('tasks'))
                bindThis.props.dispatch(setWeek(Math.ceil(data/7)))
            }

            //Need to redo the color-coded if statements- this time make sure that you compare the exact date- by comparing year, then month, then day.

        //Current Date
            if (String(item.value) === String(moment().format('YYYY-MM-DD'))) {
                if (moment(`${currentYear}-${currentMonth}-01`).format('MM') !== moment(item.value).format('MM')) {
                    if (item.notes.length > 0) {
                        let checked = true;
                        item.notes.forEach((note) => {
                            if (note.checked === false) {
                                checked = false
                            }
                        })
                        if (checked === false) {
                            return (
                                <span
                                onClick={(value) => handleClick(value, finalDateArray.indexOf(item) + 1)}
                                key={item.value}
                                id={item.value}
                                className="main__calendar__block other-month-day current-day current-day-tasks">
                                {item.day}
                                </span>
                            )
                        } else {
                            return (
                                <span
                                onClick={(value) => handleClick(value, finalDateArray.indexOf(item) + 1)}
                                key={item.value}
                                id={item.value}
                                className="main__calendar__block other-month-day current-day current-day-finished">
                                {item.day}
                                </span>
                            )
                        }
                    } else {
                        return (
                            <span
                            onClick={(value) => handleClick(value, finalDateArray.indexOf(item) + 1)}
                            key={item.value}
                            id={item.value}
                            className="main__calendar__block other-month-day current-day">
                            {item.day}
                            </span>
                        )
                    }
                } else {
                    if (item.notes.length > 0) {
                        let checked = true;
                        item.notes.forEach((note) => {
                            if (note.checked === false) {
                                checked = false
                            }
                        })
                        if (checked === false) {
                            return (
                                <span
                                onClick={(value) => handleClick(value, finalDateArray.indexOf(item) + 1)}
                                key={item.value}
                                id={item.value}
                                className="main__calendar__block current-day current-day-tasks">
                                {item.day}
                                </span>
                            )
                        } else {
                            return (
                                <span
                                onClick={(value) => handleClick(value, finalDateArray.indexOf(item) + 1)}
                                key={item.value}
                                id={item.value}
                                className="main__calendar__block current-day current-day-finished">
                                {item.day}
                                </span>
                            )
                        }
                    } else {
                        return (
                            <span
                            onClick={(value) => handleClick(value, finalDateArray.indexOf(item) + 1)}
                            key={item.value}
                            id={item.value}
                            className="main__calendar__block current-day">
                            {item.day}
                            </span>
                        )
                    }
                }


        //Previous Date
            } else if (moment(item.value).valueOf() < moment().valueOf()) {

                if (moment(`${currentYear}-${currentMonth}-01`).format('MM') !== moment(item.value).format('MM')) {
                    if (item.notes.length > 0) {
                        let checked = true;
                        item.notes.forEach((note) => {
                            if (note.checked === false) {
                                checked = false
                            }
                        })
                        if (checked === false) {
                            return (
                                <span
                                onClick={(value) => handleClick(value, finalDateArray.indexOf(item) + 1)}
                                key={item.value}
                                id={item.value}
                                className="main__calendar__block other-month-day overdue-tasks">
                                {item.day}
                                </span>
                            )
                        } else {
                            return (
                                <span
                                onClick={(value) => handleClick(value, finalDateArray.indexOf(item) + 1)}
                                key={item.value}
                                id={item.value}
                                className="main__calendar__block other-month-day finished-tasks">
                                {item.day}
                                </span>
                            )
                        }
                    } else {
                        return (
                            <span
                            onClick={(value) => handleClick(value, finalDateArray.indexOf(item) + 1)}
                            key={item.value}
                            id={item.value}
                            className="main__calendar__block other-month-day">
                            {item.day}
                            </span>
                        )
                    }
                } else {
                    if (item.notes.length > 0) {
                        let checked = true;
                        item.notes.forEach((note) => {
                            if (note.checked === false) {
                                checked = false
                            }
                        })
                        if (checked === false) {
                            return (
                                <span
                                onClick={(value) => handleClick(value, finalDateArray.indexOf(item) + 1)}
                                key={item.value}
                                id={item.value}
                                className="main__calendar__block overdue-tasks">
                                {item.day}
                                </span>
                            )
                        } else {
                            return (
                                <span
                                onClick={(value) => handleClick(value, finalDateArray.indexOf(item) + 1)}
                                key={item.value}
                                id={item.value}
                                className="main__calendar__block finished-tasks">
                                {item.day}
                                </span>
                            )
                        }
                    } else {
                        return (
                            <span
                            onClick={(value) => handleClick(value, finalDateArray.indexOf(item) + 1)}
                            key={item.value}
                            id={item.value}
                            className="main__calendar__block">
                            {item.day}
                            </span>
                        )
                    }
                } 

        //Future Date
            } else if (moment(item.value).valueOf() > moment().valueOf()) {

                if (moment(`${currentYear}-${currentMonth}-01`).format('MM') !== moment(item.value).format('MM')) {
                    if (item.notes.length > 0) {
                        let checked = true;
                        item.notes.forEach((note) => {
                            if (note.checked === false) {
                                checked = false
                            }
                        })
                        if (checked === false) {
                            return (
                                <span
                                onClick={(value) => handleClick(value, finalDateArray.indexOf(item) + 1)}
                                key={item.value}
                                id={item.value}
                                className="main__calendar__block other-month-day due-tasks">
                                {item.day}
                                </span>
                            )
                        } else {
                            return (
                                <span
                                onClick={(value) => handleClick(value, finalDateArray.indexOf(item) + 1)}
                                key={item.value}
                                id={item.value}
                                className="main__calendar__block other-month-day finished-tasks">
                                {item.day}
                                </span>
                            )
                        }
                    } else {
                        return (
                            <span
                            onClick={(value) => handleClick(value, finalDateArray.indexOf(item) + 1)}
                            key={item.value}
                            id={item.value}
                            className="main__calendar__block other-month-day">
                            {item.day}
                            </span>
                        )
                    }
                } else {
                    if (item.notes.length > 0) {
                        let checked = true;
                        item.notes.forEach((note) => {
                            if (note.checked === false) {
                                checked = false
                            }
                        })
                        if (checked === false) {
                            return (
                                <span
                                onClick={(value) => handleClick(value, finalDateArray.indexOf(item) + 1)}
                                key={item.value}
                                id={item.value}
                                className="main__calendar__block due-tasks">
                                {item.day}
                                </span>
                            )
                        } else {
                            return (
                                <span
                                onClick={(value) => handleClick(value, finalDateArray.indexOf(item) + 1)}
                                key={item.value}
                                id={item.value}
                                className="main__calendar__block finished-tasks">
                                {item.day}
                                </span>
                            )
                        }
                    } else {
                        return (
                            <span
                            onClick={(value) => handleClick(value, finalDateArray.indexOf(item) + 1)}
                            key={item.value}
                            id={item.value}
                            className="main__calendar__block">
                            {item.day}
                            </span>
                        )
                    }
                }
            }
            return false;
        })
        
        return (
            htmlArray
        )
    }

}

const mapStateToProps = state => ({
    noteId: state.tasks.noteId,
    selectedMonth: state.tasks.selectedMonth,
    selectedYear: state.tasks.selectedYear,
    notes: state.tasks.notes
})

export default withRouter(connect(mapStateToProps)(DateRows))