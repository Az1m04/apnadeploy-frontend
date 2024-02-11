import React from "react";
import Button from "./Button";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/deploy");
  };
  const Styled = styled.div`
    .title {
      font-size: 10rem;
      line-height: 9.5rem;
      font-weight: bold;
      text-transform: uppercase;
      background: -webkit-linear-gradient(#eee, #333);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      @media (max-width: 768px) {
        font-size: 5rem;
      line-height: 5.5rem;
      }
    }
    .welcome-text {
      display: flex;
      justify-content: center;
      gap: 12px;
      fontWeight:"500";
      text-transform: uppercase;
      font-size: 2rem;
      color: #4f514c;
    }
    .btn-container {
      margin-top: 6rem;
      display: flex;
      justify-content: center;
    }
  `;

  return (
    <Styled>
      <div className="title">Apna Deploy</div>
      <div className="welcome-text">
        <p>Build.</p>
        <p>Ship.</p>
        <p>Deploy.</p>
      </div>
      <div className="btn-container">
        <Button onClick={handleButtonClick} text={"Get Started"} />
      </div>
    </Styled>
  );
}

export default Welcome;
