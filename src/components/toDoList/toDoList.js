// Import important libraries
import React, {Fragment}  from 'react';
import {Table} from 'react-bootstrap';

// Import CSS
import './toDoList.module.css';

const toDoList = (props) => {

    const rows = props.dateTaskAndStatus.tasks.map(task => {
        // console.log("todoList row genetation", task.id);
        return (
        <tr key={task.id} onClick={() => props.updateTask(task.id)}>
            <td>{`${task.start} ${task.startAMPM}`}</td>
            <td>{`${task.end} ${task.endAMPM}`}</td>
            <td>{task.taskDetail}</td>
        </tr>
    )}
    );

    return (
        <Fragment>
            <h1>{props.selectedDate}</h1>
            <Table striped bordered hover>
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
        </Fragment>
      );
};

export default toDoList;