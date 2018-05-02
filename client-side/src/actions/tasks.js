import {API_BASE_URL} from '../config'
import {fetchProtectedData, fetchProtectedDataError} from './users'

export const GET_TASKS = 'GET_TASKS';
export const getTasks = (selectedDate) => ({
    type: GET_TASKS,
    selectedDate
})

export const SAVE_NOTES = 'SAVE_NOTES'
export const saveNotes = (notes) => ({
    type: SAVE_NOTES,
    notes
})

export const UNSELECT_DATE = 'UNSELECT_DATE';
export const unselectDate = () => ({
    type: UNSELECT_DATE
})

export const UNSELECT_NOTE = 'UNSELECT_NOTE';
export const unselectNote = () => ({
    type: UNSELECT_NOTE
})

export const SELECT_NOTE = 'SELECT_NOTE';
export const selectNote = (selectedNote) => ({
    type: SELECT_NOTE,
    selectedNote
})

export const NEW_TASK = 'NEW_TASK';
export const newTask = () => ({
    type: NEW_TASK
})

export const SELECT_MONTH = 'SELECT_MONTH';
export const selectMonth = (month) => ({
    type: SELECT_MONTH,
    month
})

export const SELECT_YEAR = 'SELECT_YEAR';
export const selectYear = (year) => ({
    type: SELECT_YEAR,
    year
})

export const SELECT_WEEK = 'SELECT_WEEK';
export const selectWeek = (action) => ({
    type: SELECT_WEEK,
    action
})

export const SET_WEEK = 'SET_WEEK';
export const setWeek = (week) => ({
    type: SET_WEEK,
    week
})

export const CHANGE_TAB = 'CHANGE_TAB';
export const changeTab = (tab) => ({
    type: CHANGE_TAB,
    tab
})

export const postNewTask = (date, userId) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    const postNote = {
        content: "New Task",
        duedate: date,
        user_id: userId,
        checked: false
    }


    return fetch(`${API_BASE_URL}/api/notes`, {
        method: 'POST',
        body: JSON.stringify(postNote),
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json'
        }
    })
    .then((res) => res.json)
    .then((res) => {
        dispatch(fetchProtectedData(userId))
    })
    .catch(err => {
        dispatch(fetchProtectedDataError(err));
    });
}

export const deleteTask = (noteId, userId) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/api/notes/${noteId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
    .then((res) => dispatch(fetchProtectedData(userId)))
    .catch((err) => dispatch(fetchProtectedDataError(err)))
}

export const updateTask = (noteId, userId, content) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;

    let updateNote;
    if (content.content) {
        updateNote = {
            content: content.content
        }
    } else {
        updateNote = {
            checked: content.checked
        }
    }

    return fetch(`${API_BASE_URL}/api/notes/${noteId}`, {
        method: 'PUT',
        body: JSON.stringify(updateNote),
        headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json'
        }
    })
    .then((res) => dispatch(fetchProtectedData(userId)))
    .catch((err) => dispatch(fetchProtectedDataError(err)))
}