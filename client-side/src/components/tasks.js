import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import {changeTab, unselectDate, selectNote, postNewTask, deleteTask, updateTask, unselectNote } from '../actions/tasks'
import EditForm from './edit-form';
import moment from 'moment';

export class Tasks extends React.Component {

    render() {
        if (this.props.currentTab === 'settings') {
            return <Redirect to='/settings' />
        } else if (this.props.currentTab === 'calendar') {
            return <Redirect to='/calendar' />
        }

        const bindThis = this;
        function exit() {
            bindThis.props.dispatch(changeTab('calendar'))
            bindThis.props.dispatch(unselectDate())
        }

        function dispatchSelect(note) {
            bindThis.props.dispatch(selectNote(note.target.id))
        }

        const selectedDate = this.props.selectedDate;
        const currentTasks = this.props.notes.filter((note) => {
            return note.duedate === selectedDate
        }).sort((a, b) => {
            return a.id > b.id
        })

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
                    <label htmlFor={inputId} className="tasks__ul__li__label"><span className="tasks__ul__li__label__check">&#10003;</span></label>
                    <p id={note.id} onClick={dispatchSelect} className="tasks__ul__li__text">{note.content}</p>
                    </li>
                )
            }
        })

        function unselect() {
            if (bindThis.props.selectedNote) {
                setTimeout(function() {
                    bindThis.props.dispatch(unselectNote())
                }, 1)
            }
        }

        if (!this.props.userId) {
            return <Redirect to='/login' />
        } else {
            const formattedDate = moment(this.props.selectedDate, 'YYYY.MM.DD').format('MMM DD, YYYY')
            return (
                <div onClick={unselect} className="tasks">
                    <h4 className="tasks__day">{formattedDate}</h4>
                    <a className="tasks__exit" onClick={exit}>&#215;</a>
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
    selectedNote: state.tasks.selectedNote,
    currentTab: state.tasks.currentTab
})

export default withRouter(connect(mapStateToProps)(Tasks))