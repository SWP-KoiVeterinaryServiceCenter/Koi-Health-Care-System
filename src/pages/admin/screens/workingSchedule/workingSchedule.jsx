import React, { useState, useEffect } from "react";
import Footer from "../../../authorize/landingPage/LandingPageDetail/Footer/Footer";
import { Box } from "@mui/material";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { Tooltip } from "antd";
import "./workingSchedule.css";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { allWorkingScheduleSelector } from "../../../../store/sellectors";
import { getAllWorkingScheduleThunk } from "../../../../store/apiThunk/workingSchedule";

const localizer = momentLocalizer(moment);

// const transformEvents = (data) => {
//   return data.map((item) => {
//     const startDate = new Date(item.workingDay);
//     const endDate = new Date(item.workingDay);
//     const [startHours, startMinutes] = item.startTime.split(":").map(Number);
//     const [endHours, endMinutes] = item.endTime.split(":").map(Number);

//     startDate.setHours(startHours, startMinutes);
//     endDate.setHours(endHours, endMinutes);

//     const description = `Start: ${startDate.toLocaleTimeString()} - End: ${endDate.toLocaleTimeString()}`;

//     return {
//       title: `${item.name || item.id}`,
//       start: startDate,
//       end: endDate,
//       description,
//       // id: item.id, // Include the item's id for navigation
//     };
//   });
// };


const transformEvents = (data) => {
  return data.map((item) => {
    const startDate = new Date(item.workingDay);
    const endDate = new Date(item.workingDay);

    // Convert startTime and endTime from minutes to hours and minutes
    const startHours = Math.floor(item.startTime / 60);
    const startMinutes = item.startTime % 60;
    const endHours = Math.floor(item.endTime / 60);
    const endMinutes = item.endTime % 60;

    // Set the hours and minutes for start and end dates
    startDate.setHours(startHours, startMinutes);
    endDate.setHours(endHours, endMinutes);

    const description = `Start: ${startDate.toLocaleTimeString()} - End: ${endDate.toLocaleTimeString()}`;

    return {
      title: `Veterinarian ID: ${item.veterinarianId}`, // Adjust title based on available data
      start: startDate,
      end: endDate,
      description,
      id: item.veterinarianId, // Include the veterinarianId for navigation
    };
  });
};


export default function WorkingSchedule(props) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const direction = props.direction;

  const allWorkingSchedule = useSelector(allWorkingScheduleSelector);

  useEffect(() => {
    dispatch(getAllWorkingScheduleThunk());
  }, [dispatch]);

  useEffect(() => {
    const formattedEvents = transformEvents(allWorkingSchedule);
    setEvents(formattedEvents);
  }, [allWorkingSchedule]);

  const renderEvent = (event) => (
    <Tooltip title={`${event.title} - ${event.description}`} placement="top">
      <div>{event.title}</div>
    </Tooltip>
  );

  // New function to handle event click
  const handleEventClick = (event) => {
    navigate(`/${direction}/updateWorkingSchedule`, {
      // state: { eventId: event.id }, // Pass the event id or any other data needed
    });
  };

  return (
    <>
      <div
        style={{
          justifyContent: "center",
          display: "flex",
          margin: "20px",
          padding: 20,
          borderRadius: 40,
          background: "white",
        }}
      >
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600, width: 1000 }}
          selectable
          date={currentDate}
          onNavigate={setCurrentDate}
          components={{
            event: renderEvent
          }}
          onSelectEvent={handleEventClick} // Handle event click here
        />
      </div>
      <Box pt={6} px={1} mt={6} sx={{ color: "black", background: "#ebe2e1" }}>
        <Footer />
      </Box>
    </>
  );
}


