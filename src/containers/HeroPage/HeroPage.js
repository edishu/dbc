// Import important libraries
import React, {Component, Fragment} from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import {connect} from 'react-redux';

// Import user defined components
import MainCalendar from '../../components/mainCalendar/mainCalendar'; 
import ToDoList from '../../components/toDoList/toDoList'; 
import MyModal from '../../components/UI/Modal/modal';

import * as actions from '../../store/actions/index';

class HeroPage extends Component {
    state = {
        addingTask: false,
    }

    startAddingTask = () => {
        this.setState({addingTask: true});
    }

    doneAddingTask = () => {
        this.setState({addingTask: false});
    }

    render() {
        let toDoList = this.props.toDoLists.filter(lstObj => lstObj.date === this.props.dateSelected);
        if (toDoList.length === 0) {
            toDoList = [{
                date: this.props.dateSelected,
                tasks: [],
                status: "current"
            }]
        }

        return (
            <Fragment>
                <Container>
                    <MyModal 
                    show={this.state.addingTask}
                    onHide={this.doneAddingTask}
                    selectedDate={this.props.dateSelected} 
                    addTask={(taskInfo) => {
                        this.doneAddingTask();
                        this.props.onTaskAdded(taskInfo);
                        }}/>
                    <Row>
                        <Col sm={4}>
                            <ToDoList 
                            selectedDate={this.props.dateSelected}
                            toDoList={toDoList[0]}/>
                            <Button variant="primary" onClick={this.startAddingTask}>
                                Add Task
                            </Button>
                        </Col>
                        <Col sm={8}>
                            <MainCalendar/>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        toDoLists: state.heroPage.toDoLists,
        dateSelected: state.heroPage.selectedDate,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onTaskAdded: (taskInfo) => dispatch(actions.addTask(taskInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeroPage);