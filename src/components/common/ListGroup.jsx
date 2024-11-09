import { useContext } from "react";
import { UserContext } from "../../pages/HomeLayout";

const ListGroup = ({ onSelectGenre, selectedGenre }) => {
  const { genres } = useContext(UserContext);
  return (
    <ul className="list-group">
      <li
        style={{ cursor: "pointer" }}
        className={`list-group-item ${!selectedGenre && "active"}`}
        onClick={() => onSelectGenre(null)}
      >
        All Genres
      </li>
      {genres.map((genre) => (
        <li
          key={genre._id}
          style={{ cursor: "pointer" }}
          className={`list-group-item ${
            selectedGenre === genre.genre && "active"
          }`}
          onClick={() => onSelectGenre(genre.genre)}
        >
          {genre.genre}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
