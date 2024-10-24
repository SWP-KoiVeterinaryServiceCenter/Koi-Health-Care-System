import React, { useState, useEffect, useMemo } from "react";
import "./vetWorkingSchedule.css";
import Footer from "../../../authorize/landingPage/LandingPageDetail/Footer/Footer";
import { Box, Divider } from "@mui/material";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { Tooltip } from "antd";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
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
import {
  getVetWorkingScheduleByIdThunk,
  deleteWorkingScheduleThunk,
} from "../../../../store/apiThunk/workingSchedule";

const localizer = momentLocalizer(moment);

export default function VetWorkingSchedule() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const dispatch = useDispatch();
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

  const handleEventClick = (event) => {};

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
          margin: "70px 20px",
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
        />
      </div>
      <Divider />
    </>
  );
}
