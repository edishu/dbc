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
        updatingTask: false,
        updatingId: null,
        dateSuccessStatus: {},
    }

    // Utility class methods

    handleDateClick = (clickedDateinfo) => {
		this.props.onDateSelected(clickedDateinfo.dateStr);
	}

    startAddingTask = () => {
        this.setState({addingTask: true});
	}
	
	startUpdatingTask = (idOfTask) => {
        this.setState({updatingTask: true, updatingId: idOfTask});        
    }

    doneAddingUpdatingTask = () => {
        this.setState({addingTask: false, updatingTask: false, updatingId: null});
	}
	
	handleTaskClick = (info) => {
		this.props.onTaskUpdated(info);
    }
    
    // Lifcycle Methods
    static getDerivedStateFromProps(props) {
        let newDateSuccessStatus  = {}
        for(const date in props.toDoLists){
            newDateSuccessStatus[date] = props.toDoLists[date].status;
        }
        return {dateSuccessStatus: newDateSuccessStatus};
    }

    componentDidMount = () => {
        console.log("[Hero Page]: componentDidMount");
        this.props.onRetriveToDoLists();
    }

    render() {
        // console.log("[HeroPage] render called")
        let dateTaskAndStatus = this.props.toDoLists[this.props.dateSelected];
        if (!dateTaskAndStatus) {
            dateTaskAndStatus = {
                tasks: [],
                status: "fail"
            }
        }
   
        return (
            <Fragment>
                <Container>
                    <MyModal 
                    show={this.state.addingTask || this.state.updatingTask}
                    onHide={this.doneAddingUpdatingTask}

                    addingTask={this.state.addingTask}
                    updatingTask={this.state.updatingTask}
                    updateId={this.state.updatingId} 
                    selectedDate={this.props.dateSelected} 
                    addTask={(taskInfo) => {
                        this.props.onTaskAdded(taskInfo);
                        this.doneAddingUpdatingTask();
                        }}
                    updateTask={(changeInfo) => {
                        this.props.onTaskUpdated(changeInfo);
                        this.doneAddingUpdatingTask();
                        }}
                    removeTask={(removeInfo) => {
                        this.props.onTaskRemoved(removeInfo);
                        this.doneAddingUpdatingTask();
                    }}
                        />
                    
                    <Row>
                        <Col sm={4}>
                            <ToDoList 
                            selectedDate={this.props.dateSelected}
                            dateTaskAndStatus={dateTaskAndStatus}
							updateTask={this.startUpdatingTask}/>
                            <Row>
                                <Col>
                                    <Button variant="primary" onClick={this.startAddingTask}>
                                    Add Task
                                    </Button>
                                </Col>
                                <Col>
                                    <Button variant="success" onClick={this.props.onSaveToDoLists}>
                                    Save Tasks
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                        <Col sm={8}>
                            <MainCalendar 
                            dateClicked={this.handleDateClick} 
                            dateSuccessStatus={this.state.dateSuccessStatus}/>
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
		onDateSelected: (selectedDate) => dispatch(actions.selectDate(selectedDate)),
        onTaskUpdated: (changeInfo) => dispatch(actions.updateTask(changeInfo)),
        onTaskRemoved: (removeInfo) => dispatch(actions.removeTask(removeInfo)),
        onSaveToDoLists: () => dispatch(actions.saveLists()),
        onRetriveToDoLists: () => dispatch(actions.retriveLists()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeroPage);