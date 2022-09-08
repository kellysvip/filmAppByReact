import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import useAuth from "../hooks/useAuth";

const PaginationRounded = () => {
    const auth = useAuth()
    const handleChange = (event, value) => {
        auth.setPage(value)
        // auth.setIsSearch(true)
    }
  return (
    <Stack
      sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}
      spacing={2}
    >
      <Pagination count={10} variant="outlined" shape="rounded" onChange={handleChange}/>
    </Stack>
  );
};

export default PaginationRounded;
