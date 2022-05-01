import React, { useState } from "react";
import styled from "styled-components";

const StatusFilterTab = () => {
  const stateTabMenu = ["전체", "모집중", "모집완료"];
  const [currentStateTab, setCurrentStsteTab] = useState(0);
  const [statusUrl, setStatusUrl] = useState("");

  const handleClickStatusTab = (e, index) => {
    setCurrentStsteTab(index);

    if (e === "전체") {
      setStatusUrl("all");
    } else if (e === "모집중") {
      setStatusUrl("uncompleted");
    } else {
      setStatusUrl("completed");
    }
  };

  return (
    <TabDiv>
      <TabContainer>
        {stateTabMenu.map((e, index) => {
          return (
            <TabButton
              key={index}
              value={e}
              isClicked={currentStateTab === index ? true : false}
              onClick={() => {
                handleClickStatusTab(e, index);
              }}
            >
              {e}
            </TabButton>
          );
        })}
      </TabContainer>
      <TabActiveBar>
        <ActiveLine activeLine={currentStateTab} />
      </TabActiveBar>
    </TabDiv>
  );
};

export default StatusFilterTab;

const TabDiv = styled.div`
  margin: 10px 0;
`;

const TabContainer = styled.div`
  display: flex;
`;

const TabButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 40px;
  text-align: center;
  font-size: 0.9rem;
  font-weight: 600;
  color: ${(props) => (props.isClicked ? "var(--textPrimary)" : "var(--textSecondary)")};

  cursor: pointer;
`;

const TabActiveBar = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--borderPrimary);
`;

const ActiveLine = styled.div`
  width: 100px;
  height: 3px;
  background-color: var(--primary);
  transition: all 0.3s ease;
  transform: translateX(calc(100% * ${(props) => props.activeLine}));
`;
