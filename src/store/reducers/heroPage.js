import * as actionTypes from '../actions/actionTypes';
import {dateToStr, updateObject} from '../../shared/utility'

const initialState = {
    toDoLists: {},
    selectedDate: dateToStr(new Date()),
}

const addTask = (state, action) => {
	console.log('[ADD_TASK] function triggred with ', action.taskInfo);
	const newTask = {
		start: action.taskInfo.task.start,
		end: action.taskInfo.task.end,
		taskDetail: action.taskInfo.task.taskDetail,
		status: action.taskInfo.task.status,
	};
	console.log(newTask);
	let newToDoLists = {...state.toDoLists};
	let oldDateTasks = {...state.toDoLists[action.taskInfo.date]}

	if (!state.toDoLists[action.taskInfo.date]) {
		newToDoLists[action.taskInfo.date] = {
			tasks: [newTask]
		};
	} else {
		const newTasks = oldDateTasks.tasks.concat(newTask);
		const newDateTasks = updateObject(oldDateTasks, {tasks: newTasks});
		newToDoLists[action.taskInfo.date] = newDateTasks;
	}
	console.log(newToDoLists);
	return updateObject(state, {toDoLists: newToDoLists});
};

const selectDate = (state, action) => {
	return updateObject(state, {selectedDate: action.newDate});
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_TASK:
			return addTask(state, action);
		case actionTypes.SELECT_DATE:
			return selectDate(state, action);
        default:
            return state;
    }
}

export default reducer;