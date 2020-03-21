import * as actionTypes from './actionTypes';

export const addTask = (taskDetails) => {
    return {
        type: actionTypes.ADD_TASK, 
        taskDetails: taskDetails,
    };
}