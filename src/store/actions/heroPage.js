import * as actionTypes from './actionTypes';

export const addTask = (taskDetails) => {
    return {
        type: actionTypes.ADD_TASK, 
        taskInfo: taskDetails,
    };
}

export const selectDate = (selectedDate) => {
	return {
		type: actionTypes.SELECT_DATE,
		newDate: selectedDate,
	};
}