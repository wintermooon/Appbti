import React from "react";
import Freeboards from "../community/pages/Lists";
import Form from "../community/pages/Postform";
import Lists from "../community/pages/Lists";

const Main = function () {
  return (
    <div>
      <Lists />
      <Form />
      <Freeboards />
      <h2>비로그인 유저도 볼 수 있는 메인 페이지 입니다.</h2>
    </div>
  );
};

export default Main;
