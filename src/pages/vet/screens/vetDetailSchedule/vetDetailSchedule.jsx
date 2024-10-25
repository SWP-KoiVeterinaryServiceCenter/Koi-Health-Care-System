import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Divider, Button } from "@mui/material";
import { getUserDataThunk } from "../../../../store/apiThunk/userThunk";
import { getAllWorkingScheduleByIdThunk } from "../../../../store/apiThunk/workingSchedule";
import {
  allWorkingScheduleByIdSelector,
  vetDetailSelector,
} from "../../../../store/sellectors";
import { useLocation } from "react-router-dom";
import "./vetDetailSchedule.css";

export default function VetDetailSchedule() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { veterinarianId } = location.state || {};
  const allWorkingSchedule = useSelector(allWorkingScheduleByIdSelector);
  const vetDetail = useSelector(vetDetailSelector);

  useEffect(() => {
    if (veterinarianId) {
      dispatch(getAllWorkingScheduleByIdThunk(veterinarianId));
    }
    dispatch(getUserDataThunk());
  }, [dispatch, veterinarianId]);

  // Display loading or error handling
  if (!allWorkingSchedule) {
    return <div>No schedule data available.</div>;
  }

  // Find the veterinarian's username from the vetDetail
  const veterinarian = vetDetail.find(
    (vet) => vet.accountId === allWorkingSchedule.veterinarianId
  );
  const username = veterinarian ? veterinarian.username : "Unknown";

  return (
    <>
      <div className="profile-container-1">
        <div className="profile-user-info">
          <div className="user-info-content">
            <p>
              Vet Username: <span>{username}</span>
            </p>
            <p>
              Start Time: <span>{allWorkingSchedule.startTime}</span>
            </p>
            <p style={{ display: "flex" }}>
              End Time:{" "}
              <span className="profile-truncated">
                {allWorkingSchedule.endTime}
              </span>
            </p>
            <p>
              Working Days: <span>{allWorkingSchedule.workingDay}</span>
            </p>
          </div>
        </div>
      </div>
      <Divider />
    </>
  );
}
