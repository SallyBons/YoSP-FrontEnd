import {combineReducers} from 'redux';
import user from './user';
import alerts from './alerts';
import formsReducer from './forms';

const rootReducer = combineReducers({
    user,form: formsReducer,alerts,
});

export default rootReducer;
