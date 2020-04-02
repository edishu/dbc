import axios from '../../axios-schedule';
import * as actionTypes from './actionTypes';
import {retriveLists} from './index';

export const syncInit = () => {
    return {
        type: actionTypes.SYNC_INIT
    };
};

export const syncSuccess = () => {
    return {
        type: actionTypes.SYNC_SUCCESS
    };
};

export const syncFail = (message) => {
    return {
        type: actionTypes.SYNC_FAIL,
        errorMessage: message
    };
};

export const syncSchedule = (user, token, scheduleData) => {
    return dispatch => {
        dispatch(syncInit());
        axios.delete(`/${user}.json?auth=${token}`)
            .then(response => axios.post(`/${user}.json?auth=${token}`, scheduleData))
            .then(response => dispatch(syncSuccess()))
            .catch(error => dispatch(syncFail(error.message)));
    };
};

export const fetchSchedule = (user, token) => {
    return dispatch => {
        dispatch(syncInit());
        axios.get(`/${user}.json?auth=${token}`)
        .then(response => {
            localStorage.setItem('toDoLists', Object.values(response.data)[0].schedule);
            dispatch(retriveLists()); 
            dispatch(syncSuccess());})
        .catch(error => dispatch(syncFail(error.message)));
    };
};