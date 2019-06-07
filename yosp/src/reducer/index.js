import {combineReducers} from 'redux';
import user from './user';
import alerts from './alerts';
import userAgents from './userAgents';
import formsReducer from './forms';

const rootReducer = combineReducers({
    user,form: formsReducer,alerts,userAgents
});

export default rootReducer;
