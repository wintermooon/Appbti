import React from "react";
import { useNavigate } from "react-router-dom";

import { styled } from "@mui/material/styles";
import { List } from "@mui/material";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

const SideBar = function () {
  const navigate = useNavigate();

  const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
  }));

  return (
    <Grid item id="LeftGrid">
      <Item>
        <nav>
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate("/community/recruitteammate");
                }}
              >
                <ListItemText primary="팀원 구해요" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="a" href="#simple-list">
                <ListItemText primary="팀을 찾고있어요" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="a" href="#simple-list">
                <ListItemText primary="자유 게시판" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="a" href="#simple-list">
                <ListItemText primary="질문 게시판" />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
      </Item>
    </Grid>
  );
};

export default SideBar;
