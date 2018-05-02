import { TOGGLE_YOUTUBE, MINIMIZE_YOUTUBE, TOGGLE_POMODORO, MINIMIZE_POMODORO } from "../actions/widgets";


const initialState = {
    youtube: {
        on: false,
        minimized: false
    },
    pomodoro: {
        on: false,
        minimized: false
    },
    slack: {
        on: false,
        minimized: false
    }
}

export default function reducer(state = initialState, action) {

    if (action.type === TOGGLE_YOUTUBE) {

        if (state.youtube.on === true) {
            return Object.assign({}, state, {
                youtube: {
                    on: false,
                    minimized: state.youtube.minimized
                }
            })
        } else {
            return Object.assign({}, state, {
                youtube: {
                    on: true,
                    minimized: state.youtube.minimized
                }
            })
        }
    } else if (action.type === MINIMIZE_YOUTUBE) {
        if (state.youtube.minimized === true) {
            return Object.assign({}, state, {
                youtube: {
                    on: state.youtube.on,
                    minimized: false
                }
            })
        } else {
            return Object.assign({}, state, {
                youtube: {
                    on: state.youtube.on,
                    minimized: true
                }
            })
        }
    } else if (action.type === TOGGLE_POMODORO) {

        if (state.pomodoro.on === true) {
            return Object.assign({}, state, {
                pomodoro: {
                    on: false,
                    minimized: state.pomodoro.minimized
                }
            })
        } else {
            return Object.assign({}, state, {
                pomodoro: {
                    on: true,
                    minimized: state.pomodoro.minimized
                }
            })
        }
    } else if (action.type === MINIMIZE_POMODORO) {
        if (state.pomodoro.minimized === true) {
            return Object.assign({}, state, {
                pomodoro: {
                    on: state.pomodoro.on,
                    minimized: false
                }
            })
        } else {
            return Object.assign({}, state, {
                pomodoro: {
                    on: state.pomodoro.on,
                    minimized: true
                }
            })
        }
    }
    
    return state;
}