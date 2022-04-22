import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DispatchContext } from "../../App";

import * as Api from "../../api";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Login = () => {
  const theme = createTheme();
  const navigate = useNavigate();
  const dispatch = useContext(DispatchContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //이메일 형태 검사
  const validateEmail = (email) => {
    return email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  };

  // 이메일 적합성 검사
  const isEmailValid = validateEmail(email);
  // 비밀번호 적합성 검사
  const isPasswordValid = password.length >= 8;
  // 이메일 비밀번호 조건 동시 만족 검사
  const isFormValid = isEmailValid && isPasswordValid;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // "user/login" 엔드포인트로 post요청함.
      const res = await Api.post("user/login", {
        email,
        password,
      });

      const emailData = res.data.email; // navigate 할 때, state: emailData를 사용하여 emailData를 함께 보내주고자 함
      const currentPassword = res.data.password; // passwordRouter 에서 필요하여 일단 보내보려고 함.

      if (res.data.passwordReset === true) {
        navigate("/change-password", {
          state: {
            email: emailData,
            currentPassword: currentPassword,
          },
          replace: true,
        });
      } else if (res.data.passwordReset === false || res.data.passwordReset === null) {
        // 유저 정보는 response의 data임.
        const user = res.data;
        // JWT 토큰은 유저 정보의 token임.
        const jwtToken = user.token;
        // sessionStorage에 "userToken"이라는 키로 JWT 토큰을 저장함.
        sessionStorage.setItem("userToken", jwtToken);
        // dispatch 함수를 이용해 로그인 성공 상태로 만듦.
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: user,
        });
        // 기본 페이지로 이동함.
        navigate("/", { replace: true });
      }
    } catch (err) {
      console.log("로그인에 실패하였습니다.\n", err);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              type="email"
              name="email"
              autoComplete="on"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {!isEmailValid && (
              <span className="text-primary" style={{ fontSize: "12px", margin: "5px 0 0 0" }}>
                Email is invalid.
              </span>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="on"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {!isPasswordValid && (
              <span className="text-primary" style={{ fontSize: "12px", margin: "5px 0 0 0" }}>
                Password is too short (minimum is 8 characters)
              </span>
            )}
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} style={{ marginTop: "30px" }} disabled={!isFormValid}>
              Log In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link onClick={() => navigate("/reset-password")} variant="body2" style={{ cursor: "pointer" }}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link onClick={() => navigate("/register")} variant="body2" style={{ cursor: "pointer" }}>
                  "Don't have an account?"
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
