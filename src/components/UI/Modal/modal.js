import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Modal, Button, Form, Col } from 'react-bootstrap';

class MyModal extends Component {

	state = {
		start: null,
		startAMPM: "AM",
		end: null,
		endAMPM: "AM",
		taskDetail: null,
		completed: false,
		getDerivedStateFromPropsCalled: false
	}

	setStateToInit = () => {
		this.setState({
			start: null,
			startAMPM: "AM",
			end: null,
			endAMPM: "AM",
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
					startAMPM: this.state.startAMPM,
					end:  this.state.end,
					endAMPM: this.state.endAMPM,
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
					startAMPM: this.state.startAMPM,
					end:  this.state.end,
					endAMPM: this.state.endAMPM,
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
						<Col sm={4}>
							<Form.Group controlId="formGridStartTime">
							<Form.Label>Start</Form.Label>
							<Form.Control 
							type="text" 
							placeholder="Start Time"
							defaultValue={this.state.start ? this.state.start : null} 
							onChange={event => this.setState({start: event.target.value})}
							/>
							</Form.Group>
						</Col>
						<Col sm={2}>
							<Form.Group controlId="formGridStartTimeAMPM">
							<Form.Label>AM/PM</Form.Label>
							<Form.Control 
								as="select" 
								defaultValue={this.state.startAMPM}
								onChange={event => this.setState({startAMPM: event.target.value})}>
							<option>AM</option>
							<option>PM</option>
							</Form.Control>
							</Form.Group>
						</Col>

						<Col sm={4}>
							<Form.Group controlId="formGridEndTime">
							<Form.Label>End</Form.Label>
							<Form.Control 
								type="text" 
								placeholder="End Time"
								defaultValue={this.state.end ? this.state.end : null}
								onChange={event => this.setState({end: event.target.value})}/>
							</Form.Group>
						</Col>

						<Col sm={2}>
							<Form.Group controlId="formGridEndTimeAMPM">
							<Form.Label>AM/PM</Form.Label>
							<Form.Control 
								as="select" 
								defaultValue={this.state.endAMPM}
								onChange={event => this.setState({endAMPM: event.target.value})}>
							<option>AM</option>
							<option>PM</option>
							</Form.Control>
							</Form.Group>
						</Col>
					</Form.Row>

					<Form.Row>
					<Form.Group as={Col} controlId="formGridTask">
						<Form.Label>Task</Form.Label>
						<Form.Control 
							placeholder="Add testing to project" 
							defaultValue={this.state.taskDetail ? this.state.taskDetail : null}
							onChange={event => this.setState({taskDetail: event.target.value})}/>
					</Form.Group>
					<Form.Group as={Col} controlId="formGridTaskCompletion">
						<Form.Check 
							type="switch" 
							id="isComplete"
							label="Mark Completed"
							checked={this.state.completed}
							onChange={() => {
								this.setState({completed: !this.state.completed})}} />
					</Form.Group>
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