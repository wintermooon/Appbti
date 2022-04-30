import React, { useState } from "react";
import styled from "styled-components";

const TagTest = function () {
  const [tagUrls, setTagUrls] = useState([]);
  const [isTagClicked, setIsTagClicked] = useState("");
  const [tagUrlQuery, setTagUrlQuery] = useState("");

  const handleClickTag = (tagUrl) => {
    // 이미 클릭되어있는 버튼을 또 눌렀을 경우, isClicked== false, tagUrls 배열에서 제거
    if (tagUrls.includes(tagUrl) === true) {
      setTagUrls(
        tagUrls.filter(function (data) {
          return data !== tagUrl;
        }),
      );
      setIsTagClicked("");
      console.log("중복!!!");
    } else {
      setTagUrls([...tagUrls, tagUrl]);
      setIsTagClicked(tagUrl);
    }
  };

  return (
    <TagBox>
      {STACK_LIST.map((e) => (
        <StackFilterTag className={e.value} key={e.filterId} name={e.name} value={e.value} isClicked={isTagClicked === e.value ? true : false} onClick={() => handleClickTag(e.value)}>
          {e.name}
        </StackFilterTag>
      ))}
    </TagBox>
  );
};

export default TagTest;

const TagBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 30px;
  padding: 12px 24px;
`;

const StackFilterTag = styled.button`
  margin-right: 10px;
  padding: 7px 14px;
  border-radius: 30px;
  font-size: 11px;
	color:  ${(props) => (props.isClicked ? "#fff" : "var(--textPrimary)")} 
  background-color: ${(props) => (props.isClicked ? "var(--primary)" : "var(--secondary)")} 
  border: none;
	cursor: pointer;
`;

const STACK_LIST = [
  {
    filterId: 1,
    name: "Java",
    value: 1,
  },
  {
    filterId: 2,
    name: "JavaScript",
    value: 2,
  },
  {
    filterId: 3,
    name: "Python",
    value: 3,
  },
  {
    filterId: 4,
    name: "C",
    value: 4,
  },
  {
    filterId: 5,
    name: "C++",
    value: 5,
  },
  {
    filterId: 6,
    name: "C#",
    value: 6,
  },
];
