import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Modal, Button, Form, Col } from 'react-bootstrap';
import classes from './modal.module.css';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from '@material-ui/pickers';

class MyModal extends Component {

	state = {
		start: new Date(),
		end: new Date(),
		taskDetail: null,
		completed: false,
		getDerivedStateFromPropsCalled: false
	}

	setStateToInit = () => {
		this.setState({
			start: new Date(),
			end: new Date(),
			taskDetail: null,
			completed: false,
			getDerivedStateFromPropsCalled: false
		});
	}

	onHideModal = () => {
		this.setStateToInit();
		this.props.onHide();
	} 

	onAddHandler = () => {
		this.props.addTask({
			date: this.props.selectedDate,
			task: {start: this.state.start,
					end:  this.state.end,
					taskDetail: this.state.taskDetail,
					completed: this.state.completed}
		});

		this.setStateToInit();
	}

	onUpdateHandler = () => {
		this.props.updateTask({
			date: this.props.selectedDate,
			id: this.props.updateId,
			task: {start: this.state.start,
					end:  this.state.end,
					taskDetail: this.state.taskDetail,
					completed: this.state.completed}
		});
		this.setStateToInit();
	}

	onRemoveHandler = () => {
		this.props.removeTask({id: this.props.updateId,
								date: this.props.selectedDate,});
		this.setStateToInit();
	}

	static getDerivedStateFromProps(props, state) {

		if(props.updatingTask && !state.getDerivedStateFromPropsCalled) {
			const stateToSet = props.toDoLists[props.selectedDate].tasks.find(element => element.id === props.updateId);
			return {start: stateToSet.start,
				end: stateToSet.end,
				taskDetail: stateToSet.taskDetail,
				completed: stateToSet.completed,
				getDerivedStateFromPropsCalled: true};
		}
		return null;
	}

    render () {

		let addUpdateButton = <Button onClick={this.onAddHandler} 												variant="primary">Add</Button>;
		let removeButton = null;
		if(this.props.updatingTask) {
			addUpdateButton = <Button onClick={this.onUpdateHandler} 										variant="primary">Update</Button>;

			removeButton =  <Button onClick={this.onRemoveHandler}										variant="danger">Remove Task</Button> ;
		}

		return (
			<Modal
				show={this.props.show}
				onHide={this.onHideModal}
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				centered>

				<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Enter Task Details
				</Modal.Title>
				</Modal.Header>

				<Modal.Body>
				<Form>
					<Form.Row>
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<Col sm={5}>
        						<KeyboardTimePicker
									margin="normal"
									id="time-picker"
									label="Start Time"
									value={this.state.start}
									onChange={date => this.setState({start: date})}
									KeyboardButtonProps={{
										'aria-label': 'change time',
									}}
									/>
							</Col>
							<Col sm={5}>
								<KeyboardTimePicker
									margin="normal"
									id="time-picker"
									label="End Time"
									value={this.state.end}
									onChange={date => this.setState({end: date})}
									KeyboardButtonProps={{
										'aria-label': 'change time',
									}}
									/>
							</Col>
    					</MuiPickersUtilsProvider>
					</Form.Row>
					<Form.Row className="align-items-center">
						<Col sm={7}>
							<Form.Group controlId="formGridTask">
								<Form.Label>Task</Form.Label>
								<Form.Control 
									placeholder="Add testing to project" 
									defaultValue={this.state.taskDetail ? this.state.taskDetail : null}
									onChange={event => this.setState({taskDetail: event.target.value})}/>
							</Form.Group>
						</Col>
						<Col sm={1}></Col>
						<Col sm={4} className="align-items-center " >
							<Form.Group controlId="formGridTaskCompletion" className={classes.fixMargin}>
								<Form.Check 
									type="switch" 
									id="isComplete"
									label="Mark Completed"
									checked={this.state.completed}
									onChange={() => {
										this.setState({completed: !this.state.completed})}} />
							</Form.Group>
						</Col>
					</Form.Row>

				</Form>
				</Modal.Body>

				<Modal.Footer>
				<Button onClick={this.onHideModal} variant="secondary">Cancel</Button>
				{removeButton}
				{addUpdateButton}
				</Modal.Footer>

			</Modal>
		);
	}
}

const mapStateToProps = state => {
    return {
        toDoLists: state.heroPage.toDoLists,
    };
};

export default connect(mapStateToProps)(MyModal);