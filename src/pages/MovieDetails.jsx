import { useNavigate, useParams } from "react-router-dom";
import MovieForm from "../components/MovieForm";
import { movies } from "./../services/fakeMovieService";
import { useEffect } from "react";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentMovie = movies.find((m) => m._id === id);

  useEffect(() => {
    if (!currentMovie) return navigate("/not-found", { replace: true });
  }, [currentMovie, navigate]);

  if (!currentMovie) return null;

  return (
    <MovieForm
      title={currentMovie.title}
      dailyRentalRate={currentMovie.dailyRentalRate}
      numberInStock={currentMovie.numberInStock}
      genre={currentMovie.genre.genre}
      _id={currentMovie._id}
    />
  );
};

export default MovieDetails;
