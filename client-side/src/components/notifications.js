import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';
import moment from 'moment';
import {updateTask, deleteTask} from '../actions/tasks';

export class Notifications extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const currentDate = moment().format();

        const dueTasks = this.props.notes.filter((note) => {
            const noteValue = new Date(note.duedate).getTime();
            const currentDateValue = new Date(currentDate).getTime();
            return noteValue <= currentDateValue && note.checked === false;
        })

        const bindThis = this;
        function checkIt(check) {
            const content = {
                checked: check.target.checked
            }

            bindThis.props.dispatch(updateTask(check.target.value, bindThis.props.userId, content))
        }
        function deleteThis(note) {
            console.log(note.target.id)
            bindThis.props.dispatch(deleteTask(note.target.id, bindThis.props.userId))
        }

        const buildJSX = dueTasks.map((note) => {
            const inputId = 'task__' + (note.id)
            return(
                <li key={note.id} className="main__notifications__li">
                    <span className="main__notifications__note" key={note.id} id={note.id} className="">{note.content}<br/>Due: {note.duedate}</span>
                    <input onChange={checkIt} value={note.id} id={inputId} className="main__notifications__checkbox" type="checkbox" />
                    <button id={note.id} onClick={deleteThis} className="main__notifications__delete-button">Delete</button>
                </li>
            )
        })

        return (
            <div className="main__notifications">
                <h3 className="main__notifications__header">Notifications</h3>
                <ul className="main__notifications__ul">
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