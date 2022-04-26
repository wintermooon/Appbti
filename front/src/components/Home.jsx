import React from "react";
import styled from "styled-components";

import Main from "./img/Main.png";

const Home = function () {
  return (
    <Homeimg>
      <img src={Main} alt="" style={{ width: "100%" }} />
    </Homeimg>
  );
};

export default Home;

const Homeimg = styled.div`
  z-index: -1;
`;
