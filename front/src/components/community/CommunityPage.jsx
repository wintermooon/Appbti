import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { styled } from "@mui/material/styles";
import { List } from "@mui/material";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { UserStateContext } from "../../App";
import * as Api from "../../api";

import "../styles/CommunityPage.css";

const CommunityPage = function () {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);

  const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    color: theme.palette.text.secondary,
  }));

  const [posts, setPosts] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    // 만약 전역 상태의 user가 null이라면, 로그인 페이지로 이동함.
    if (!userState.user) {
      navigate("/login");
      return;
    }

    // "userlist" 엔드포인트로 GET 요청을 하고, users를 response의 data로 세팅함.
    Api.get("recruitlist").then((res) => setPosts(res.data));
  }, [navigate, userState]);

  const handleClick = async (e) => {
    setIsClicked(true);
    const url = e.currentTarget.getAttribute("value");
    //console.log(e.currentTarget.getAttribute("value"));

    await Api.get(`${url}`).then((res) => setPosts(res.data));
  };

  return (
    <div id="Community">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Item id="LeftMenu">
            <nav>
              <List>
                {leftMenuList.map((e) => {
                  return (
                    <div
                      key={e.category}
                      value={e.category}
                      onClick={(e) => {
                        handleClick(e);
                      }}
                    >
                      <ListItemButton>
                        <ListItemText primary={e.name} />
                      </ListItemButton>
                    </div>
                  );
                })}
              </List>
            </nav>
          </Item>
          <Grid item xs={9} id="RightPostList">
            <h2>게시판 리스트 영역</h2>
            <Button id="createPost" type="submit" fullWidth variant="contained">
              게시글 작성
            </Button>
            {isClicked
              ? posts.map((e) => {
                  return (
                    <div className="PostItem" key={e.id}>
                      <Item>
                        <div>{e.title}</div>
                        <div>{e.content}</div>
                      </Item>
                    </div>
                  );
                })
              : posts.map((e) => {
                  return (
                    <div className="PostItem" key={e.id}>
                      <Item>
                        <div>{e.title}</div>
                        <div>{e.content}</div>
                      </Item>
                    </div>
                  );
                })}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default CommunityPage;

const leftMenuList = [
  {
    category: "recruitlist",
    name: "팀원 구해요",
  },
  {
    category: "findteamlist",
    name: "팀을 찾고있어요",
  },
  {
    category: "freeboardlist",
    name: "자유 게시판",
  },
  {
    category: "questionlist",
    name: "질문 게시판",
  },
];
