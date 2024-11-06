import { useState } from "react";
import { movies } from "../services/fakeMovieService";
import { genres } from "../services/fakeGenreService";
import { paginate } from "../utils/paginate";
import Pagination from "./common/Pagination";
import ListGroup from "./common/ListGroup";
import MoviesTable from "./MoviesTable";

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
    setCurrentPage(1);
  };

  const filtered = selectedGenre
    ? allMovies.filter((m) => m.genre.genre === selectedGenre)
    : allMovies;

  const paginatedMovies = paginate(filtered, currentPage, pageSize);

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
        {filtered.length > 0 && (
          <MoviesTable
            paginatedMovies={paginatedMovies}
            deleteMovie={deleteMovie}
            filtered={filtered}
          />
        )}
        <Pagination
          moviesCount={filtered.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Movie;
