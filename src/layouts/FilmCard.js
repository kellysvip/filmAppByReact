import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { useState } from "react";
export default function FilmCard({ film, id }) {
  const auth = useAuth();
  const navigate = useNavigate();
  const [colorStar, setColorStar] = useState(false);

  const handleOpen = () => {
    if (auth.isLogged) {
      navigate(`/detail/${id}`);
      auth.setOpenModalDetailPage(true);
    } else {
      navigate(`/login`);
    }
  };
  const handleFavorite = () => {
    if (colorStar) {
      setColorStar(false);
    } else {
      setColorStar(true);
      auth.setItems(film.title);
      console.log(film.title);
    }
  };

  return (
    <Card sx={{ width: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={"https://image.tmdb.org/t/p/w500/" + film.poster_path}
          alt="error from api"
          onClick={handleOpen}
        />
        <CardContent>
          {colorStar ? (
            <StarIcon
              onClick={handleFavorite}
              sx={{
                position: "absolute",
                color: "#fff",
                zIndex: 20,
                left: "300px",
                top: "160px",
              }}
            />
          ) : (
            <StarBorderIcon
              onClick={handleFavorite}
              sx={{
                position: "absolute",
                color: "#fff",
                zIndex: 20,
                left: "300px",
                top: "160px",
              }}
            />
          )}

          <Typography
            onClick={handleOpen}
            gutterBottom
            variant="h5"
            component="div"
          >
            {film.title}
          </Typography>

          <Typography
            onClick={handleOpen}
            variant="body2"
            color="text.secondary"
          >
            {film.overview?.slice(0, 200).trim() + "..."}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
