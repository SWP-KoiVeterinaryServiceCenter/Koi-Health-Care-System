import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { Divider } from "antd";
import Footer from "../../../authorize/landingPage/LandingPageDetail/Footer/Footer";
import { Box } from "@mui/material";
const localizer = momentLocalizer(moment);
import "./workingSchedule.css";

const events = [
  {
    title: "Kelsie Meyer",
    servicename:"1111111111111111",
    start: new Date(2024, 9, 17, 14, 30),
    end: new Date(2024, 9, 17, 15, 30),
  },
  {
    title: "Mark Carusso",
    start: new Date(2024, 9, 17, 10, 0),
    end: new Date(2024, 9, 17, 11, 0),
  },
  {
    title: "Taylor Greeno",
    start: new Date(2024, 9, 18, 9, 0),
    end: new Date(2024, 9, 18, 10, 0),
  },
  {
    title: "Isaiah Jian",
    start: new Date(2024, 9, 18, 11, 0),
    end: new Date(2024, 9, 18, 12, 0),
  },
  {
    title: "Nazarick",
    start: new Date(2024, 9, 18, 13, 30),
    end: new Date(2024, 9, 18, 14, 30),
  },
  {
    title: "B2487327",
    start: new Date(2024, 9, 19, 15, 0),
    end: new Date(2024, 9, 19, 16, 0),
  },
  {
    title: "Kelsie Meyer",
    start: new Date(2024, 9, 20, 10, 0),
    end: new Date(2024, 9, 20, 11, 0),
  },
  {
    title: "Mark Carusso",
    start: new Date(2024, 9, 20, 12, 0),
    end: new Date(2024, 9, 20, 13, 0),
  },
  {
    title: "Taylor Greeno",
    start: new Date(2024, 9, 21, 9, 0),
    end: new Date(2024, 9, 21, 10, 0),
  },
  {
    title: "Isaiah Jian",
    start: new Date(2024, 9, 22, 14, 0),
    end: new Date(2024, 9, 22, 15, 0),
  },
  {
    title: "Nazarick",
    start: new Date(2024, 9, 23, 11, 0),
    end: new Date(2024, 9, 23, 12, 0),
  },
  {
    title: "B2487327",
    start: new Date(2024, 9, 24, 13, 0),
    end: new Date(2024, 9, 24, 14, 0),
  },
  {
    title: "Kelsie Meyer",
    start: new Date(2024, 9, 25, 15, 0),
    end: new Date(2024, 9, 25, 16, 0),
  },
  {
    title: "Mark Carusso",
    start: new Date(2024, 9, 26, 10, 0),
    end: new Date(2024, 9, 26, 11, 0),
  },
  {
    title: "Taylor Greeno",
    start: new Date(2024, 9, 27, 12, 0),
    end: new Date(2024, 9, 27, 13, 0),
  },
  {
    title: "Isaiah Jian",
    start: new Date(2024, 9, 28, 14, 0),
    end: new Date(2024, 9, 28, 15, 0),
  },
  {
    title: "Nazarick",
    start: new Date(2024, 9, 29, 9, 0),
    end: new Date(2024, 9, 29, 10, 0),
  },
  {
    title: "B2487327",
    start: new Date(2024, 9, 30, 11, 0),
    end: new Date(2024, 9, 30, 12, 0),
  },
];

export default function WorkingSchedule() {
  const [currentDate, setCurrentDate] = useState(new Date());

  //   const handleSelectEvent = (event) => {
  //     alert(event.title);
  //   };

  //   const handleSelectSlot = (slotInfo) => {
  //     alert(
  //       `You selected ${slotInfo.start.toLocaleString()} - ${slotInfo.end.toLocaleString()}`
  //     );
  //   };

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
          //   onSelectEvent={handleSelectEvent}
          //   onSelectSlot={handleSelectSlot}
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
