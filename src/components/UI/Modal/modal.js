import React from 'react';
import { Modal, Button, Form, Col } from 'react-bootstrap';

const myModal = (props) => {
    return (
      <Modal
        show={props.show}
        onHide={props.onHide}
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
              <Form.Control type="text" placeholder="Start Time" />
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
              <Form.Control type="text" placeholder="End Time" />
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
                <Form.Control placeholder="Add testing to project" />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridTaskCompletion">
                <Form.Check type="checkbox" label="Mark Completed" />
              </Form.Group>
            </Form.Row>

          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={props.onHide} variant="secondary">Cancel</Button>
          <Button onClick={() => props.addTask({
            date: props.selectedDate,
            // task: {start: formGridStartTime.value},
            status: "Current"
          })} variant="primary">Add</Button>
        </Modal.Footer>

      </Modal>
    );
}

export default myModal;