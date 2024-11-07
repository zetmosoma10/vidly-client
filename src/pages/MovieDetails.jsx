import { useParams } from "react-router-dom";
import MovieForm from "../components/MovieForm";
import { movies } from "./../services/fakeMovieService";

const MovieDetails = () => {
  const { id } = useParams();
  const currentMovie = movies.find((m) => m._id === id);

  return (
    <MovieForm
      title={currentMovie.title}
      rate={currentMovie.dailyRentalRate}
      stock={currentMovie.numberInStock}
      genre={currentMovie.genre.genre}
    />
  );
};

export default MovieDetails;
