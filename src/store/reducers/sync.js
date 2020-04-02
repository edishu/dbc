import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
    syncing: false,
};

const syncInit = (state) => {
    return updateObject(state, {syncing: true});
};

const syncSuccess = (state) => {
    console.log('Sync Successful!')
    return updateObject(state, {syncing: false});
};

const syncFail = (state, action) => {
    console.log('Sync failed.', action.errorMessage)
    return updateObject(state, {syncing: false});
};

const reducer = (state= initialState, action) => {
    switch (action.type) {

        case actionTypes.SYNC_INIT:
            return syncInit(state);
        
        case actionTypes.SYNC_SUCCESS:
            return syncSuccess(state);
        
        case actionTypes.SYNC_FAIL:
            return syncFail(state, action);

        default:
            return state;
    }
};

export default reducer;