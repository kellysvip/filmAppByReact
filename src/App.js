import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import Typography from "@mui/material/Typography";
import { Box, Link } from "@mui/material";
import Header from "./layouts/Header";
import { Outlet } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContexts";
import { useState } from "react";
import Sidebar from "./layouts/Sidebar";
import { Grid } from "@mui/material";
import FilmCard from "./layouts/FilmCard";
import { useEffect } from "react";
import PaginationRounded from "./layouts/Pagination";
const BASE_URL =
  "https://api.themoviedb.org/3/movie/550/recommendations?api_key=d509fe4d4236b8713217df3940b553b4&language=vi";
const SEARCH_URL =
  "https://api.themoviedb.org/3/search/movie?api_key=d509fe4d4236b8713217df3940b553b4";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://www.coderschool.vn">
        CoderSchool
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [response, setResponse] = useState();

  const [page, setPage] = useState(1);
  const [openModalDetailPage, setOpenModalDetailPage] = useState(false);
  const [openLoginPage, setOpenLoginPage] = useState(false);
  const [search, setSearch] = useState("action");
  const [isSearch, setIsSearch] = useState(false);
  const [openSideBar, setOpenSideBar] = useState({
    left: false,
  });
  const [username, setUsername] = useState("");
  const [items, setItems] = useState([]);

  React.useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  React.useEffect(() => {
    const items = JSON.parse(localStorage.getItem("items"));
    if (items) {
      setItems(items);
    }
  }, []);

  useEffect(() => {
    const renderFilmCard = async () => {
      try {
        const res = await (
          await fetch(
            isSearch
              ? `${SEARCH_URL}&query=${search}&page=${page}`
              : `${BASE_URL}&page=${page}`
          )
        ).json();
        setResponse(res.results);
      } catch (error) {
        console.log("Failed", error);
      }
    };

    renderFilmCard();
  }, [page, search, isSearch]);
  Copyright();
  return (
    <ThemeProvider theme={darkTheme}>
      <AuthContext.Provider
        value={{
          response,
          BASE_URL,
          page,
          setPage,
          setOpenModalDetailPage,
          openModalDetailPage,
          setSearch,
          setIsSearch,
          openLoginPage,
          setOpenLoginPage,
          isLogged,
          setIsLogged,
          openSideBar,
          setOpenSideBar,
          username,
          setUsername,
          items,
          setItems,
        }}
      >
        <CssBaseline />
        <Header />
        <Box sx={{ display: "flex" }}>
          <Sidebar />
          <Grid container spacing={0}>
            {response?.map((film, index) => (
              <Grid
                key={index}
                item
                xs={12}
                md={6}
                lg={3}
                sx={{ display: "flex", mt: 2 }}
              >
                <FilmCard key={film.id} id={film.id} film={film} />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Outlet />
        <br />
        <PaginationRounded />

        <Box sx={{ my: 4 }}>
          <Copyright />
        </Box>
      </AuthContext.Provider>
    </ThemeProvider>
  );
}

export default App;
