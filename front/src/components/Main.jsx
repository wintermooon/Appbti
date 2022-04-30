import React from "react";
import Freeboards from "./community/freeboard/Freeboards";
import Form from "./community/freeboard/Postform";
import Lists from "./community/freeboard/Lists";
import PostView from "./community/freeboard/PostView";

const Main = function () {
  return (
    <div>
      {/* <Lists />
      <Form /> */}
      <PostView />
      <Freeboards />
      <h2>비로그인 유저도 볼 수 있는 메인 페이지 입니다.</h2>
    </div>
  );
};

export default Main;
