import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { Typography } from "@mui/material";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
const Sidebar = () => {
  const auth = useAuth();
  const [checked, setChecked] = useState([1]);
 const handleClick = (value) => {
  auth.setSearch(value)
  checked === "" ? auth.setIsSearch(false) : auth.setIsSearch(true);
 }
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List
      dense
      sx={{ width: "100%", maxWidth: 150, bgcolor: "background.paper" }}
    >
      <Typography>Your Favorite Type</Typography>
      {auth.genres?.slice(0, 10).map((value, index) => {
        const labelId = `checkbox-list-secondary-label-${value}`;
        return (
          <ListItem
            key={value.id}
            secondaryAction={
              <Checkbox
                edge="end"
                onChange={handleToggle(value)}
                checked={checked.indexOf(value) !== -1}
                inputProps={{ "aria-labelledby": labelId }}
                key={value.name}
                onClick={() => handleClick(value.name)}
              />
            }
            disablePadding
          >
            <ListItemButton key={value.id}>
              <ListItemText key={index} id={labelId} primary={value.name} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export default Sidebar;
