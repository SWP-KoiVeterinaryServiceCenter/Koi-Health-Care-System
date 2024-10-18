import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom"; // Import useSearchParams
import "./inputPayment.css";
import { getPaymentUrlThunk } from "../../../../store/apiThunk/paymentThunk"; // Import thunk
import { paymentSelector } from "../../../../store/sellectors";

const InputPayment = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams(); // Hook để đọc query string
  const appointmentId = searchParams.get("appointmentId"); // Lấy giá trị của appointmentId từ query string
  const payment = useSelector(paymentSelector);
  
  const [amount, setAmount] = useState(""); // Tạo state để lưu số tiền

  useEffect(() => {
    console.log("Received appointmentId:", appointmentId); // Kiểm tra giá trị appointmentId
  }, [appointmentId]);

  const handlePaymentClick = () => {
    if (amount) {
      dispatch(getPaymentUrlThunk({ appointmentId, amount })); // Truyền amount vào khi gọi thunk
    } else {
      alert("Please enter a valid amount!");
    }
  };

  console.log(payment);

  return (
    <div className="checkout-container">
      <h2>Input Payment</h2>
      <p>Appointment ID: {appointmentId}</p> {/* Hiển thị appointmentId */}
      <div className="custom-brutalist-container" style={{ marginTop: 80 }}>
        <input
          placeholder="Amount Money"
          className="custom-brutalist-input custom-smooth-type"
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)} // Cập nhật state khi người dùng nhập số tiền
        />
        <label className="custom-brutalist-label">Nhập số tiền</label>
      </div>
      <div className="custom-container" style={{ marginTop: 20 }}>
        <div className="custom-left-side">
          <div className="custom-card">
            <div className="custom-card-line"></div>
            <div className="custom-buttons"></div>
          </div>
          <div className="custom-post">
            <div className="custom-post-line"></div>
            <div className="custom-screen">
              <div className="custom-dollar">$</div>
            </div>
            <div className="custom-numbers"></div>
            <div className="custom-numbers-line2"></div>
          </div>
        </div>
        <div className="custom-right-side" onClick={handlePaymentClick}> {/* Thực hiện chức năng khi bấm */}
          <div className="custom-new">Payment</div>
          <svg
            viewBox="0 0 451.846 451.847"
            height="512"
            width="512"
            xmlns="http://www.w3.org/2000/svg"
            className="custom-arrow"
          >
            <path
              fill="#cfcfcf"
              className="active-path"
              d="M345.441 248.292L151.154 442.573c-12.359 12.365-32.397 12.365-44.75 0-12.354-12.354-12.354-32.391 0-44.744L278.318 225.92 106.409 54.017c-12.354-12.359-12.354-32.394 0-44.748 12.354-12.359 32.391-12.359 44.75 0l194.287 194.284c6.177 6.18 9.262 14.271 9.262 22.366 0 8.099-3.091 16.196-9.267 22.373z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default InputPayment;
