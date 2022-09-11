import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContexts";
import { useContext } from "react";
import HeaderMenu from "./HeaderMenu";
import HomeIcon from "@mui/icons-material/Home";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function Header() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  let searchHD = "";
  const handleSearch = (e) => {
    searchHD = e.target.value;
  };

  const handleClickSearch = () => {
    if (searchHD === "") {
      return;
    }
    auth.setSearch(searchHD);
    auth.setIsSearch(true);
  };
  let anchor = "left";
  let firstList = [
    "Action",
    "Adventure",
    "Comedy",
    "Anime",
    "Crime",
    "Drama",
    "Documentary",
    "Family",
    "History",
    "Fantasy",
    "Mystery",
    "Romance",
    "TV Movie",
    "America",
  ];

  let secondList = [
    "VietNam",
    "America",
    "Korea",
    "England",
    "China",
    "ThaiLand",
    "Japanese",
  ];

  const handleProfileMenuOpen = () => {
    if (!auth.isLogged) {
      auth.setOpenLoginPage(true);
      console.log("login", auth.openLoginPage);
      navigate("/login");
    } else {
      auth.setIsLogged(false);
    }
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <HeaderMenu nameList={"Thể Loại"} lists={firstList} />
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        {auth.isLogged ? <p>{auth.username}</p> : <p>Profile</p>}
      </MenuItem>
    </Menu>
  );

  const handleOpenSideBar = () => {
    console.log("click");
    auth.setOpenSideBar({ ...auth.openSideBar, [anchor]: "open" });
  };

  const handleHome = () => {
    auth.setIsSearch(false);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ position: "static" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={handleOpenSideBar}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Phimmoizzz.com
          </Typography>

          <Search
            sx={{
              maxWidth: "500px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={handleSearch}
              sx={{ flexGrow: 1, maxWidth: "500px" }}
            />
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <SearchIcon onClick={handleClickSearch} />
            </IconButton>
          </Search>
          <Box sx={{ display: { xs: "none", sm: "flex" } }}>
            <HeaderMenu nameList={"Thể Loại"} lists={firstList} />
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex", sm: "none" }, ml: 2 }}>
            <HeaderMenu nameList={"Quốc Gia"} lists={secondList} />
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <HomeIcon onClick={handleHome} />
          </IconButton>

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />{" "}
              {auth.isLogged && <Typography>Hello {auth.username}</Typography>}
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}

export default Header;
