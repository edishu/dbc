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

export const saveLists = () => {
    return {
        type: actionTypes.SAVE_LISTS,
    }
}

export const retriveLists = () => {
    return {
        type: actionTypes.RETRIVE_LISTS,
    }
}

export const copyYesterday = () => {
    return {
        type: actionTypes.COPY_YESTERDAY,
    }
}

export const removeAll = () => {
    return {
        type: actionTypes.REMOVE_ALL,
    }
}