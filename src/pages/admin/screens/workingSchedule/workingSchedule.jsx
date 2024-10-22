import React, { useState, useEffect } from "react";
import Footer from "../../../authorize/landingPage/LandingPageDetail/Footer/Footer";
import { Box } from "@mui/material";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { allWorkingScheduleSelector } from "../../../../store/sellectors";
import { getAllWorkingScheduleThunk } from "../../../../store/apiThunk/workingSchedule";
import "./workingSchedule.css";

const localizer = momentLocalizer(moment);

const transformEvents = (data) => {
  return data.map((item) => {
    const startDate = new Date(item.workingDay);
    const endDate = new Date(item.workingDay);
    const [startHours, startMinutes] = item.startTime.split(":").map(Number);
    const [endHours, endMinutes] = item.endTime.split(":").map(Number);
    startDate.setHours(startHours, startMinutes);
    endDate.setHours(endHours, endMinutes);
    return {
      title: `${item.name || item.id}`, // More descriptive title
      start: startDate,
      end: endDate,
    };
  });
};

export default function WorkingSchedule() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const dispatch = useDispatch();
  const allWorkingSchedule = useSelector(allWorkingScheduleSelector);

  useEffect(() => {
    dispatch(getAllWorkingScheduleThunk());
  }, [dispatch]);

  useEffect(() => {
    const formattedEvents = transformEvents(allWorkingSchedule);
    setEvents(formattedEvents);
  }, [allWorkingSchedule]);

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
        />
      </div>
      <Box pt={6} px={1} mt={6} sx={{ color: "black", background: "#ebe2e1" }}>
        <Footer />
      </Box>
    </>
  );
}
