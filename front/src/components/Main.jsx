import React from "react";
import TagFilter from "./community/filter/TagFilter";
import TagTest from "./community/filter/TagTest";
const Main = function () {
  return (
    <div>
      <h2>비로그인 유저도 볼 수 있는 메인 페이지 입니다.</h2>
      <TagTest />
      <TagFilter />
    </div>
  );
};

export default Main;
