import { useContext, useEffect, useState } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./common/Pagination";
import ListGroup from "./common/ListGroup";
import MoviesTable from "./MoviesTable";
import _ from "lodash";
import { getMovies, removeMovie } from "../services/moviesServices";
import { toast } from "react-toastify";

const Movie = () => {
  const [allMovies, setAllMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const { movies } = await getMovies();

      setAllMovies(movies);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const deleteMovie = async (id) => {
    const oldMovies = allMovies;

    setAllMovies((prevMovies) => {
      return prevMovies.filter((m) => m._id !== id);
    });

    try {
      await removeMovie(id);
    } catch (err) {
      setAllMovies(oldMovies);
      toast.error(err.response.data.message);
    }
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

  if (isLoading) return <h2>Loading...</h2>;

  return (
    <div className="row ">
      <div className="col-2">
        <ListGroup
          selectedGenre={selectedGenre}
          onSelectGenre={onSelectGenre}
        />
      </div>
      <div className="col">
        <MoviesTable
          paginatedMovies={paginatedMovies}
          deleteMovie={deleteMovie}
          filtered={filtered}
          onSort={onSort}
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
        />
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
