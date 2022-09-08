import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function FilmCard({ film, id }) {
  const auth = useAuth();
  const navigate = useNavigate();
  const handleOpen = () => {
    if (auth.isLogged) {
      navigate(`/detail/${id}`);
      auth.setOpenModalDetailPage(true);
    } else {
      navigate(`/login`);
    }
  };
  return (
    <Card onClick={handleOpen} sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={"https://image.tmdb.org/t/p/w500/" + film.poster_path}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {film.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {film.overview?.slice(0, 200).trim() + "..."}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
