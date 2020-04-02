import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { Redirect } from 'react-router-dom';

class Sync extends Component {
    componentDidMount () {
        const userID = localStorage.getItem('userID');
        const tkn = localStorage.getItem('token');
        const scheduleData = {schedule: localStorage.getItem('toDoLists')};
        this.props.onSync(userID, tkn, scheduleData);
    }

    render () {
        return <Redirect to="/"/>;
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSync: (user, token, todolistData) => dispatch(actions.syncSchedule(user, token, todolistData))
    }; 
};

export default connect(null, mapDispatchToProps)(Sync);