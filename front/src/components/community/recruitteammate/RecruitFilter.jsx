import * as React from "react";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";

const RecruitFilter = function () {
  return (
    <div>
      <h2>RecruitFilter</h2>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList>
              <Tab label="전체" value="all" />
              <Tab label="모집중" value="unrecruited" />
              <Tab label="모집완료" value="recruited" />
            </TabList>
          </Box>
          <article>
            <h3>필터링 된 게시글 목록 리스트</h3>
          </article>
        </TabContext>
      </Box>
    </div>
  );
};

export default RecruitFilter;
