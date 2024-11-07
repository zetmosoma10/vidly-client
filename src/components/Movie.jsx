import { useEffect, useState } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./common/Pagination";
import ListGroup from "./common/ListGroup";
import MoviesTable from "./MoviesTable";
import _ from "lodash";
import axios from "axios";

const url = "https://vidly-api-t652.onrender.com";

const Movie = () => {
  const [allMovies, setAllMovies] = useState([]);
  const [allGenres, setAllGenres] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  useEffect(() => {
    const getMovies = async () => {
      try {
        const {
          data: { data },
        } = await axios.get(`${url}/api/movies`);
        setAllMovies(data.movies);
      } catch (err) {
        console.log(err);
      }
    };

    const getGenres = async () => {
      try {
        const {
          data: { data },
        } = await axios.get(`${url}/api/genres`);
        setAllGenres(data.genres);
      } catch (err) {
        console.log(err);
      }
    };
    getMovies();
    getGenres();
  }, []);

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
    setSearchQuery("");
  };

  const onSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setSelectedGenre(null); // Clear genre selection on search
    setCurrentPage(1); // Reset to the first page
  };

  const onSort = (path) => {
    setSortColumn((prevSortColumn) => {
      if (prevSortColumn.path === path) {
        return {
          ...prevSortColumn,
          order: prevSortColumn.order === "asc" ? "desc" : "asc",
        };
      } else {
        return { path, order: "asc" };
      }
    });
  };

  const filtered = searchQuery
    ? allMovies.filter((m) =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : selectedGenre
    ? allMovies.filter((m) => m.genre.genre === selectedGenre)
    : allMovies;

  const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

  const paginatedMovies = paginate(sorted, currentPage, pageSize);

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
            onSort={onSort}
            searchQuery={searchQuery}
            onSearchChange={onSearchChange}
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
