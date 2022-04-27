/* eslint-disable array-callback-return */
import * as React from "react";

import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import "../styles/RecruitmentFilter.css";

const postList = [
  {
    boardId: 1,
    postId: 1,
    title: "팀원 모집합니다 게시판의 첫 번째 게시글입니다.",
    content: "제발 잘 들어가면 좋겠습니다.",
    isOpened: false,
  },
  {
    boardId: 1,
    postId: 2,
    title: "팀원 모집합니다 게시판의 두 번째 게시글입니다.",
    content: "제발 잘 들어가면 좋겠습니다.",
    isOpened: false,
  },
  {
    boardId: 2,
    postId: 3,
    title: "팀원 구합니다 게시판의 첫 번째 게시글입니다.",
    content: "제발 잘 들어가면 좋겠습니다.",
    isOpened: false,
  },
];

const RecruitmentFilter = function () {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="전체" value="1" />
            <Tab label="모집중" value="2" />
            <Tab label="모집완료" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          {postList.map((e, index) => {
            return (
              <Item key={index}>
                <div key={index} className={e.boardId} id={e.postId}>
                  {e.isOpened ? "모집중" : "모집완료"}
                </div>
                <div key={index} className={e.boardId} id={e.postId}>
                  {e.title}
                </div>
                <div key={index} className={e.boardId} id={e.postId}>
                  {e.content}
                </div>
              </Item>
            );
          })}
        </TabPanel>
        <TabPanel value="2">
          {postList.map((e, index) => {
            if (e.isOpened === true) {
              return (
                <Item key={index}>
                  <div key={e.postId} className={e.boardId} id={e.postId}>
                    {e.isOpened ? "모집중" : "모집완료"}
                  </div>
                  <div key={e.postId} className={e.boardId} id={e.postId}>
                    {e.isOpened}
                  </div>
                  <div key={e.postId} className={e.boardId} id={e.postId}>
                    {e.title}
                  </div>
                  <div key={e.postId} className={e.boardId} id={e.postId}>
                    {e.content}
                  </div>
                </Item>
              );
            }
          })}
        </TabPanel>
        <TabPanel value="3">
          {postList.map((e, index) => {
            if (e.isOpened === false) {
              return (
                <Item key={index}>
                  <div key={e.postId} className={e.boardId} id={e.postId}>
                    {e.isOpened ? "모집중" : "모집완료"}
                  </div>
                  <div key={e.postId} className={e.boardId} id={e.postId}>
                    {e.isOpened}
                  </div>
                  <div key={e.postId} className={e.boardId} id={e.postId}>
                    {e.title}
                  </div>
                  <div key={e.postId} className={e.boardId} id={e.postId}>
                    {e.content}
                  </div>
                </Item>
              );
            }
          })}
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default RecruitmentFilter;

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));
