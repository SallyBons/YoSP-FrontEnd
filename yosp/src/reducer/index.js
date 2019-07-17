import {combineReducers} from 'redux';
import user from './user';
import alerts from './alerts';
import proxy from './proxies';
import ui from './ui';
import formsReducer from './forms';

const rootReducer = combineReducers({
    user,form: formsReducer,alerts,proxy,ui
});

export default rootReducer;
