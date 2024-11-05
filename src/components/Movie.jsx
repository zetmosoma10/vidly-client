import { useState } from "react";
import { movies } from "../services/fakeMovieService";

const Movie = () => {
  const [allMovies, setAllMovies] = useState(movies);

  const deleteMovie = (id) => {
    setAllMovies((prevMovies) => {
      return prevMovies.filter((m) => m._id !== id);
    });
  };

  const displayMovies = allMovies.map((movie) => (
    <tr key={movie._id}>
      <td>{movie.title}</td>
      <td>{movie.genre.genre}</td>
      <td>{movie.numberInStock}</td>
      <td>{movie.dailyRentalRate}</td>
      <td>
        <button
          onClick={() => deleteMovie(movie._id)}
          className="btn btn-sm btn-danger"
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  let message;
  if (allMovies.length === 1) message = "Showing 1 movie in the database";
  if (allMovies.length === 0) message = "There's no movies in the database";
  if (allMovies.length > 1)
    message = `Showing ${allMovies.length} movies in the database`;

  return (
    <>
      <p className="mt-3">{message}</p>
      {allMovies.length > 0 && (
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>NumberInStock</th>
              <th>DailyRentalRate</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{displayMovies}</tbody>
        </table>
      )}
    </>
  );
};

export default Movie;
