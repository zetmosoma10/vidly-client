import { Link } from "react-router-dom";
import { displayMovieMessage } from "../utils/displayMovieMessage";

const MoviesTable = ({
  paginatedMovies,
  deleteMovie,
  filtered,
  onSort,
  onSearchChange,
  searchQuery,
}) => {
  return (
    <>
      <Link to="movie/new" className="btn btn-primary mb-3">
        New Movie
      </Link>
      <p className="mb-3">{displayMovieMessage(filtered)}</p>
      <input
        type="text"
        name="search"
        placeholder="Search..."
        className="form-control"
        value={searchQuery}
        onChange={onSearchChange}
      />
      <table className="table mt-3">
        <thead>
          <tr>
            <th style={{ cursor: "pointer" }} onClick={() => onSort("title")}>
              Title
            </th>
            <th
              style={{ cursor: "pointer" }}
              onClick={() => onSort("genre.genre")}
            >
              Genre
            </th>
            <th
              style={{ cursor: "pointer" }}
              onClick={() => onSort("numberInStock")}
            >
              Stock
            </th>
            <th
              style={{ cursor: "pointer" }}
              onClick={() => onSort("dailyRentalRate")}
            >
              Rate
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {paginatedMovies.map((movie) => (
            <tr key={movie._id}>
              <td>
                <Link to={`movie/${movie._id}`}>{movie.title}</Link>
              </td>
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
    </>
  );
};

export default MoviesTable;
