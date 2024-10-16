import React, { useState, useEffect } from "react";
import "./News.css"; // Import CSS for News component
import AppAppBar from "../../../authorize/landingPage/LandingPageDetail/AppAppBar/AppAppBar";
import { useDispatch, useSelector } from "react-redux";
import { totalVetsDetailsSelector } from "../../../../store/sellectors";
import { getTotalVetsDetailThunk } from "../../../../store/apiThunk/userThunk";
import noImageDoctor from "../../../../assets/ifnoimageDoctor.jpg"; // Import ảnh mặc định

export default function Doctors() {
  const doctors = useSelector(totalVetsDetailsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotalVetsDetailThunk());
  }, [dispatch]);

  return (
    <div>
      {/* <AppAppBar /> */}
      <div className="news-wrap">
        {doctors?.map((doctor) => (
          <div className="news-box" key={doctor.accountId}>
            <div className="news-box-top">
              <img
                className="news-box-image"
                src={doctor.profileImage ? doctor.profileImage : noImageDoctor} // Sử dụng ảnh mặc định nếu không có ảnh
                alt={doctor.username}
              />
              <div className="news-title-flex">
                <h3 className="news-box-title">{doctor.username}</h3>
                <p className="news-user-follow-info">{doctor.location}</p>
              </div>
              <p className="news-description">{doctor.email}</p>
            </div>
            <a href="#" className="news-button">
              {doctor.role}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
