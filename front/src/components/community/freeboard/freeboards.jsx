import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router";
import { Grid, Box, Button, Card, CardContent, Typography } from "@mui/material";
import { UserStateContext } from "../../../App";
import * as Api from "../../../api";
// import SideBar from "../Sidebar";
import Post from "./PostView";
import Lists from "./Lists";
import Form from "./Postform";

const Freeboards = () => {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [viewType, setViewType] = useState("list");

  const fetchPostsInfo = async () => {
    try {
      await Api.get("freeboardlist");
      setViewType("list");
      setIsFetchCompleted(true);
    } catch (error) {
      console.log(error);
    }
  };

  // ** 로그인 상태가 아닐 때 로그인 하라고 보내주기
  useEffect(() => {
    if (!userState.user) {
      navigate("/login");
      return;
    }
    fetchPostsInfo();
  }, [userState, navigate]);

  // * * Skeleton Code 작성할 것
  if (!isFetchCompleted) {
    return "Loading...";
  }

  return (
    <div id="RecruitTeammate">
      {/* <SideBar /> */}
      <span>{"전체, 모집중, 모집완료"}</span>
      <span>{"검색기능"}</span>
      <span>
        {"최신순/댓글순/좋아요순"}
        <Button variant="contained" onClick={() => setViewType("form")}>
          WRITE
        </Button>
      </span>
      {viewType === "list" ? <Lists /> : viewType === "form" ? <Form /> : <Post />};
    </div>
  );
};

export default Freeboards;
