import * as actionTypes from '../actions/actionTypes';
import {dateToStr, updateObject} from '../../shared/utility';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    toDoLists: {},
    selectedDate: dateToStr(new Date()),
}

const selectDate = (state, action) => {
	return updateObject(state, {selectedDate: action.newDate});
}

const addTask = (state, action) => {

	const newTask = {
		id: uuidv4(),
		...action.taskInfo.task
	};

	let toDoLists = {...state.toDoLists};
	let dateTaskAndStatus = {...state.toDoLists[action.taskInfo.date]}

	if (!state.toDoLists[action.taskInfo.date]) {
		toDoLists[action.taskInfo.date] = {
			tasks: [newTask],
			status: "current"
		};
	} else {
		const newTasks = dateTaskAndStatus.tasks.concat(newTask);
		newTasks.sort((firstEl, secondEl) => {
			if (firstEl.start > secondEl.start) return 1;
			if (firstEl.start < secondEl.start) return -1;
			return 0
		});
		dateTaskAndStatus = updateObject(dateTaskAndStatus, {tasks: newTasks});
		toDoLists[action.taskInfo.date] = dateTaskAndStatus;
	}
	
	return updateObject(state, {toDoLists: toDoLists});
};

const updateTask = (state, action) => {

	let toDoLists = {...state.toDoLists};
	let dateTaskAndStatus = {...state.toDoLists[action.changeInfo.date]};
	let tasks = [...state.toDoLists[action.changeInfo.date].tasks];
	let task = tasks.find(el => el.id === action.changeInfo.id);
	let idxOfTask = tasks.findIndex(el => el.id === action.changeInfo.id);


	task = updateObject(task, action.changeInfo.task);
	tasks[idxOfTask] = task;
	dateTaskAndStatus = updateObject(dateTaskAndStatus, {tasks: tasks});
	toDoLists[action.changeInfo.date] = dateTaskAndStatus;
	return updateObject(state, {toDoLists: toDoLists});
}

const removeTask = (state, action) => {
	let toDoLists = {...state.toDoLists};
	let dateTaskAndStatus = {...state.toDoLists[action.removeInfo.date]};
	let tasks = [...state.toDoLists[action.removeInfo.date].tasks];
	let idxOfTask = tasks.findIndex(el => el.id === action.removeInfo.id);

	tasks.splice(idxOfTask, 1);
	dateTaskAndStatus = updateObject(dateTaskAndStatus, {tasks: tasks});
	toDoLists[action.removeInfo.date] = dateTaskAndStatus;
	return updateObject(state, {toDoLists: toDoLists});
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
		case actionTypes.SELECT_DATE:
			return selectDate(state, action);
        case actionTypes.ADD_TASK:
			return addTask(state, action);
		case actionTypes.UPDATE_TASK:
			return updateTask(state, action);
		case actionTypes.REMOVE_TASK:
			return removeTask(state, action);
        default:
            return state;
    }
}

export default reducer;