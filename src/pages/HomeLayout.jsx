import { ToastContainer } from "react-toastify";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import { getGenres } from "../services/genresServices";
import { createContext, useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";

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
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <NavBar />
      <ToastContainer />
      <main className="container mt-5">
        <Outlet context={genres} />
      </main>
    </UserContext.Provider>
  );
};

export default HomeLayout;
