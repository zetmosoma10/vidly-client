import { useState } from "react";
import { movies } from "../services/fakeMovieService";
import { paginate } from "../utils/paginate";
import { displayMovieMessage } from "../utils/displayMovieMessage";
import { genres } from "../services/fakeGenreService";
import Pagination from "./common/Pagination";
import ListGroup from "./common/ListGroup";

const Movie = () => {
  const [allMovies, setAllMovies] = useState(movies);
  const [allGenres, setAllGenres] = useState(genres);
  const [selectedGenre, setSelectedGenre] = useState(null);
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

  const onSelectGenre = (genre) => {
    setSelectedGenre(genre);
  };

  const paginatedMovies = paginate(allMovies, currentPage, pageSize);

  return (
    <div className="row ">
      <div className="col-2">
        <ListGroup
          selectedGenre={selectedGenre}
          genres={allGenres}
          onSelectGenre={onSelectGenre}
        />
      </div>
      <div className="col">
        <p>{displayMovieMessage(allMovies)}</p>
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
      </div>
    </div>
  );
};

export default Movie;
