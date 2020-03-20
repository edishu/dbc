import React, {Component} from 'react';
import { Container, Row, Col } from 'react-bootstrap';

// IMPORT FULLCALENDAR MODULES
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from '@fullcalendar/list';


// IMPORT USER MODULES
import './mainCalendar.css';

class DemoApp extends Component {

    handleDateClick = (info) => {
        console.log(info);
    }
    render() {
        return (
        <Container>
            <Row>
                <Col sm={4}>
                    <FullCalendar
                        defaultView="listDay"
                        plugins={[ listPlugin, interactionPlugin]}/>
                </Col>
                <Col sm={8}>
                    <FullCalendar 
                        defaultView="dayGridMonth" 
                        plugins={[ dayGridPlugin, interactionPlugin]} 
                        dateClick={this.handleDateClick}
                        handleWindowResize="true"/>
                </Col>
            </Row>
        </Container>        
    );
  };

}

export default DemoApp;