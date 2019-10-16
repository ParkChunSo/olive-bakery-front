import {createAction, handleActions} from 'redux-actions';

const ADDITEM = "cart/ADDITEM";
const INCREMENT = "cart/INCREMENT";
const DECREMENT = "cart/DECREMENT";
const DELITEM = "cart/DELITEM";

export const addItem = createAction(ADDITEM);
export const increment = createAction(INCREMENT);
export const decrement = createAction(DECREMENT);
export const delItem = createAction(DELITEM);

const initialState = {
    itemlist: [],
    tot: 0
};

export default handleActions({
    [ADDITEM]: (state, action) => {
        let isExist = false;
        for( let i=0; i<state.itemlist.length; i++)
            if(state.itemlist[i].name === action.payload.name){
                isExist = true;
                break;
            }
        if(isExist===false) {
            const temp = action.payload.price + state.tot;
            return {
                itemlist: state.itemlist.concat(action.payload),
                tot: temp
            };
        }
        else {
            return {
                itemlist: state.itemlist,
                tot: state.tot
            };
        }
    },
    [INCREMENT]: (state, action) => {
        let addPrice = 0;
        for(let i=0; i<state.itemlist.length; i++)
            if(state.itemlist[i].name === action.payload){
                addPrice = state.itemlist[i].price;
                break;
            }
        const temp = state.tot + addPrice;
        console.log(temp);
        return {
            itemlist: state.itemlist.map(
            item => action.payload === item.name
                ? ({...item, count: item.count+1})
                : item
            ),
            tot: temp
        };
    },
    [DECREMENT]: (state, action) => {
        let subPrice = 0;
        for(let i=0; i<state.itemlist.length; i++)
            if(state.itemlist[i].name === action.payload){
                if(state.itemlist[i].count>1)
                    subPrice = state.itemlist[i].price;
                break;
            }
        const temp = state.tot - subPrice;
        return {
            itemlist: state.itemlist.map(
            item => action.payload === item.name && item.count>1
                ? ({...item, count: item.count-1})
                : item
            ),
            tot: temp
        };
    },
    [DELITEM]: (state, action) => {
        let subPrice = 0;
        for(let i=0; i<state.itemlist.length; i++)
            if(state.itemlist[i].name === action.payload){
                subPrice = state.itemlist[i].price * state.itemlist[i].count;
                break;
            }
        const temp = state.tot - subPrice;
        return {
            itemlist: state.itemlist.filter(item => item.name !== action.payload),
            tot : temp
        };
    }
}, initialState);
