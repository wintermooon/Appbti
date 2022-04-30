import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserStateContext, DispatchContext } from "../App";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";

import "./styles/Header.css";
import logoUrl from "./img/Logo.png";

const Header = function () {
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
    alert("로그아웃 완료! 🙀");
  };

  return (
    <Toolbar className="Toolbar" sx={{ flexWrap: "wrap" }}>
      <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
        <img
          className="Logo"
          src={logoUrl}
          alt="로고 이미지"
          onClick={() => {
            navigate("/");
          }}
        />
      </Typography>
      <nav className="Nav">
        <Link variant="button" color="text.primary" href="#" sx={{ my: 1, mx: 1.5 }}>
          AppBTI Test
        </Link>
        <Link variant="button" color="text.primary" href="#" sx={{ my: 1, mx: 1.5 }}>
          Editor’s suggest
        </Link>
        <Link variant="button" color="text.primary" onClick={() => navigate("/community")} sx={{ my: 1, mx: 1.5 }}>
          Community
        </Link>
        <Link variant="button" color="text.primary" href="#" sx={{ my: 1, mx: 1.5 }}>
          About us
        </Link>
      </nav>

      {!isLogin ? (
        <Button onClick={() => navigate("/login")} variant="outlined" sx={{ my: 1, mx: 1.5 }}>
          Login
        </Button>
      ) : (
        <Button onClick={logout} variant="contained" sx={{ my: 1, mx: 1.5 }}>
          Logout
        </Button>
      )}
    </Toolbar>
  );
};

export default Header;
