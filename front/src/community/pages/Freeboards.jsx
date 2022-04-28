import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router";
import { Grid, Box, Button, Card, CardContent, Typography } from "@mui/material";
import { UserStateContext } from "../../../App";
import * as Api from "../../api";
import SideBar from "../Sidebar";
import Post from "./PostView";
import Lists from "./Lists";
import Form from "./Postform";

const Freeboards = (userId) => {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);
  const [freeboards, setFreeboards] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [viewType, setViewType] = useState("list");

  const fetchPostsInfo = async () => {
    try {
      const { data: tempAllPosts } = await Api.get("freeboardlist");
      setFreeboards(tempAllPosts);
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
      <SideBar />
      <span>{"전체, 모집중, 모집완료"}</span>
      <span>{"검색기능"}</span>
      <span>
        {"최신순/댓글순/좋아요순"}
        {!isAdding &
        (
          <Button variant="contained" onClick={() => setIsAdding(true)}>
            WRITE
          </Button>
        )}
      </span>
      {viewType === "list" ? <Lists /> : viewType === "form" ? <Form /> : <Post />}
    </div>
  );
};

export default Freeboards;
