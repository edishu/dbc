// Import important libraries
import React from 'react';

// Import FullCalendar modules
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";


// Import user defined modules
import './mainCalendar.css';

const handleDateClick = (info) => {
    console.log(info.dateStr);
}

const mainCalender = (props) => {
        return (
        <FullCalendar 
            defaultView="dayGridMonth" 
            plugins={[ dayGridPlugin, interactionPlugin]} 
            dateClick={handleDateClick}
            handleWindowResize="true"/>      
    );
}

export default mainCalender;