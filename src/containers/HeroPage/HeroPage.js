// Import important libraries
import React, {Component, Fragment} from 'react';
import { Button, Container, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import {connect} from 'react-redux';

// Import user defined components
import MainCalendar from '../../components/mainCalendar/mainCalendar'; 
import ToDoList from '../../components/toDoList/toDoList'; 
import MyModal from '../../components/UI/Modal/modal';
import classes from './HeroPage.module.css';
import {changeDateFormat} from '../../shared/utility';

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

        let removeButton = null;
        if (dateTaskAndStatus.tasks.length !== 0) {
        removeButton = (<OverlayTrigger 
                            placement='top'
                            overlay={
                            <Tooltip>
                                Remove All
                            </Tooltip>
                        }>
                            <Button variant="danger" onClick={this.props.onRemoveAll} style={{fontSize: "0.9rem"}}>
                            X
                            </Button>
                        </OverlayTrigger>);}
   
        return (
            <Fragment>
                <div className={classes.heroPage}>
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
                    
                    <Row >
                        {/* Body Left */}
                        <Col sm={5} className="align-self-top">
                            <Row className="justify-content-md-center">
                                <Col sm={{span: 6, offset:3}}>
                                <h3>{changeDateFormat(this.props.dateSelected)}</h3>
                                </Col>
                                <Col >
                                {removeButton}
                                </Col>
                            </Row>
                            <ToDoList 
                            selectedDate={this.props.dateSelected}
                            dateTaskAndStatus={dateTaskAndStatus}
							updateTask={this.startUpdatingTask}/>
                            <Row>
                                <Col>
                                    <Button variant="outline-secondary" onClick={this.props.onCopyYesterday} style={{fontSize: "0.9rem"}}>
                                    Copy Yesterday
                                    </Button>
                                </Col>
                                <Col>
                                    <Button variant="primary" onClick={this.startAddingTask} style={{fontSize: "0.9rem"}}>
                                    Add Task
                                    </Button>
                                </Col>
                                <Col>
                                    <OverlayTrigger 
                                    placement='bottom'
                                    overlay={
                                        <Tooltip>
                                          Save All tasks to Local Storage
                                        </Tooltip>
                                      }>
                                    <Button variant="success" onClick={this.props.onSaveToDoLists} style={{fontSize: "0.9rem"}}>
                                    Save
                                    </Button>
                                    </OverlayTrigger>
                                </Col>
                            </Row>
                        </Col>

                        {/* Body Right */}
                        <Col sm={7} className="align-items-top">
                            <MainCalendar 
                            dateClicked={this.handleDateClick} 
                            dateSuccessStatus={this.state.dateSuccessStatus}/>
                        </Col>
                    </Row>
                </Container>
                </div>
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
        onCopyYesterday: () => dispatch(actions.copyYesterday()),
        onRemoveAll: () => dispatch(actions.removeAll()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeroPage);