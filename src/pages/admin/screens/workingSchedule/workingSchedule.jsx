import React, { useState, useEffect } from "react";
import Footer from "../../../authorize/landingPage/LandingPageDetail/Footer/Footer";
import { Box } from "@mui/material";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";

const localizer = momentLocalizer(moment);
import "./workingSchedule.css";

export default function WorkingSchedule() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  // Example API data (replace this with your actual API call)
  const apiData = [
    {
      id: "cc650000-3ed6-fa16-076c-08dcef610a9b",
      startTime: "10:34:00.7090000",
      endTime: "10:34:00.7090000",
      workingDay: "2024-10-18T10:34:00.709",
    },
    // Add more events as needed
  ];

  useEffect(() => {
    const transformEvents = (data) => {
      return data.map((item) => {
        const startDate = new Date(item.workingDay);
        const endDate = new Date(item.workingDay);

        // Extracting hours and minutes from startTime and endTime
        const [startHours, startMinutes] = item.startTime
          .split(":")
          .map(Number);
        const [endHours, endMinutes] = item.endTime.split(":").map(Number);

        startDate.setHours(startHours);
        startDate.setMinutes(startMinutes);
        endDate.setHours(endHours);
        endDate.setMinutes(endMinutes);

        return {
          title: `Event ${item.id}`, // Customize title as needed
          start: startDate,
          end: endDate,
        };
      });
    };

    // Transform the API data and set events
    const formattedEvents = transformEvents(apiData);
    setEvents(formattedEvents);
  }, []); // Run only on component mount

  // const handleSelectEvent = (event) => {
  //   alert(event.title);
  // };

  // const handleSelectSlot = (slotInfo) => {
  //   alert(
  //     `You selected ${slotInfo.start.toLocaleString()} - ${slotInfo.end.toLocaleString()}`
  //   );
  // };

  return (
    <>
      <div
        style={{
          justifyContent: "center",
          display: "flex",
          margin: "20px 20px 0px 20px",
          background: "white",
          padding: 20,
          borderRadius: 40,
        }}
      >
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600, width: 1000 }}
          // onSelectEvent={handleSelectEvent}
          // onSelectSlot={handleSelectSlot}
          selectable
          date={currentDate}
          onNavigate={(date) => setCurrentDate(date)}
        />
      </div>
      <Box pt={6} px={1} mt={6} sx={{ color: "black", background: "#ebe2e1" }}>
        <Footer />
      </Box>
    </>
  );
}
