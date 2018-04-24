import { SET_AUTH_TOKEN, AUTH_SUCCESS, AUTH_ERROR, CLEAR_AUTH, SAVE_USER_ID, SAVE_NOTES } from "../actions/auth";

const initialState = {
    userId: null,
    settings: {
        scheme: 'light'
    },
    widgets: {
        pomodoro: "on"
    },
    notes: [],
    authToken: null,
    loading: false
}

export default function reducer(state = initialState, action) {

    if (action.type == SET_AUTH_TOKEN) {
        return Object.assign({}, state, {
            authToken: action.authToken
        })
    } else if (action.type == AUTH_SUCCESS) {
        return Object.assign({}, state, {
            loading: false
        })

    } else if (action.type == AUTH_ERROR) {
        return Object.assign({}, state, {
            loading: false,
            error: action.error
        })

    } else if (action.type == CLEAR_AUTH) {
        return Object.assign({}, state, {
            authToken: null,
            userId: null
        })
    } else if (action.type == SAVE_USER_ID) {
        return Object.assign({}, state, {
            userId: action.userId
        })
    } else if (action.type == SAVE_NOTES) {
        console.log(action.notes);
        return Object.assign({}, state, {
            notes: [action.notes]
        })
    }

    console.log(state);
    return state;
}