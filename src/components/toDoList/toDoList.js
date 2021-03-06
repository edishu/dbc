// Import important libraries
import React, {Fragment}  from 'react';
import {Table} from 'react-bootstrap';

import classes from './toDoList.module.css';
import {changeDateFormat} from '../../shared/utility';

const toDoList = (props) => {
    props.dateTaskAndStatus.tasks.sort((a,b) => {
        if(a.start < b.start) {
            return -1;
        } 
        if(a.start > b.start) {
            return 1;
        }
        return 0;
    });
    const rows = props.dateTaskAndStatus.tasks.map(task => {
        const startHourRaw = task.start.getHours();
        const endHourRaw = task.end.getHours();
        const startMinuteRaw = task.start.getMinutes().toString();
        const endMinuteRaw = task.end.getMinutes().toString();

        const startHourUsed = startHourRaw>12 ? startHourRaw-12 : startHourRaw;
        const endHourUsed = endHourRaw>12 ? endHourRaw-12 : endHourRaw;

        const startMinuteUsed = startMinuteRaw.length === 2 ? startMinuteRaw : "0" + startMinuteRaw
        const endMinuteUsed = endMinuteRaw.length === 2 ? endMinuteRaw : "0" + endMinuteRaw

        const startAMPM = startHourRaw>=12 ? "PM" : "AM";
        const endAMPM = endHourRaw>=12 ? "PM" : "AM";

        let rowColor;
        rowColor = task.completed ? "table-success" : "table-warning";

        return (
        <tr className={rowColor}
            key={task.id} 
            onClick={() => props.updateTask(task.id)}>

            <td>{`${startHourUsed}:${startMinuteUsed} ${startAMPM}`}</td>
            <td>{`${endHourUsed}:${endMinuteUsed} ${endAMPM}`}</td>
            <td>{task.taskDetail}</td>

        </tr>
    )}
    );

    return (
        <Fragment>
            <div className={classes.myTable}>
                <Table striped bordered hover >
                    <thead>
                    <tr>
                        <th>Start</th>
                        <th>End</th>
                        <th>Task</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rows}
                    </tbody>
                </Table>
            </div>
        </Fragment>
      );
};

export default toDoList;