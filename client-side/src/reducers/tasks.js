import { GET_TASKS, UNSELECT_DATE, SELECT_NOTE, SELECT_MONTH, SELECT_YEAR } from "../actions/tasks";
import { FETCH_PROTECTED_DATA_SUCCESS, FETCH_PROTECTED_DATA_ERROR } from '../actions/users';
import moment from 'moment';

const initialState = {
    selectedDate: null,
    notes: [],
    selectedNote: null,
    selectedMonth: moment().format('MM'),
    selectedYear: moment().format('YYYY')
}

export default function reducer(state = initialState, action) {

    if (action.type === GET_TASKS) {
        console.log(state)
        return Object.assign({}, state, {
            selectedDate: action.selectedDate
        })
    }
    else if (action.type === FETCH_PROTECTED_DATA_SUCCESS) {
        //Format the dates to YYYY-MM-DD
        action.notes.forEach((note) => {
            note.duedate = note.duedate.slice(0, 10)
        })
        return Object.assign({}, state, {
            notes: action.notes,
            error: null
        })
    } else if (action.type === FETCH_PROTECTED_DATA_ERROR) {
        return Object.assign({}, state, {
            error: action.error
        })
    } else if (action.type === UNSELECT_DATE) {
        return Object.assign({}, state, {
            selectedDate: null
        })
    } else if (action.type === SELECT_NOTE) {
        return Object.assign({}, state, {
            selectedNote: action.selectedNote
        })
    }  else if (action.type === SELECT_MONTH) {
        console.log('selected month: ' + action.month)
        return Object.assign({}, state, {
            selectedMonth: String(action.month)
        })
    }  else if (action.type === SELECT_YEAR) {
        console.log('selected month: ' + action.month)
        return Object.assign({}, state, {
            selectedYear: String(action.year)
        })
    }

    console.log(state);

    return state;
}