import React from "react";
import Freeboards from "./community/freeboard/Freeboards";
import PostView from "./community/freeboard/PostView";

import TagFilter from "./community/filter/TagFilter";
import TagTest from "./community/filter/TagTest";
const Main = function () {
  return (
    <div>
      <PostView />
      <Freeboards />
      <h2>비로그인 유저도 볼 수 있는 메인 페이지 입니다.</h2>
      <TagTest />
      <TagFilter />
    </div>
  );
};

export default Main;
