import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { AiFillCaretDown, AiFillCloseCircle } from "react-icons/ai";

const TagFilter = function () {
  const [selectedValue, setSelectedValue] = useState("");
  const [isDroped, setIsDroped] = useState(false);
  const outsideRef = useRef(null);

  const handleClick = (e) => {
    setSelectedValue(e.target.textContent);
    setIsDroped(false);
  };

  function handleClickOutside(e) {
    if (outsideRef.current && !outsideRef.current.contains(e.target)) {
      setIsDroped(false);
      return;
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DropdownDiv ref={outsideRef}>
      <DropdownContainer>
        <SeleteBox onClick={() => setIsDroped(!isDroped)}>
          <SelectTag>{selectedValue}</SelectTag>
          <div>
            <i>
              <AiFillCaretDown id="icon" size="15" color="var(--textPrimary)" />
            </i>
          </div>
        </SeleteBox>
        {isDroped && (
          <DropBox>
            {STACK_LIST.map((e) => {
              return (
                <StackFilterTag key={e.filterId} className="listItem" name={e.name} value={e.value} onClick={handleClick}>
                  {e.name}
                </StackFilterTag>
              );
            })}
          </DropBox>
        )}
      </DropdownContainer>
    </DropdownDiv>
  );
};

export default TagFilter;

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

const DropdownDiv = styled.div`
  position: relative;
  margin: 10px 0;

  h2 {
    position: relative;
    left: -50px;
    margin-bottom: 20px;
  }
`;

const DropdownContainer = styled.div`
  width: 100%;
  height: auto;
  padding: 5px;
`;

const SeleteBox = styled.div`
  width: 100%;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding: 3px 10px;
  text-align: left;
  background-color: var(--inputBackground);
  border: 1px solid var(--borderPrimary);
  border-radius: 5px;
  cursor: pointer;

  #icon {
    z-index: 10;
  }
`;

const SelectTag = styled.div`
  margin-right: 10px;
  padding: 7px 14px;
  border-radius: 30px;
  font-size: 11px;
  font-weight: 500;
  color: #fff;
  background-color: var(--primary);
  border: none;
  cursor: pointer;
`;

const DropBox = styled.div`
  background-color: var(--inputBackground);
  width: 100%;
  height: auto;
  margin-top: 3px;
  padding: 10px;
  border: 1px solid var(--borderPrimary);
  border-radius: 5px;
  }
`;

const StackFilterTag = styled.button`
  margin-right: 10px;
  padding: 7px 14px;
  border-radius: 30px;
  font-size: 11px;
  font-weight: 500;
  color: var(--primary);
  border: 1px solid var(--primary);
  cursor: pointer;
  &:hover {
    color: #fff;
    background-color: var(--primary);
    border: none;
  }
`;
