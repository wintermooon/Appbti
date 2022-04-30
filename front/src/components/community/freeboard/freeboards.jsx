import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router";
import Button from "@mui/material/Button";
import { UserStateContext } from "../../../App";
import * as Api from "../../../api";
// import SideBar from "../Sidebar";
import View from "./PostView";
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
        {"최신순, 댓글순, 좋아요순"}
        {!isAdding ? (
          <Button variant="contained" onClick={() => setViewType("form")}>
            작성
          </Button>
        ) : (
          <span />
        )}
      </span>
      {viewType === "list" ? (
        <Lists setViewType={setViewType} />
      ) : viewType === "form" ? (
        <Form user={userState.user} setViewType={setViewType} setIsAdding={setIsAdding} />
      ) : (
        <View setViewType={setViewType} setIsAdding={setIsAdding} />
      )}
      ;
    </div>
  );
};

export default Freeboards;
