import { useNavigate, useParams } from "react-router-dom";
import MovieForm from "../components/MovieForm";
import { useEffect, useState } from "react";
import { getMovie } from "../services/moviesServices";

const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(movie);

  useEffect(() => {
    const fetchMovie = async () => {
      const movie = await getMovie(id);
      if (!movie.movie) return navigate("/not-found", { replace: true });
      setMovie(movie.movie);
    };
    fetchMovie();
  }, [id]);

  if (!movie) return null;

  return (
    <MovieForm
      title={movie.title}
      dailyRentalRate={movie.dailyRentalRate}
      numberInStock={movie.numberInStock}
      genre={movie.genre.genre}
      _id={movie._id}
    />
  );
};

export default MovieDetails;
