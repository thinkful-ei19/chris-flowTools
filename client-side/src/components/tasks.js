import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';
import {Link, Redirect} from 'react-router-dom';
import { unselectDate, selectNote, postNewTask, deleteTask, updateTask } from '../actions/tasks'
import EditForm from './edit-form';
import moment from 'moment';

export class Tasks extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {
        const bindThis = this;
        function exit() {
            bindThis.props.dispatch(unselectDate())
        }

        function dispatchSelect(note) {
            bindThis.props.dispatch(selectNote(note.target.id))
        }

        const selectedDate = this.props.selectedDate;
        const currentTasks = this.props.notes.filter((note) => {
            return note.duedate == selectedDate
        }).sort((a, b) => {
            return a.id > b.id
        })

        function createNewTask(date) {
            bindThis.props.dispatch(postNewTask(date.target.id, bindThis.props.userId))
        }

        function deleteThis(note) {
            console.log(note.target.id)
            bindThis.props.dispatch(deleteTask(note.target.id, bindThis.props.userId))
        }

        function checkIt(check) {
            const content = {
                checked: check.target.checked
            }
            bindThis.props.dispatch(updateTask(check.target.value, bindThis.props.userId, content))
        }
        //bindThis.props.notes ~ note[0].checked

        const buildJSX = currentTasks.map((note) => {
            const inputId = 'task__' + (note.id)
            if (note.id === Number(bindThis.props.selectedNote)) {
                return (
                    <li key={note.id} id={note.id} className="tasks__ul__li">
                    <EditForm noteId={note.id} placeholder={note.content}/>
                    <button id={note.id} onClick={deleteThis} className="tasks__ul__li__delete-button">Delete</button>
                    </li>
                )
            } else {
                return (
                    <li key={note.id} id={note.id} className="tasks__ul__li">
                    <input onChange={checkIt} defaultChecked={note.checked} value={note.id} id={inputId} className="tasks__ul__li__input" type="checkbox" />
                    <label htmlFor={inputId} className="tasks__ul__li__label">(B)</label>
                    <p id={note.id} onClick={dispatchSelect} className="tasks__ul__li__text">{note.content}</p>
                    </li>
                )
            }
        })

        if (!this.props.selectedDate) {
            return <Redirect to='/calendar' />
        } else {
            const formattedDate = moment(this.props.selectedDate, 'YYYY.MM.DD').format('MMM DD, YYYY')
            return (
                <div className="tasks">
                    <h4 className="tasks__day">{formattedDate}</h4>
                    <a href="#" onClick={exit}>Exit</a>
                    <ul className="tasks__ul">
                        {buildJSX}
                    </ul>
                    <button id={this.props.selectedDate} onClick={createNewTask} className="tasks__button">New Task</button>
                </div>
            )
        }
    }

}

const mapStateToProps = state => ({
    userId: state.auth.userId,
    notes: state.tasks.notes,
    selectedDate: state.tasks.selectedDate,
    selectedNote: state.tasks.selectedNote
})

export default withRouter(connect(mapStateToProps)(Tasks))