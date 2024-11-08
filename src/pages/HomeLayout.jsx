import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getGenres } from "../services/genresServices";
import { useEffect, useState } from "react";

const HomeLayout = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { genres } = await getGenres();
      setGenres(genres);
    };

    fetchData();
  }, []);

  return (
    <div>
      <NavBar />
      <ToastContainer />
      <main className="container mt-5">
        <Outlet context={genres} />
      </main>
    </div>
  );
};

export default HomeLayout;
