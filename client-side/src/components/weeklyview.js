import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import requiresLogin from './requires-login';
import {Redirect} from 'react-router-dom';
import EditForm from './edit-form-weekly';
import {getTasks, selectWeek, selectNote, postNewTask, deleteTask, updateTask, unselectNote} from '../actions/tasks'

import DaysRow from './daysRow-Weekly';

import backArrow from '../styles/images/PNG/002-back.png';
import nextArrow from '../styles/images/PNG/001-next.png';

export class WeeklyView extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            redirect: false
        }
    }

    render() {

        if (this.props.currentTab === 'settings') {
            return <Redirect to='/settings' />
        } else if (this.props.currentTab === 'calendar') {
            return <Redirect to='/calendar' />
        }

        const bindThis = this;
        function redirectToMonthly() {
            bindThis.setState({redirect: true})
        }

        if (this.props.selectedDate) {
            return <Redirect to='/tasks' />
        } 

        function dispatchSelect(note) {
            bindThis.props.dispatch(selectNote(note.target.id))
        }
        
        if (this.state.redirect === true ) {
            return <Redirect to='/calendar' />
        }

        function unselect() {
            if (bindThis.props.selectedNote) {
                setTimeout(function() {
                    bindThis.props.dispatch(unselectNote())
                }, 1)
            }
        }

        const currentYear = String(this.props.selectedYear);
        const currentMonth = String(this.props.selectedMonth)
        
        const maxDays = moment(`${currentYear}-${currentMonth}-01`).daysInMonth()

        const currentDay = moment().format('DD');
        const monthYear = moment(String(`${currentYear}-${currentMonth}-01`)).format('MMMM YYYY');

        const firstDayOfMonth = moment(`${currentYear}-${currentMonth}-01`).startOf('month').format('e');
        const previousMonthDate = moment(`${currentYear}-${currentMonth}-01`).subtract(1, 'months').endOf('month').format('YYYY-MM-DD')
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

        function createNewTask(date) {
            bindThis.props.dispatch(postNewTask(date.target.id, bindThis.props.userId))
        }

        function deleteThis(note) {
            bindThis.props.dispatch(deleteTask(note.target.id, bindThis.props.userId))
        }

        function checkIt(check) {
            const content = {
                checked: check.target.checked
            }
            bindThis.props.dispatch(updateTask(check.target.value, bindThis.props.userId, content))
        }

        let buildJSX = [];
        renderSelectedWeek.forEach((day) => {
            let noteArray = [];
            this.props.notes.forEach((note) => {
                const inputId = 'task__' + (note.id)
                if (note.duedate === day.value) {
                    if (note.id === Number(bindThis.props.selectedNote)) {
                        noteArray.push(
                            <li key={note.id} id={note.id} className="weekly__tasks__ul__li">
                            <EditForm noteId={note.id} placeholder={note.content}/>
                            <button id={note.id} onClick={deleteThis} className="weekly__tasks__ul__li__delete-button">Delete</button>
                            </li>
                        )
                    } else {
                        noteArray.push(
                            <li key={note.id} id={note.id} className="weekly__tasks__ul__li">
                            <input onChange={checkIt} defaultChecked={note.checked} value={note.id} id={inputId} className="weekly__tasks__ul__li__input" type="checkbox" />
                            <label htmlFor={inputId} className="weekly__tasks__ul__li__label"><span className="weekly__tasks__ul__li__label__check">&#10003;</span></label>
                            <p id={note.id} onClick={dispatchSelect} className="weekly__tasks__ul__li__text">{note.content}</p>
                            </li>
                        )
                    }
                }
            })

            const dispatchGetTasks = (value) => {
                this.props.dispatch(getTasks(value))
            }
            const handleClick = (value) => {
                dispatchGetTasks(value.target.id)
            }
            const sortedNoteArray = noteArray.sort((a, b) => {
                return a.props.id > b.props.id
            })
            buildJSX.push(
                <li key={day.value} className="weekly__li">
                    <p onClick={handleClick} id={day.value} className="weekly__date">{moment(day.value).format('MMM DD, YYYY')}</p>
                    <button id={day.value} onClick={createNewTask} className="weekly__tasks__button">New Task</button>
                    <ul className="weekly__tasks__ul">
                        {sortedNoteArray}
                    </ul>
                </li>
            )
        })

        return (
            <div onClick={unselect} className="weekly">
                <a className="weekly__toggleMonthly" onClick={redirectToMonthly}>Return to Monthly View</a>
                <a onClick={decrementWeek} className="weekly__previous"><img className="weekly__previous__button" src={backArrow}/></a>
                        <h2 className="weekly__month">{monthYear}</h2>
                        <a onClick={incrementWeek} className="weekly__next"><img className="weekly__next__button" src={nextArrow}/></a>
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
        selectedNote: state.tasks.selectedNote,
        notes: state.tasks.notes,
        currentTab: state.tasks.currentTab
    })
}


export default requiresLogin()(connect(mapStateToProps)(WeeklyView));