// Import important libraries
import React, {Fragment}  from 'react';
import {Table} from 'react-bootstrap';

// Import CSS
import './toDoList.module.css';

const toDoList = (props) => {

    const rows = props.toDoList.tasks.map(task => (
        <tr onClick={() => console.log('here')}>
            <td>{task.start}</td>
            <td>{task.end}</td>
            <td>{task.task}</td>
        </tr>
    ));
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