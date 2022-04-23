import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserStateContext, DispatchContext } from "../App";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import logoUrl from "./img/Logo.png";

const Header = function () {
  const [isToggled, setIsToggled] = useState(false);

  const navigate = useNavigate();

  const userState = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);

  // 전역상태에서 user가 null이 아니라면 로그인 성공 상태임.
  const isLogin = !!userState.user;

  // 로그아웃 클릭 시 실행되는 함수
  const logout = () => {
    // sessionStorage 에 저장했던 JWT 토큰을 삭제함.
    sessionStorage.removeItem("userToken");
    // dispatch 함수를 이용해 로그아웃함.
    dispatch({ type: "LOGOUT" });
    // 기본 페이지로 돌아감.
    navigate("/");
    alert("👻 로그아웃 완료 👻");
  };

  return (
    <HeaderBox isToggled={isToggled}>
      {/* 작은 화면 */}
      {/* 토글 메뉴 버튼( */}
      <div
        className="ToggleMenu"
        onClick={() => {
          setIsToggled(!isToggled);
        }}
      >
        <FontAwesomeIcon icon={!isToggled ? faBars : faTimes} />
      </div>

      {/* 로고 */}
      <div className="Logo">
        <img
          src={logoUrl}
          alt=""
          onClick={() => {
            navigate("/");
          }}
        />
      </div>

      {/* 토글 유저 버튼 ToggleUser*/}
      {!isLogin && (
        <div
          className="ToggleUser"
          onClick={() => {
            navigate("/login");
          }}
        >
          Log-in
        </div>
      )}
      {isLogin && (
        <div className="ToggleUser" onClick={logout}>
          Log-out
        </div>
      )}

      {/* 큰 화면 */}
      {/* 메뉴 리스트 */}
      <div className="NavMenu">
        <div
          onClick={() => {
            navigate("/");
          }}
        >
          AppBTI-test
        </div>
        <div
          onClick={() => {
            navigate("/");
          }}
        >
          Editor’s-pick
        </div>
        <div
          onClick={() => {
            navigate("/");
          }}
        >
          Community
        </div>
        <div
          onClick={() => {
            navigate("/");
          }}
        >
          About-us
        </div>
      </div>

      {/* User 메뉴 리스트 */}
      <div className="NavUser">
        {!isLogin && (
          <div
            className="NavUserButton"
            onClick={() => {
              navigate("/login");
            }}
          >
            Log-in
          </div>
        )}
        {isLogin && (
          <div className="NavUserButton" onClick={logout}>
            Log-out
          </div>
        )}
      </div>
    </HeaderBox>
  );
};

export default Header;

const HeaderBox = styled.div`
  width: 100%;
  height: 60px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #263238;
  background-color: #fff;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.05);
  z-index: 100;

  .Logo {
    margin: 0 1rem;

    img {
      height: 50px;
      padding: 0 10px;
      cursor: pointer;
    }
  }

  .NavMenu {
    display: flex;
    list-style: none;

  }

  .NavUser {
    display: flex;
    list-style: none;
    padding 0 1.5rem;
  }

  .NavMenu div {
    padding: 0 0.9rem;
    cursor: pointer;
    &:hover {
      color: #304FFE;
    }
  }

  .NavUserButton {
    padding: 0 0.9rem;
    line-height: 35px;
    text-align: center;
    color: #304FFE;
    border: 1px solid #304FFE;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      background-color: #304FFE;
      color:#fff;
    }
    transition: 0.5s;
    display: inline-block;
  }

  .ToggleMenu {
    display: none;
    font-size: 1.5rem;
    padding: 1rem 1rem;
  }

  .ToggleUser {
    display: none;
    font-size: 1.5rem;
    padding: 1rem 1rem;
  }

  @media screen and (max-width: 795px) {
    flex-wrap: wrap;

    .NavMenu {
      display: ${(props) => (props.isToggled ? "flex" : "none")};
      flex-direction: column;
      width: 100%;
      background-color: #E8EAF6;
      color: black;
      padding: 0 20px;
      z-index: 90;
    }

    .NavUser {
      display: none;
    }

    .Toggle {
      display: block;
    }

    .NavMenu div,
    .NavUser div {
      margin: 1rem 0;
      padding: 0;
      cursor: pointer;
      &:hover {
        color: #304FFE;
      }
    }

    .ToggleMenu {
      display: block;
      width: 60px;
    }

    .ToggleUser {
      display: block;
      margin: 0 0.9rem;
      padding: 0 0.9rem;
      line-height: 35px;
      text-align: center;
      font-size: 1rem;
      color: #304FFE;
      border: 1px solid #304FFE;
      border-radius: 5px;
      cursor: pointer;
      &:hover {
        background-color: #304FFE;
        color:#fff;
      }
      transition: 0.5s;
      display: inline-block;
    }
  }
`;
