import { GET_TASKS, UNSELECT_DATE, SELECT_NOTE, SELECT_MONTH, SELECT_YEAR, UNSELECT_NOTE, SELECT_WEEK, SET_WEEK, CHANGE_TAB } from "../actions/tasks";
import { FETCH_PROTECTED_DATA_SUCCESS, FETCH_PROTECTED_DATA_ERROR } from '../actions/users';
import moment from 'moment';

const currentYear = moment().format('YYYY');
const currentMonth = moment().format('MM');
const currentDay = moment().format('DD');

const previousMonthDate = moment(`${currentYear}-${currentMonth}`).subtract(1, 'months').endOf('month').format('YYYY-MM-DD')

const firstDayOfMonth = moment(`${currentYear}-${currentMonth}`).startOf('month').format('e');
const maxDaysPrevious = moment(`${previousMonthDate}`).daysInMonth();

let monthBuffer = 0;
for (let i=maxDaysPrevious; i>maxDaysPrevious-firstDayOfMonth; i--) {
    monthBuffer ++;
}
const currentDayValue = Number(monthBuffer) + Number(currentDay);
let currentWeekValue;
if (currentDayValue <= 7) {
    currentWeekValue = 1;
} else if (currentDayValue <= 14) {
    currentWeekValue = 2;
} else if (currentDayValue <= 21) {
    currentWeekValue = 3;
} else if (currentDayValue <= 28) {
    currentWeekValue = 4;
} else if (currentDayValue <= 35) {
    currentWeekValue = 5;
}

const initialState = {
    currentTab: 'calendar',
    selectedDate: null,
    notes: [],
    selectedNote: null,
    selectedMonth: moment().format('MM'),
    selectedYear: moment().format('YYYY'),
    selectedWeek: currentWeekValue
}

export default function reducer(state = initialState, action) {

    if (action.type === GET_TASKS) {
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
        return Object.assign({}, state, {
            selectedMonth: String(action.month)
        })
    }  else if (action.type === SELECT_YEAR) {
        return Object.assign({}, state, {
            selectedYear: String(action.year)
        })
    }   else if (action.type === UNSELECT_NOTE) {
        return Object.assign({}, state, {
            selectedNote: null
        })
    }   else if (action.type === SELECT_WEEK) {
        if (action.action === 'decrement') {
            if (state.selectedWeek === 1 && String(state.selectedMonth) === '01') {
                return Object.assign({}, state, {
                    selectedWeek: 5,
                    selectedMonth: String(12),
                    selectedYear: String(Number(state.selectedYear) - 1)
                })
            } else if (state.selectedWeek === 1) {
                return Object.assign({}, state, {
                    selectedWeek: 5,
                    selectedMonth: String('0' +(Number(state.selectedMonth) - 1))
                })
            } else {
                return Object.assign({}, state, {
                    selectedWeek: state.selectedWeek - 1
                })
            }

        } else if (action.action === 'increment') {
            if (state.selectedWeek === 5 && state.selectedMonth === '12') {
                return Object.assign({}, state, {
                    selectedWeek: 1,
                    selectedMonth: '01',
                    selectedYear: String(Number(state.selectedYear) + 1)
                })
            } else if (state.selectedWeek === 5) {
                return Object.assign({}, state, {
                    selectedWeek: 1,
                    selectedMonth: String('0' +(Number(state.selectedMonth) + 1))
                })
            } else {
                return Object.assign({}, state, {
                    selectedWeek: state.selectedWeek + 1
                })
            }
        }
    } else if (action.type === SET_WEEK) {
        return Object.assign({}, state, {
            selectedWeek: action.week
        })
    } else if (action.type === CHANGE_TAB) {
        return Object.assign({}, state, {
            currentTab: action.tab
        })
    }

    return state;
}