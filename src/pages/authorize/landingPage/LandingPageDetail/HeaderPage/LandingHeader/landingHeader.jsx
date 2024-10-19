import React from "react";
import styled from "styled-components";
import backgroundImg from "../../../../../../assets/bg3_sidebar.png"; // Đường dẫn đến hình ảnh trong assets

const HeaderWrapper = styled.header`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  height: auto;
  background: url(${backgroundImg}); /* Sử dụng hình ảnh đã import */
  text-align: center;
  width: 100%;
  background-size: cover;
  background-attachment: fixed;
  position: relative;
  overflow: hidden;
  border-radius: 0 0 85% 85% / 30%;

  .overlay {
    width: 100%;
    height: 100%;
    padding: 50px;
    color: #fff;
    text-shadow: 1px 1px 1px #333;
    // background-image: linear-gradient(135deg, #9f05ff69 10%, #fd5e086b 100%);
  }

  h1 {
    font-family: "Dancing Script", cursive;
    font-size: 80px;
    margin-bottom: 30px;
    margin-top: 20px;
  }

  h3,
  p {
    font-family: "Open Sans", sans-serif;
    margin-bottom: 30px;
  }

  button {
    border: none;
    outline: none;
    padding: 10px 20px;
    border-radius: 50px;
    color: #333;
    background: #fff;
    margin-bottom: 50px;
    box-shadow: 0 3px 20px 0 #0000003b;
    &:hover {
      cursor: pointer;
    }
  }
`;

const Header = () => (
  <HeaderWrapper>
    <div className="overlay">
      <h1>Simply The Best</h1>
      <h3>Reasons for Choosing US</h3>
      <p>Enthusiastic, Dedicated, Cheap. Come to us, we will try our best to help you.</p>

    </div>
  </HeaderWrapper>
);

export default Header;
