import { displayMovieMessage } from "../utils/displayMovieMessage";

const MoviesTable = ({ paginatedMovies, deleteMovie, filtered }) => {
  return (
    <>
      <p>{displayMovieMessage(filtered)}</p>
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
    </>
  );
};

export default MoviesTable;
