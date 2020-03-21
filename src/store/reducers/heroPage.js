import * as actionTypes from '../actions/actionTypes';
import {dateToStr} from '../../shared/utility'

const initialState = {
    toDoLists: [],
    selectedDate: dateToStr(new Date()),
}

const addTask = (state, action) => {
    console.log('[ADD_TASK] function triggred with ', action.taskDetails);
    return state;
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_TASK:
            return addTask(state, action);
        default:
            return state;
    }
    
}

export default reducer;