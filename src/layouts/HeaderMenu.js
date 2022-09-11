import { Button, ClickAwayListener, Grid, MenuList } from "@mui/material";
import * as React from "react";
import { PopperUnstyled } from "@mui/base";
import styled from "styled-components";
import useAuth from "../hooks/useAuth";

const Popup = styled(PopperUnstyled)({
  zIndex: 1000,
});

export default function HeaderMenu({ nameList, lists }) {
  const auth = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleListKeyDown = (event) => {
    if (event.key === "Tab") {
      setAnchorEl(null);
    } else if (event.key === "Escape") {
      anchorEl.focus();
      setAnchorEl(null);
    }
  };

  const handleChooseType = (event) => {
    console.log(event.currentTarget.value);
    auth.setSearch(event.currentTarget.value);
    auth.setIsSearch(true);
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        onClick={handleClick}
        variant="outlined"
        sx={{
          borderRadius: "40px",
          color: "#fff",
          border: "0.1rem solid #fff",
        }}
      >
        {nameList}
      </Button>
      <Popup
        role={undefined}
        id="composition-menu"
        open={open}
        anchorEl={anchorEl}
        disablePortal
        modifiers={[
          {
            name: "offset",
            options: {
              offset: [0, 4],
            },
          },
        ]}
      >
        <ClickAwayListener onClickAway={handleClose}>
          <MenuList
            variant="container"
            onKeyDown={handleListKeyDown}
            sx={{
              boxShadow: "md",
              bgcolor: "background.body",
              background: "#111",
              display: "flex",
              flexDirection: "column",
              width: "500px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* {lists?.map((list,i) => (
                <Button sx={{color: '#fff'}} key={i} value={list} onClick={handleChooseType}>{list}</Button>
            ))} */}

            <Grid container spacing={0}>
              {lists?.map((list, i) => (
                <Grid
                  key={i}
                  item
                  xs={12}
                  md={6}
                  lg={3}
                  sx={{ display: "flex", mt: 2 }}
                >
                  <Button
                    sx={{ color: "#fff" }}
                    key={i}
                    value={list}
                    onClick={handleChooseType}
                  >
                    {list}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </MenuList>
        </ClickAwayListener>
      </Popup>
    </div>
  );
}
