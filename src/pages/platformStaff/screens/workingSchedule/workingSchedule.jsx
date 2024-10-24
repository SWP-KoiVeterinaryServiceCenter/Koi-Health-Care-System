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

import { vetDetailSelector } from "../../../../store/sellectors";
import { getAllVetAccountThunk } from "../../../../store/apiThunk/userThunk";
import { allWorkingScheduleSelector } from "../../../../store/sellectors";
import { getAllWorkingScheduleThunk } from "../../../../store/apiThunk/workingSchedule";

const localizer = momentLocalizer(moment);

const WorkingSchedule = (props) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const direction = props.direction;

  const allWorkingSchedule = useSelector(allWorkingScheduleSelector);
  const vetDetail = useSelector(vetDetailSelector);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllWorkingScheduleThunk());
      await dispatch(getAllVetAccountThunk());
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (vetDetail.length > 0) {
      // Create a lookup for veterinarian IDs and usernames
      const vetLookup = {};
      vetDetail.forEach((vet) => {
        vetLookup[vet.accountId] = vet.username; 
      });

      const formattedEvents = transformEvents(allWorkingSchedule, vetLookup);
      setEvents(formattedEvents);
    }
  }, [allWorkingSchedule, vetDetail]); // Add vetDetail to dependencies

  const transformEvents = (data, vetLookup) => {
    return data.map((item) => {
      const startDate = new Date(item.workingDay);
      const endDate = new Date(item.workingDay);
      const [startHours, startMinutes] = item.startTime.split(':').map(Number);
      const [endHours, endMinutes] = item.endTime.split(':').map(Number);

      startDate.setHours(startHours, startMinutes);
      endDate.setHours(endHours, endMinutes);

      // Use the vetLookup to get the veterinarian's username
      const vetName = vetLookup[item.veterinarianId] || "Unknown Vet";

      return {
        id: item.id,
        title: `${vetName}`, 
        start: startDate,
        end: endDate,
      };
    });
  };

  const renderEvent = (event) => (
    <Tooltip title={`${event.title}`} placement="top">
      <div>{event.title}</div>
    </Tooltip>
  );

  // Handle event click
  const handleEventClick = (event) => {
    navigate(`/${direction}/updateWorkingSchedule`, {
      state: { allWorkingSchedule: event.id },
    });
  };

  return (
    <>
      <div
        style={{
          justifyContent: "center",
          display: "flex",
          margin: "0px 20px 20px 20px",
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
            event: renderEvent,
          }}
          onSelectEvent={handleEventClick}
        />
      </div>
      <Box pt={6} px={1} mt={6} sx={{ color: "black", background: "#ebe2e1" }}>
        <Footer />
      </Box>
    </>
  );
};

export default WorkingSchedule;
