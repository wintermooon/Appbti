import * as React from "react";
import { useNavigate } from "react-router-dom";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";

import "./styles/Header.css";

const Header = function () {
  const navigate = useNavigate();

  return (
    <Toolbar className="Toolbar" sx={{ flexWrap: "wrap" }}>
      <Typography variant="h6" href="#" color="inherit" noWrap sx={{ flexGrow: 1 }}>
        AppBTI
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
          My page
        </Link>
        <Link variant="button" color="text.primary" href="#" sx={{ my: 1, mx: 1.5 }}>
          Contack us
        </Link>
      </nav>
      <Button onClick={() => navigate("/login")} variant="outlined" sx={{ my: 1, mx: 1.5 }}>
        Login
      </Button>
    </Toolbar>
  );
};

export default Header;
