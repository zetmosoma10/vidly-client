import { useState } from "react";
import { movies } from "../services/fakeMovieService";
import Pagination from "./common/Pagination";
import { paginate } from "../utils/paginate";

const Movie = () => {
  const [allMovies, setAllMovies] = useState(movies);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  const deleteMovie = (id) => {
    setAllMovies((prevMovies) => {
      return prevMovies.filter((m) => m._id !== id);
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedMovies = paginate(allMovies, currentPage, pageSize);

  let message;
  if (allMovies.length === 1) message = "Showing 1 movie in the database";
  if (allMovies.length === 0) message = "There's no movies in the database";
  if (allMovies.length > 1)
    message = `Showing ${allMovies.length} movies in the database`;

  return (
    <>
      <p>{message}</p>
      {allMovies.length > 0 && (
        <table className="table mt-3">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>NumberInStock</th>
              <th>DailyRentalRate</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {paginatedMovies.map((movie) => (
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
            ))}
          </tbody>
        </table>
      )}
      <Pagination
        moviesCount={allMovies.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default Movie;
