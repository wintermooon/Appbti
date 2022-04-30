import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { AiFillCaretDown } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";

const TagFilter = function () {
  const SeleteList = ["BTCUSD.PERP", "ETHUSD.PERP", "BCHUSD.PERP", "LTCUSD.PERP", "XRPUSD.PERP", "1000SHIBUSD.PERP"];

  const [selectedValue, setSelectedValue] = useState("All Symbols");
  const [isDroped, setIsDroped] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const outsideRef = useRef(null);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

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
          <p className="selectedValue">{selectedValue}</p>
          <div>
            <i>
              <AiFillCaretDown size="15" color="var(--textPrimary)" />
            </i>
          </div>
        </SeleteBox>
        {isDroped && (
          <DropBox>
            <InputBox>
              <div>
                <i>
                  <BiSearch color="var(--borderPrimary)" />
                </i>
              </div>
              <input type="text" value={inputValue} placeholder="Search Symbol" onChange={handleChange} />
            </InputBox>
            <div className="listItem" value="All Symbols" onClick={handleClick}>
              All Symbols
            </div>
            {SeleteList.map((element) => {
              if (element.toLowerCase().includes(inputValue.toLowerCase())) {
                return (
                  <div key={element} className="listItem" id={element} value={element} onClick={handleClick}>
                    {element}
                  </div>
                );
              }
            })}
          </DropBox>
        )}
      </DropdownContainer>
    </DropdownDiv>
  );
};

export default TagFilter;

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

  text-align: left;
  background-color: var(--inputBackground);
  border: 1px solid var(--borderPrimary);
  border-radius: 5px;
  cursor: pointer;

  p {
    padding: 0 20px;
    color: var(--textPrimary);
    font-size: 11px;
  }

  div {
    padding: 0 20px;
    z-index: 10;
  }
`;

const DropBox = styled.div`
  background-color: var(--inputBackground);
  width: 100%;
  height: auto;
  margin-top: 3px;
  border: 1px solid var(--borderPrimary);
  border-radius: 5px;

  .listItem {
    width: auto;
    padding: 10px 20px;
    font-size: 11px;
    color: var(--textPrimary);
    cursor: pointer;
    text-align: left;
    &:hover {
      background-color: var(--secondary);
    }
  }
`;

const InputBox = styled.div`
  display: flex;
  border-bottom: 1px solid var(--borderPrimary);
  align-items: center;
  padding: 0 0 0 10px;

  div {
    position: relative;
    top: 2px;
  }

  input {
    width: 85%;
    height: 35px;
    outline: none;
    background-color: var(--inputBackground);
    margin-left: 10px;
    font-size: 11px;
    font-weight: 400;
    color: var(--textPrimary);

    border: none;
    &::placeholder {
      color: var(--textSecondary);
      font-size: 11px;
    }
  }
`;
