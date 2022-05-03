import React from "react";
import Button from "@mui/material/Button";
import { useNavigate, useState } from "react-router";
import "../styles/AppbtiTest.css";

function AppbtiTest() {
  const navigate = useNavigate();

  return (
    <main>
      <article className="mainpage">
        <p>앱을 만들어보고 싶은데...</p>
        <p>어떤 앱을 만들어보면 좋을까?</p>
      </article>
      <article>
        <button id="totest" type="button" onClick={() => navigate("/AppbtiTest/1")}>
          TEST 해보러 가기
        </button>
      </article>
      <div className="area">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </main>
  );
}
export default AppbtiTest;
