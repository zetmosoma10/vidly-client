import { createContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { Outlet } from "react-router-dom";
import { getGenres } from "../services/genresServices";
import NavBar from "../components/NavBar";
import "react-toastify/dist/ReactToastify.css";

export const UserContext = createContext();

const HomeLayout = () => {
  const [genres, setGenres] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { genres } = await getGenres();
      setGenres(genres);
    };

    try {
      const token = localStorage.getItem("token");
      const user = jwtDecode(token);
      setCurrentUser(user.name);
    } catch (error) {}

    fetchData();
  }, []);

  return (
    <div>
      <NavBar currentUser={currentUser} />
      <ToastContainer />
      <main className="container mt-5">
        <UserContext.Provider value={{ genres, currentUser }}>
          <Outlet context={genres} />
        </UserContext.Provider>
      </main>
    </div>
  );
};

export default HomeLayout;
