import * as actionTypes from './actionTypes';

export const selectDate = (selectedDate) => {
	return {
		type: actionTypes.SELECT_DATE,
		newDate: selectedDate,
	};
}

export const addTask = (taskDetails) => {
    return {
        type: actionTypes.ADD_TASK, 
        taskInfo: taskDetails,
    };
}

export const updateTask = (changeInfo) => {
    return {
        type: actionTypes.UPDATE_TASK,
        changeInfo: changeInfo
    }
}

export const removeTask = (removeInfo) => {
    return {
        type: actionTypes.REMOVE_TASK,
        removeInfo: removeInfo
    }
}