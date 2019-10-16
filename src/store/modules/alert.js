import {createAction, handleActions} from 'redux-actions';
import storage from "../../storage";

const ADDALERT = 'alert/ADDALERT';
const DELALERT = 'alert/DELALERT';

export const addAlert = createAction(ADDALERT);
export const delAlert = createAction(DELALERT);

const initialState = {
    message: []
};

export default handleActions({
    [ADDALERT]: (state, action) => {
        return {message: state.message.concat(action.payload)};
    },
    [DELALERT]: (state, action) => {
        return {message: state.message.filter(msg=>msg===action.payload)};
    }
}, initialState);
