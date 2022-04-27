import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Grid, Container, Button, Card, CardActions, CardContent, Typography } from "@mui/material";

import { UserStateContext } from "../../App";
import * as Api from "../../api";

function FreeboardPost() {
  const navigate = useNavigate();
  const params = useParams();
  const userState = useContext(UserStateContext);
  const [postInfo, setPostInfo] = useState(null);
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  const fetchPostInfo = async (postId) => {
    try {
      const { data: postData } = await Api.get("freeboards", postId);
      if (postData?.user_id === userState.user?.id) {
        setIsEditable(true);
      } else {
        setIsEditable(false);
      }
      setPostInfo(postData);
      setIsFetchCompleted(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // 만약 전역 상태의 user가 null이라면, 로그인 페이지로 이동함.
    if (!userState.user) {
      navigate("/login");
      return;
    }

    fetchPostInfo(params.postId);
  }, [params, userState, navigate]);

  if (!isFetchCompleted) {
    return "loading...";
  }

  const deleteNavigate = async () => {
    try {
      if (window.confirm("게시글을 삭제하시겠습니까?")) {
        await Api.delete("freeboards", params.postId);
        navigate(`/freeboards`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //
  return (
    <Grid container spacing={4}>
      <Container>
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {postInfo.title}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              작성자 : {postInfo.name}
            </Typography>
            <Typography variant="body2">
              {postInfo.content?.split("\n")?.map((line, index) => (
                <Typography key={index}>
                  {line}
                  <br />
                </Typography>
              ))}
            </Typography>
            <Button variant="outline-primary" className="me-2" onClick={() => navigate(`/freeboards`)}>
              목록
            </Button>
            {isEditable && (
              <Button variant="primary" className="me-2" onClick={() => navigate(`/freeboard/edit/${postInfo._id}`)}>
                수정
              </Button>
            )}
            {isEditable && (
              <Button variant="danger" className="me-2" onClick={() => deleteNavigate()}>
                삭제
              </Button>
            )}
          </CardContent>
        </Card>
      </Container>
    </Grid>
  );
}

export default FreeboardPost;
