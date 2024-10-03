import React from "react";
import "./News.css"; // Import CSS for News component
import AppAppBar from "../../../authorize/landingPage/LandingPageDetail/AppAppBar/AppAppBar";

export default function Doctors() {
  return (
    <div>
      {/* <AppAppBar /> */}
      <div className="news-wrap">
        <div className="news-box">
          <div className="news-box-top">
            <img
              className="news-box-image"
              src="https://hips.hearstapps.com/hmg-prod/images/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg?crop=0.66698xw:1xh;center,top&resize=1200:*"
              alt="Girl Eating Pizza"
            />
            <div className="news-title-flex">
              <h3 className="news-box-title">Kelsie Meyer</h3>
              <p className="news-user-follow-info">17 Ca khám</p>
            </div>
            <p className="news-description">
              Whipped steamed roast cream beans macchiato skinny grinder café.
              Iced grinder go mocha steamed grounds cultivar panna aroma.
            </p>
          </div>
          <a href="#" className="news-button">
            Tìm hiểu thêm
          </a>
        </div>

        <div className="news-box">
          <div className="news-box-top">
            <img
              className="news-box-image"
              src="https://www.scripps.org/sparkle-assets/variants/hi_res_new_doctor_fb-32abb9ba141c8223aadebce90782ac68_desktop_x++-1200x1200.jpeg"
              alt="Girl Eating Pizza"
            />
            <div className="news-title-flex">
              <h3 className="news-box-title">Mark Carusso</h3>
              <p className="news-user-follow-info">33 Ca khám</p>
            </div>
            <p className="news-description">
              Whipped steamed roast cream beans macchiato skinny grinder café.
              Iced grinder go mocha steamed grounds cultivar panna aroma.
            </p>
          </div>
          <a href="#" className="news-button">
            Tìm hiểu thêm
          </a>
        </div>

        <div className="news-box">
          <div className="news-box-top">
            <img
              className="news-box-image"
              src="https://www.humanitas.net/content/uploads/2017/10/doctors.jpg"
              alt="Girl Eating Pizza"
            />
            <div className="news-title-flex">
              <h3 className="news-box-title">Taylor Green</h3>
              <p className="news-user-follow-info">26 Ca khám</p>
            </div>
            <p className="news-description">
              Whipped steamed roast cream beans macchiato skinny grinder café.
              Iced grinder go mocha steamed grounds cultivar panna aroma.
            </p>
          </div>
          <a href="#" className="news-button">
            Tìm hiểu thêm
          </a>
        </div>

        <div className="news-box">
          <div className="news-box-top">
            <img
              className="news-box-image"
              src="https://cdn-jollh.nitrocdn.com/gjpJcIohIDsAZvjCTUcigiPybkwNyUwE/assets/images/optimized/rev-02c0a7d/www.collegetransitions.com/wp-content/uploads/2023/06/blog-HowLongDoesTakeDoctor-1460x822-1.webp"
              alt="Girl Eating Pizza"
            />
            <div className="news-title-flex">
              <h3 className="news-box-title">Isaiah Jian</h3>
              <p className="news-user-follow-info">12 Ca khám</p>
            </div>
            <p className="news-description">
              Whipped steamed roast cream beans macchiato skinny grinder café.
              Iced grinder go mocha steamed grounds cultivar panna aroma.
            </p>
          </div>
          <a href="#" className="news-button">
            Tìm hiểu thêm
          </a>
        </div>
        <div className="news-box">
          <div className="news-box-top">
            <img
              className="news-box-image"
              src="https://www.postbaccprogramguide.com/app/uploads/2022/07/iStock-1189304032.jpg"
              alt="Girl Eating Pizza"
            />
            <div className="news-title-flex">
              <h3 className="news-box-title">Isaiah Jian</h3>
              <p className="news-user-follow-info">12 Ca khám</p>
            </div>
            <p className="news-description">
              Whipped steamed roast cream beans macchiato skinny grinder café.
              Iced grinder go mocha steamed grounds cultivar panna aroma.
            </p>
          </div>
          <a href="#" className="news-button">
            Tìm hiểu thêm
          </a>
        </div>
      </div>
    </div>
  );
}
