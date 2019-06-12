import {combineReducers} from 'redux';
import user from './user';
import alerts from './alerts';
import proxy from './proxies';
import formsReducer from './forms';

const rootReducer = combineReducers({
    user,form: formsReducer,alerts,proxy
});

export default rootReducer;
