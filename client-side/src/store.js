import {createStore, applyMiddleware, combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import authReducer from './reducers/auth';
import taskReducer from './reducers/tasks';
import widgetsReducer from './reducers/widgets';
import thunk from 'redux-thunk';

const store = createStore(
    combineReducers({
        form: formReducer,
        auth: authReducer,
        tasks: taskReducer,
        widgets: widgetsReducer
    }),
    applyMiddleware(thunk)
);

//Possibly create JWT here.

export default store;