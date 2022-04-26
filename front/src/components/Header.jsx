import * as React from "react";
import { useNavigate } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";

import "./styles/Header.css";
import logoUrl from "./img/Logo.png";

const Header = function () {
  const navigate = useNavigate();

  return (
    <Toolbar className="Toolbar" sx={{ flexWrap: "wrap" }}>
      <Typography variant="h6" href="#" color="inherit" noWrap sx={{ flexGrow: 1 }}>
        <img
          className="Logo"
          src={logoUrl}
          alt=""
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
        <Link variant="button" color="text.primary" href="#" sx={{ my: 1, mx: 1.5 }}>
          Community
        </Link>
        <Link variant="button" color="text.primary" href="#" sx={{ my: 1, mx: 1.5 }}>
          About us
        </Link>
      </nav>

      <Button onClick={() => navigate("/login")} variant="outlined" sx={{ my: 1, mx: 1.5 }}>
        Login
      </Button>
    </Toolbar>
  );
};

export default Header;
<<<<<<< Updated upstream

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
      background-color: #f3f3f3;
      color: black;
      padding: 0 20px;
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
=======
>>>>>>> Stashed changes
