/* eslint-disable no-nested-ternary */
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
import Freeboards from "./freeboard/Freeboards";
import styledComponent from "styled-components";

import { UserStateContext } from "../../App";
import * as Api from "../../api";
import Pager from "./pager/Pager";

import "../styles/CommunityPage.css";
import TagTest from "./filter/TagTest";

const CommunityPage = function () {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);

  const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    color: theme.palette.text.secondary,
  }));

  const [posts, setPosts] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  // category 메뉴 관련 (팀원 구해요/ 팀 찾아요 / 자유게시판 / 질문게시판)
  const [categoryUrl, setCategoryUrl] = useState("recruitlist");

  // ststus 탭 관련 (전체 / 모집중 / 최신순)
  const [currentStateTab, setCurrentStsteTab] = useState(0);
  const [statusUrl, setStatusUrl] = useState("all");

  const handleClickStatusTab = async (e, index) => {
    setCurrentStsteTab(index);

    if (e === "전체") {
      setStatusUrl("all");
    } else if (e === "모집중") {
      setStatusUrl("uncompleted");
    } else {
      setStatusUrl("completed");
    }
  };

  // order 탭 관련 (최신순 / 댓글많은순 / 좋아요순)
  const [currentOrder, setCurrentOrder] = useState(0);
  const [orderUrl, setOrderUrl] = useState("recently");

  const handleClickOrderTab = (e, index) => {
    setCurrentOrder(index);

    if (e === "최신순") {
      setOrderUrl("recently");
    } else if (e === "댓글많은순") {
      setOrderUrl("comment");
    } else {
      setOrderUrl("liked");
    }
  };

  useEffect(() => {
    // 만약 전역 상태의 user가 null이라면, 로그인 페이지로 이동함.
    if (!userState.user) {
      navigate("/login");
      return;
    }

    // "userlist" 엔드포인트로 GET 요청을 하고, users를 response의 data로 세팅함.
    Api.get(`${categoryUrl}?status=${statusUrl}&order=${orderUrl}`).then((res) => setPosts(res.data));
  }, [categoryUrl, navigate, orderUrl, statusUrl, userState]);

  const handleClick = async (e) => {
    setIsClicked(true);
    const url = e.currentTarget.getAttribute("value");
    //console.log(e.currentTarget.getAttribute("value"));
    setCategoryUrl(url);

    // 다른 게시판으로 이동할 때마다 초기화
    setStatusUrl("all");
    setOrderUrl("recently");
    setCurrentStsteTab(0);
    setCurrentOrder(0);
  };

  return (
    <CommunityPostContainer id="Community">
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
            <FilterContainer>
              {categoryUrl === "recruitlist" || categoryUrl === "findteamlist" ? (
                <TabDiv>
                  <TabContainer>
                    {stateTabMenu.map((e, index) => {
                      return (
                        <TabButton
                          key={index}
                          value={e}
                          isClicked={currentStateTab === index ? true : false}
                          onClick={() => {
                            handleClickStatusTab(e, index);
                          }}
                        >
                          {e}
                        </TabButton>
                      );
                    })}
                  </TabContainer>
                  <TabActiveBar>
                    <ActiveLine activeLine={currentStateTab} />
                  </TabActiveBar>
                </TabDiv>
              ) : (
                ""
              )}
              <TagContainer>{categoryUrl === "recruitlist" || categoryUrl === "findteamlist" ? <TagTest /> : ""}</TagContainer>
              <TabDiv>
                <TabContainer>
                  {orderTabMenu.map((e, index) => {
                    return (
                      <TabButton
                        key={index}
                        isClicked={currentOrder === index ? true : false}
                        onClick={() => {
                          handleClickOrderTab(e, index);
                        }}
                      >
                        {e}
                      </TabButton>
                    );
                  })}
                </TabContainer>
                <TabActiveBar>
                  <ActiveLine activeLine={currentOrder} />
                </TabActiveBar>
              </TabDiv>
            </FilterContainer>
            {categoryUrl === "recruitlist" || categoryUrl === "findteamlist" ? (
              <PostButtonContainer>
                <Button id="createPost" type="submit" fullWidth variant="contained">
                  게시글 작성
                </Button>
              </PostButtonContainer>
            ) : (
              ""
            )}

            <article>
              {categoryUrl === "recruitlist" || categoryUrl === "findteamlist" ? (
                posts.map((e) => {
                  return (
                    <div className="PostItem" key={e.id}>
                      <Item>
                        <div>{e.title}</div>
                        <div>{e.content}</div>
                      </Item>
                    </div>
                  );
                })
              ) : categoryUrl === "freeboardlist" ? (
                <Freeboards />
              ) : (
                posts.map((e) => {
                  return (
                    <div className="PostItem" key={e.id}>
                      <Item>
                        <div>{e.title}</div>
                        <div>{e.content}</div>
                      </Item>
                    </div>
                  );
                })
              )}
            </article>
            <Pager />
          </Grid>
        </Grid>
      </Box>
    </CommunityPostContainer>
  );
};

export default CommunityPage;

const stateTabMenu = ["전체", "모집중", "모집완료"];
const orderTabMenu = ["최신순", "댓글많은순", "좋아요순"];

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

const TabDiv = styledComponent.div`
  margin: 10px 0;
`;

const TabContainer = styledComponent.div`
  display: flex;
`;

const TagContainer = styledComponent.div`
display: flex;
`;

const TabButton = styledComponent.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 40px;
  text-align: center;
  font-size: 0.9rem;
  font-weight: 600;
  color: ${(props) => (props.isClicked ? "var(--textPrimary)" : "var(--textSecondary)")};

  cursor: pointer;
`;

const TabActiveBar = styledComponent.div`
  width: 100%;
  height: 1px;
  background-color: var(--borderPrimary);
`;

const ActiveLine = styledComponent.div`
  width: 100px;
  height: 3px;
  background-color: var(--primary);
  transition: all 0.3s ease;
  transform: translateX(calc(100% * ${(props) => props.activeLine}));
`;

const FilterContainer = styledComponent.div`

flex-direction: column; /*수직 정렬*/
align-items: center;
margin-bottom: 20px;
`;

const CommunityPostContainer = styledComponent.div`
width: 100%
display: flex;
flex-direction: column; /*수직 정렬*/
align-items: center;
`;

const PostButtonContainer = styledComponent.div`
display: flex;
flex-direction: row;
`;
// const Whitespace = styledComponent.div``;
