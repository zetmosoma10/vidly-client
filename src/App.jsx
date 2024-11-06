import Movie from "./components/Movie";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div>
      <NavBar />
      <main className="container mt-5">
        <Movie />
      </main>
    </div>
  );
}

export default App;
