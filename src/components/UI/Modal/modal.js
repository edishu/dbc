import React, {Component} from 'react';
import { Modal, Button, Form, Col } from 'react-bootstrap';

class MyModal extends Component {
	state = {
		start: null,
		end: null,
		taskDetail: null,
		status: "Current"
	};

    render () {
		return (
			<Modal
				show={this.props.show}
				onHide={this.props.onHide}
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
					<Form.Group as={Col} controlId="formGridStartTime">
					<Form.Label>Start</Form.Label>
					<Form.Control 
						type="text" 
						placeholder="Start Time" 
						onChange={event => this.state.start = event.target.value}
						/>
					</Form.Group>

					{/* <Form.Group as={Col} controlId="formGridStartTimeAMPM">
					<Form.Label>AM/PM</Form.Label>
					<Form.Control as="select" value="AM">
					<option>AM</option>
					<option>PM</option>
					</Form.Control>
					</Form.Group> */}

					<Form.Group as={Col} controlId="formGridEndTime">
					<Form.Label>End</Form.Label>
					<Form.Control 
						type="text" 
						placeholder="End Time" 
						onChange={event => this.state.end = event.target.value}/>
					</Form.Group>

					{/* <Form.Group as={Col} controlId="formGridEndTimeAMPM">
					<Form.Label>AM/PM</Form.Label>
					<Form.Control as="select" value="AM">
					<option>AM</option>
					<option>PM</option>
					</Form.Control>
					</Form.Group> */}
					</Form.Row>

					<Form.Row>
					<Form.Group as={Col} controlId="formGridTask">
						<Form.Label>Task</Form.Label>
						<Form.Control 
							placeholder="Add testing to project" 
							onChange={event => this.state.taskDetail = event.target.value}/>
					</Form.Group>
					<Form.Group as={Col} controlId="formGridTaskCompletion">
						<Form.Check type="checkbox" label="Mark Completed" />
					</Form.Group>
					</Form.Row>

				</Form>
				</Modal.Body>

				<Modal.Footer>
				<Button onClick={this.props.onHide} variant="secondary">Cancel</Button>
				<Button onClick={() => this.props.addTask({
					date: this.props.selectedDate,
					task: {start: this.state.start,
							end:  this.state.end,
							taskDetail: this.state.taskDetail,
							status: this.state.status}
				})} variant="primary">Add</Button>
				</Modal.Footer>

			</Modal>
		);
	}
}

export default MyModal;