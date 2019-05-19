import {combineReducers} from 'redux';
import user from './user';
import formsReducer from './forms';

const rootReducer = combineReducers({
    user,form: formsReducer,
});

export default rootReducer;
