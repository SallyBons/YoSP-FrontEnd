import {combineReducers} from 'redux';
import user from './user';
import alerts from './alerts';
import proxies from './proxies';
import ui from './ui';
import formsReducer from './forms';

const rootReducer = combineReducers({
    user,form: formsReducer,alerts,proxies,ui
});

export default rootReducer;
