import React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import "../styles/Community.css";
import SideBar from "./Sidebar";
import RecruitmentFilter from "./RecruitmentFilter";

const Community = function () {
  return (
    <div id="Community">
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

export default Community;
