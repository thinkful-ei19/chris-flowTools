import {API_BASE_URL} from '../config';

export const FETCH_PROTECTED_DATA_SUCCESS = 'FETCH_PROTECTED_DATA_SUCCESS';
export const fetchProtectedDataSuccess = notes => ({
    type: FETCH_PROTECTED_DATA_SUCCESS,
    notes
});

export const FETCH_PROTECTED_DATA_ERROR = 'FETCH_PROTECTED_DATA_ERROR';
export const fetchProtectedDataError = error => ({
    type: FETCH_PROTECTED_DATA_ERROR,
    error
});

export const fetchProtectedData = (userId) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/api/notes`, {
        method: 'GET',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => res.json(res))
        .then((res) => {
            let dispatchArray = [];
            res.forEach((note) => {
                if (note.user_id === userId) {
                    dispatchArray.push(note)
                }
            })
            dispatch(fetchProtectedDataSuccess(dispatchArray))
            }
        )
        .catch(err => {
            dispatch(fetchProtectedDataError(err));
        });
};
