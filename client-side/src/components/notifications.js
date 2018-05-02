import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import moment from 'moment';
import {updateTask, deleteTask} from '../actions/tasks';
import {changeTab, getTasks} from '../actions/tasks';

export class Notifications extends React.Component {

    render() {
        const currentDate = moment().format();

        const dueTasks = this.props.notes.filter((note) => {
            const noteValue = new Date(note.duedate).getTime();
            const currentDateValue = new Date(currentDate).getTime();
            return noteValue < currentDateValue && note.checked === false;
        }).sort((a, b) => {
            return a.duedate.slice(8, 10) > b.duedate.slice(8, 10)
        })

        const bindThis = this;
        function checkIt(check) {
            const content = {
                checked: check.target.checked
            }
            bindThis.props.dispatch(updateTask(check.target.value, bindThis.props.userId, content))
        }
        function deleteThis(note) {
            bindThis.props.dispatch(deleteTask(note.target.id, bindThis.props.userId))
        }

        const dispatchGetTasks = (value) => {
            this.props.dispatch(getTasks(value))
        }

        const buildJSX = dueTasks.map((note) => {
            const handleClick = (value) => {
                dispatchGetTasks(value.target.id)
                bindThis.props.dispatch(changeTab('tasks'));
            }
            const noteValue = new Date(note.duedate.slice(0, 10)).getTime();
            const currentDateValue = new Date(currentDate.slice(0, 10)).getTime();
            const inputId = 'task__' + (note.id)
            if (noteValue < currentDateValue) {
                return(
                    <li key={note.id} className="notifications__li overdue-task">
                        <span className="notifications__note" key={note.duedate} id={note.duedate} >{note.content}</span>
                        <span className="notifications__options">
                            <a onClick={handleClick} className="notifications__due" key={'due_' + note.id} id={note.duedate} >Due: {note.duedate}</a>
                            <input onChange={checkIt} value={note.id} id={inputId} className="notifications__checkbox" type="checkbox" />
                            <label className="notifications__checkbox__label" htmlFor={inputId}>
                            <a className="notifications__check">Check</a>
                            </label>
                            <a id={note.id} onClick={deleteThis} className="notifications__delete">Delete</a>
                        </span>
                    </li>
                )
            } else {
                return(
                    <li key={note.id} className="notifications__li">
                        <span className="notifications__note" key={note.duedate} id={note.duedate} >{note.content}</span>
                        <span className="notifications__options">
                            <a onClick={handleClick} className="notifications__due" key={'due_' + note.id} id={note.duedate} >Due: {note.duedate}</a>
                            <input onChange={checkIt} value={note.id} id={inputId} className="notifications__checkbox" type="checkbox" />
                            <label className="notifications__checkbox__label" htmlFor={inputId}>
                            <a className="notifications__check">Check</a>
                            </label>
                            <a id={note.id} onClick={deleteThis} className="notifications__delete">Delete</a>
                        </span>
                    </li>
                )
            }
            
        })

        return (
            <div className="notifications">
                <h3 className="notifications__header">Due Tasks</h3>
                <ul className="notifications__ul">
                    {buildJSX}
                </ul>
            </div>
        )
    }

}

const mapStateToProps = state => ({
    userId: state.auth.userId,
    notes: state.tasks.notes
})

export default withRouter(connect(mapStateToProps)(Notifications))