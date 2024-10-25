import React, { useState, useEffect, useMemo } from "react";
import "./vetWorkingSchedule.css";
import { Divider } from "@mui/material";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { Tooltip } from "antd";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import {
  vetDetailSelector,
  userDataSelector,
} from "../../../../store/sellectors";
import {
  getAllVetAccountThunk,
  getUserDataThunk,
} from "../../../../store/apiThunk/userThunk";

import { getVetWorkingScheduleByIdSelector } from "../../../../store/sellectors";
import { getVetWorkingScheduleByIdThunk } from "../../../../store/apiThunk/workingSchedule";

const localizer = momentLocalizer(moment);

export default function VetWorkingSchedule(props) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const direction = props.direction;

  const allWorkingSchedule = useSelector(getVetWorkingScheduleByIdSelector);
  const vetDetail = useSelector(vetDetailSelector);
  const userDetail = useSelector(userDataSelector);

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  const fetchData = async () => {
    try {
      const veterinarianId = userDetail?.accountId;
      if (veterinarianId) {
        await Promise.all([
          dispatch(getVetWorkingScheduleByIdThunk(veterinarianId)),
          dispatch(getAllVetAccountThunk()),
        ]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    dispatch(getUserDataThunk());
  }, [dispatch]);

  useEffect(() => {
    if (vetDetail.length > 0) {
      const vetLookup = {};
      vetDetail.forEach((vet) => {
        vetLookup[vet.accountId] = vet.username;
      });

      const formattedEvents = transformEvents(allWorkingSchedule, vetLookup);
      setEvents(formattedEvents);
    }
  }, [allWorkingSchedule, vetDetail]);

  const transformEvents = (data, vetLookup) => {
    return data.map((item) => ({
      id: item.id,
      title: vetLookup[item.veterinarianId] || "Unknown Vet",
      start: new Date(item.workingDay + "T" + item.startTime),
      end: new Date(item.workingDay + "T" + item.endTime),
    }));
  };

  const handleEventClick = (event) => {
    console.log(event.id);  
    navigate(`/${direction}/vetDetailSchedule`, {
      state: { veterinarianId: event.id },
    });
  };

  const renderEvent = (event) => {
    const eventId = event.event.id;
    return (
      <Tooltip title={`${event.event.title}`} placement="top">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            cursor: "pointer",
            padding: "5px",
          }}
          onClick={() => handleEventClick(event.event)}
          aria-label={`Event: ${event.event.title}`}
        >
          <span>{event.event.title}</span>
        </div>
      </Tooltip>
    );
  };

  return (
    <>
      <div
        style={{
          justifyContent: "center",
          display: "flex",
          margin: "90px 100px",
          padding: "10px 20px 10px 20px",
          borderRadius: 40,
          background: "white",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
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
      <Divider />
    </>
  );
}
