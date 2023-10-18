import * as React from "react";
import { useState, useEffect } from "react";

// Mui components
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

import logo from "../assets/graduate-cap.png";
import house from "../assets/house.png";
import speech from "../assets/speech-bubble.png";
import back from "../assets/logout.png";

const pages = ["Home", "Forum", "Log Out"];
const images = [house, speech, back];
// const routes = ["/teacher-dashboard", "/student-dashboard", "/"];

const theme = createTheme({
  typography: {
    fontFamily: "'Roboto Condensed', sans-serif",
  },
});

function NavBar() {
  const navigateToPage = (url) => {
    window.location.href = url;
  };

  const isStudentDashboard = (
    window.location.pathname.includes('student-dashboard') || 
    window.location.pathname.includes('view-video') ||
    window.location.pathname.includes('forum/student')
  );

  const getRoute = (page) => {
    switch (page) {
      case "Home":
        return isStudentDashboard ? "/student-dashboard" : "/teacher-dashboard";
      case "Forum":
        return isStudentDashboard ? "/forum/student" : "/forum/teacher";
      case "Log Out":
        return "/";
      default:
        return "/";
    }
  };

  const [scrolling, setScrolling] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 10) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: scrolling ? "rgba(17, 57, 70, 0.8)" : "#113946",
          transition: "background-color 0.3s ease",
          height: "80px",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{ display: "flex", alignItems: "center" }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{
                marginRight: "15px",
                width: "50px",
                height: "auto",
                filter: "invert(1)",
                marginLeft: "-20px",
                marginBottom: "10px",
                marginTop: "-10px",
              }}
            />
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                mr: 4,
                display: { xs: "none", md: "flex" },
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                marginBottom: "10px",
                marginTop: "-10px",
              }}
            >
              ONLINE <br />
              CLASSROOM
            </Typography>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page}>
                    <Typography textAlign="center" fontWeightBold={700}>
                      {page}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                marginBottom: "10px",
                marginTop: "-10px",
              }}
            >
              <Box sx={{ flexGrow: 1 }} />
              {pages.map((page, index) => (
                <Button
                  key={page}
                  onClick={() => navigateToPage(getRoute(page))}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    mr: 4,
                    fontSize: "1.2rem",
                    padding: "12px 24px",
                    fontWeight: "bold",
                    position: "relative",
                    overflow: "hidden",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      left: 0,
                      bottom: 0,
                      width: "0",
                      height: "2px",
                      background: "white",
                      transition: "width 0.3s ease-in",
                    },
                    "&:hover::after": {
                      width: "100%",
                    },
                    "&:hover": {
                      textDecoration: "none",
                    },
                  }}
                >
                  <IconButton color="inherit">
                    <img
                      src={images[index]}
                      alt="Logo"
                      style={{
                        marginRight: "15px",
                        width: "40px",
                        height: "auto",
                        filter: "invert(1)",
                        marginLeft: "-20px",
                      }}
                    />
                  </IconButton>
                  {page}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
export default NavBar;
