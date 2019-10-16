import {combineReducers} from "redux";
import auth from './auth';
import cart from './cart';
import alert from './alert';

export default combineReducers({
    auth,
    cart,
    alert
});

