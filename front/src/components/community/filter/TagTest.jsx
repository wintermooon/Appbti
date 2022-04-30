import React, { useState } from "react";
import styled from "styled-components";

const TagTest = function () {
  const [tagUrls, setTagUrls] = useState([]);
  const [tagUrlQuery, setTagUrlQuery] = useState("");

  const handleClickTag = (e) => {
    // 이미 클릭되어있는 버튼을 또 눌렀을 경우, isClicked== false, tagUrls 배열에서 제거
    if (tagUrls.includes(e.value) === true) {
      setTagUrls(
        tagUrls.filter(function (data) {
          return data !== e.value;
        }),
      );
      e.isClicked = false;
    } else {
      setTagUrls([...tagUrls, e.value]);
      e.isClicked = true;
    }
  };
  console.log(tagUrls);

  return (
    <TagBox>
      {STACK_LIST.map((e) => (
        <StackFilterTag className={e.value} key={e.filterId} name={e.name} value={e.value} isClicked={e.isClicked} onClick={() => handleClickTag(e)}>
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
  font-weight: 500;
  color: ${(props) => (props.isClicked ? "#fff" : "var(--primary)")};
  background-color: ${(props) => (props.isClicked ? "var(--primary)" : "#fff")};
  border: 1px solid var(--primary);
  cursor: pointer;
  &:hover {
    color: #fff;
    background-color: var(--primary);
  }
`;

const STACK_LIST = [
  {
    filterId: 1,
    name: "Java",
    value: 1,
    isClicked: false,
  },
  {
    filterId: 2,
    name: "JavaScript",
    value: 2,
    isClicked: false,
  },
  {
    filterId: 3,
    name: "Python",
    value: 3,
    isClicked: false,
  },
  {
    filterId: 4,
    name: "C",
    value: 4,
    isClicked: false,
  },
  {
    filterId: 5,
    name: "C++",
    value: 5,
    isClicked: false,
  },
  {
    filterId: 6,
    name: "C#",
    value: 6,
    isClicked: false,
  },
];
