import React, { useState, useEffect, useReducer, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { get } from "./api";
import { loginReducer } from "./reducer";
import "./App.css";

import Header from "./components/Header";
import Main from "./components/Main";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import CommunityPage from "./components/community/CommunityPage";
import PostView from "./components/community/freeboard/PostView";
import AppbtiTest from "./components/appbtitest/AppbtiTest";
import EditorsPick from "./components/editorspick/EditorsPick";

import Question1 from "./components/appbtitest/Pages/Question1";
import Question2 from "./components/appbtitest/Pages/Question2";

export const UserStateContext = createContext(null);
export const DispatchContext = createContext(null);

function App() {
  // useReducer 훅을 통해 userState 상태와 dispatch함수를 생성함.
  const [userState, dispatch] = useReducer(loginReducer, {
    user: null,
  });
  const isLogin = !!userState.user;

  // console.log(currentUser);

  // 유저 경로 얻기
  // const location = window.location.pathname;

  // 아래의 fetchCurrentUser 함수가 실행된 다음에 컴포넌트가 구현되도록 함.
  // 아래 코드를 보면 isFetchCompleted 가 true여야 컴포넌트가 구현됨.
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);

  const fetchCurrentUser = React.useCallback(async () => {
    try {
      // 이전에 발급받은 토큰이 있다면, 이를 가지고 유저 정보를 받아옴.
      const userToken = sessionStorage.getItem("userToken");
      const jwtDecoded = jwtDecode(userToken);
      const userId = jwtDecoded.userId;
      const res = await get("users", userId);
      const currentUser = res.data;
      // dispatch 함수를 통해 로그인 성공 상태로 만듦.
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: currentUser,
      });

      console.log("%c sessionStorage에 토큰 있음.", "color: #d93d1a;");
    } catch {
      console.log("%c SessionStorage에 토큰 없음.", "color: #d93d1a;");
    }
    // fetchCurrentUser 과정이 끝났으므로, isFetchCompleted 상태를 true로 바꿔줌
    setIsFetchCompleted(true);
  }, []);

  // useEffect함수를 통해 fetchCurrentUser 함수를 실행함.
  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  if (!isFetchCompleted) {
    return <span>loading...</span>;
  }

  return (
    <DispatchContext.Provider value={dispatch}>
      <UserStateContext.Provider value={userState}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/community/freeboards/:id" element={<PostView />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/editorspick" element={<EditorsPick />} />

            <Route path="/AppbtiTest" element={<AppbtiTest />} />
            <Route path="/AppbtiTest/1" element={<Question1 />} />
            <Route path="/AppbtiTest/2" element={<Question2 />} />
          </Routes>
        </Router>
      </UserStateContext.Provider>
    </DispatchContext.Provider>
  );
}

export default App;
