import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm, focus} from 'redux-form';
import {updateTask, selectNote} from '../actions/tasks'
import Input from './input-edit';
// Notice this import of Input component;

class EditForm extends React.Component {

    render() {

        const bindThis = this;
        function updateThis(value) {
            bindThis.props.dispatch(updateTask(bindThis.props.noteId, bindThis.props.userId, value))
            bindThis.props.dispatch(selectNote(null))
        }

        return (
                <form className="tasks__ul__li__edit"
                    onSubmit={this.props.handleSubmit(value =>{
                        updateThis(value)
                    })}
                >
                    <Field
                        placeholderText={this.props.placeholder}
                        autoFocus={true}
                        component={Input}
                        type="text"
                        name="content"
                        id="content"
                    />
                    <button
                        className="tasks__ul__li__edit__button"
                        disabled={this.props.pristine || this.props.submitting}>
                        Submit
                    </button>
                </form>
        )
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.userId !== null,
    userId: state.auth.userId,
})

export default reduxForm({
    form: 'edit',
    onSubmitFail: (errors, dispatch) => dispatch(focus('edit', 'editNote'))
})(connect(mapStateToProps)(EditForm));


//                    <input id={note.id} onClick={dispatchSelect} className="tasks__ul__li__edit" placeholder={note.content} />