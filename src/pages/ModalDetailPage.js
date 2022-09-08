import * as React from "react";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import useAuth from "../hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, CardMedia } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const ModalDetailPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const { detailId: id } = useParams();

 

  const handleClose = () => {
    auth.setOpenModalDetailPage(false);
    navigate("/");
  };

  useEffect(() => {
    try {
      const getData = async () => {
        const res = await (
          await fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=d509fe4d4236b8713217df3940b553b4&language=vi`
          )
        ).json();

        setData(res);
      };
      getData();
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  return (
    <div>
      <Modal
        open={auth.openModalDetailPage}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            {data.title}
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h4">
            {data.release_date?.slice(0, 4)}
          </Typography>

          <CardMedia
            component="img"
            height="140"
            image={"https://image.tmdb.org/t/p/w500/" + data.backdrop_path}
            alt="green iguana"
          />
          {data.genres?.map((gen, i) => (
            <Button
              key={i}
              variant="contained"
              sx={{
                backgroundColor: "hsl(16, 100%, 50%)",
                borderRadius: 4,
                color: "#fff",
                mt: 1,
                mr: 1,
              }}
              size="small"
            >
              {gen.name.slice(5, 20)}
            </Button>
          ))}
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Rating: {data.vote_average} /10
            <br />
            {data.overview}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalDetailPage;
