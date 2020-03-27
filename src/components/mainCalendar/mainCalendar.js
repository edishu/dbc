// Import important libraries
import React, {Component} from 'react';

// Import FullCalendar modules
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";


// Import user defined modules
import './mainCalendar.css';
import {dateToStr} from '../../shared/utility';


class mainCalender extends Component {
    calendarRef = React.createRef();

    colorDay = (dayRenderInfo) => {
        const status = this.props.dateSuccessStatus[dateToStr(dayRenderInfo.date)];
        if (status==="fail" && dateToStr(dayRenderInfo.date) !== dateToStr(new Date())) {
            dayRenderInfo.el.classList.add("day-fail");
        } else if (status==="success" && dateToStr(dayRenderInfo.date) === dateToStr(new Date())) {
            dayRenderInfo.el.classList.remove("fc-today");
            dayRenderInfo.el.classList.add("day-success");
        } else if (status==="success") {
            dayRenderInfo.el.classList.add("day-success");
        }
    }

    refreshCal = () => {
        if (this.calendarRef.current) {
            let calendarApi = this.calendarRef.current.getApi()
            calendarApi.next();
            calendarApi.prev();
        }
    }

    render () {
        this.refreshCal();
        return (
            <FullCalendar
                ref={this.calendarRef}
                dayRender={this.colorDay}
                defaultView="dayGridMonth" 
                plugins={[ dayGridPlugin, interactionPlugin]} 
                dateClick={this.props.dateClicked}
                selectable="true"
                handleWindowResize="true"/>);
    }

}

export default mainCalender;