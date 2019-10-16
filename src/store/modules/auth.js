import {createAction, handleActions} from 'redux-actions';
import storage from "../../storage";

const SAVETOKEN = 'auth/SAVETOKEN';
const LOGOUT = 'auth/LOGOUT';

export const saveToken = createAction(SAVETOKEN);
export const logOut = createAction(LOGOUT);

const initialState = {
    token: 'guest',
    logged: ''
};

export default handleActions({
    [SAVETOKEN]: (state, action) => {
        storage.set('logged', true);
        storage.set('token', action.payload.tok);
        storage.set('email', action.payload.email);
        storage.set('password', action.payload.password);
        return {token: action.payload.tok, logged: true};
    },
    [LOGOUT]: (state, action) => {
        storage.remove('logged');
        storage.remove('token');
        storage.remove('email');
        storage.remove('password');
        return {token: 'guest', logged: false};
    }
}, initialState);
