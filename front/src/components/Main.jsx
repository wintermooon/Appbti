import React from "react";
import Freeboards from "./community/freeboard/freeboards";
import PostView from "./community/freeboard/PostView";

import TagTest from "./community/filter/TagTest";
const Main = function () {
  return (
    <div>
      <PostView />
      <Freeboards />
      <h2>비로그인 유저도 볼 수 있는 메인 페이지 입니다.</h2>
      <TagTest />
    </div>
  );
};

export default Main;
