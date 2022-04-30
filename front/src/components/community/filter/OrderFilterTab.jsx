import React, { useState } from "react";
import styled from "styled-components";

const OrderFilterTab = () => {
  const orderTabMenu = ["최신순", "댓글많은순", "좋아요순"];
  const [currentOrder, setCurrentOrder] = useState(0);
  const [orderUrl, setOrderUrl] = useState("recently");

  const handleClickOrderTab = (e, index) => {
    setCurrentOrder(index);

    if (e === "최신순") {
      setOrderUrl("recently");
    } else if (e === "댓글많은순") {
      setOrderUrl("comment");
    } else {
      setOrderUrl("liked");
    }
  };

  return (
    <TabDiv>
      <TabContainer>
        {orderTabMenu.map((e, index) => {
          return (
            <TabButton
              key={index}
              isClicked={currentOrder === index ? true : false}
              onClick={() => {
                handleClickOrderTab(e, index);
              }}
            >
              {e}
            </TabButton>
          );
        })}
      </TabContainer>
      <TabActiveBar>
        <ActiveLine activeLine={currentOrder} />
      </TabActiveBar>
    </TabDiv>
  );
};

export default OrderFilterTab;

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
