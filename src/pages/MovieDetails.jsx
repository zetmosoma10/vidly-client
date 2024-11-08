import { useNavigate, useParams } from "react-router-dom";
import MovieForm from "../components/MovieForm";
import { useEffect, useState } from "react";
import { getMovie } from "../services/moviesServices";

const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(movie);

  useEffect(() => {
    const fetchMovie = async () => {
      setIsLoading(true);
      const movie = await getMovie(id);
      if (!movie.movie) return navigate("/not-found", { replace: true });
      setMovie(movie.movie);
      setIsLoading(false);
    };
    fetchMovie();
  }, [id]);

  if (isLoading) return <h2>Loading...</h2>;
  if (!movie) return null;

  return (
    <>
      <MovieForm
        title={movie.title}
        dailyRentalRate={movie.dailyRentalRate}
        numberInStock={movie.numberInStock}
        genre={movie.genre.genre}
        _id={movie._id}
      />
    </>
  );
};

export default MovieDetails;
