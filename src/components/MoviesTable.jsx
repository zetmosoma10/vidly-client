import { Link } from "react-router-dom";
import { displayMovieMessage } from "../utils/displayMovieMessage";

const MoviesTable = ({ paginatedMovies, deleteMovie, filtered, onSort }) => {
  return (
    <>
      <p>{displayMovieMessage(filtered)}</p>
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
