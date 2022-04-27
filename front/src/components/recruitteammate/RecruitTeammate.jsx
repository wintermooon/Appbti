import React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import "../styles/RecruitTeammate.css";
import SideBar from "../community/Sidebar";
import RecruitmentFilter from "./RecruitmentFilter";

const RecruitTeammate = function () {
  return (
    <div id="RecruitTeammate">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={5}>
          <SideBar />
          <Grid item xs={9} id="PostList">
            <RecruitmentFilter />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default RecruitTeammate;
