import React, { useState, useEffect } from "react";
import Footer from "../../../authorize/landingPage/LandingPageDetail/Footer/Footer";
import { Box } from "@mui/material";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { Tooltip } from "antd";
import "./workingSchedule.css";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { vetDetailSelector } from "../../../../store/sellectors";
import { getAllVetAccountThunk } from "../../../../store/apiThunk/userThunk";
import { allWorkingScheduleSelector } from "../../../../store/sellectors";
import { getAllWorkingScheduleThunk } from "../../../../store/apiThunk/workingSchedule";
import { deleteWorkingScheduleThunk } from "../../../../store/apiThunk/workingSchedule";

const localizer = momentLocalizer(moment);

const WorkingSchedule = (props) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const direction = props.direction;

  const allWorkingSchedule = useSelector(allWorkingScheduleSelector);
  const vetDetail = useSelector(vetDetailSelector);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     await dispatch(getAllWorkingScheduleThunk());
  //     await dispatch(getAllVetAccountThunk());
  //   };
  //   fetchData();
  // }, [dispatch]);


  useEffect(() => {
    fetchData(); // Fetch the initial data
  }, [dispatch]);

  const fetchData = async () => {
    await dispatch(getAllWorkingScheduleThunk());
    await dispatch(getAllVetAccountThunk());
  };
  
  useEffect(() => {
    if (vetDetail.length > 0) {
      const vetLookup = {};
      vetDetail.forEach((vet) => {
        vetLookup[vet.accountId] = vet.username;
      });

      const formattedEvents = transformEvents(allWorkingSchedule, vetLookup);
      console.log("Formatted Events:", formattedEvents); // Log formatted events
      setEvents(formattedEvents);
    }
  }, [allWorkingSchedule, vetDetail]);

  const transformEvents = (data, vetLookup) => {
    return data.map((item) => {
      console.log("Transforming item:", item); // Log each item
      return {
        id: item.id, // Ensure this is set correctly
        title: vetLookup[item.veterinarianId] || "Unknown Vet",
        start: new Date(item.workingDay + 'T' + item.startTime), // Adjust as necessary
        end: new Date(item.workingDay + 'T' + item.endTime), // Adjust as necessary
      };
    });
  };

  const handleDeleteSchedule = (id) => {
    console.log("Deleting event with id:", id); // Log the ID being passed
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteWorkingScheduleThunk(id))
          .unwrap()
          .then(() => {
            Swal.fire({
              title: "Success!",
              text: "Schedule deleted successfully!",
              icon: "success",
              showCancelButton: false,
              showConfirmButton: false,
              background: "white",
              timer: 1500,
              timerProgressBar: true,
            }).then(() => {
              fetchData(); // Fetch the working schedule again after deletion
            });
          })
          .catch((error) => {
            Swal.fire({
              title: "Error!",
              text: error.message,
              icon: "error",
              showConfirmButton: true,
              background: "white",
            });
          });
      }
    });
  };

  const renderEvent = (event) => {
    console.log("Rendering event:", event); // Log the event object
    const eventId = event.event.id; // Access the id correctly
    return (
      <Tooltip title={`${event.event.title}`} placement="top">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
          onClick={() => handleEventClick(event.event)}
        >
          <span>{event.event.title}</span>
          <DeleteIcon
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              e.stopPropagation(); // Prevent click event on the parent
              console.log(`Attempting to delete event with id: ${eventId}`); // Log the ID
              handleDeleteSchedule(eventId); // Call delete function with event ID
            }}
          />
        </div>
      </Tooltip>
    );
  };

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
          margin: "50px 20px 20px 20px",
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
      <Box pt={6} px={1} mt={6} sx={{ color: "black", background: "#ebe2e1"}}>
        <Footer />
      </Box>
    </>
  );
};

export default WorkingSchedule;
