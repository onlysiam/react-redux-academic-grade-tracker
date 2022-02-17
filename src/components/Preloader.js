import React from "react";
import styled from "styled-components";
const Preloader = () => {
  return (
    <Body className="preloaderContainer">
      <div className="lds-ripple">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </Body>
  );
};

const Body = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;

  background: linear-gradient(to left, rgb(219, 253, 255), rgb(245, 253, 255));
  .lds-ripple {
    display: inline-block;
    position: relative;
    width: 200px;
    height: 200px;
  }
  .lds-ripple div {
    position: absolute;
    border: 4px solid #c0a199;
    opacity: 1;
    border-radius: 50%;
    animation: lds-ripple 2s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }
  .lds-ripple div:nth-child(2) {
    animation-delay: 1s;
  }
  .lds-ripple div:nth-child(3) {
    animation-delay: -1s;
  }
  @keyframes lds-ripple {
    0% {
      top: 100px;
      left: 100px;
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      top: 0px;
      left: 0px;
      width: 200px;
      height: 200px;
      opacity: 0;
    }
  }
`;

export default Preloader;
