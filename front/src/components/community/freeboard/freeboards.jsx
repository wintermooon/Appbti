import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router";
import { Grid, Box, Container, Button, Card, CardContent, Typography } from "@mui/material";
import { UserStateContext } from "../../../App";
import * as Api from "../../../api";
import SideBar from "../Sidebar";

const Freeboards = () => {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);
  const [freeboards, setFreeboards] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

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
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={5}>
          <SideBar />
          <Grid item xs={8} container direction="column" justifyContent="space-evenly" alignItems="stretch">
            <Container>{"전체, 모집중, 모집완료"}</Container>
            <Container>{"검색기능"}</Container>
            <Container>
              {"최신순/댓글순/좋아요순"}
              <Button variant="contained" onClick={() => navigate(`/freeboard/create`)}>
                WRITE
              </Button>
            </Container>
            <Container>
              {freeboards.map((freeboard) => (
                <Card sx={{ minWidth: 275 }} key={freeboard._id} onClick={() => navigate(`/freeboards/${freeboard._id}`)}>
                  <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      {freeboard.name}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                      {freeboard.title}
                    </Typography>
                    <Typography variant="body2">{freeboard.content}</Typography>
                  </CardContent>
                </Card>
              ))}
            </Container>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Freeboards;
