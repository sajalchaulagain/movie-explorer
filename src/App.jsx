import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Movies from "./pages/Movies.jsx";
import MovieDetails from "./pages/MovieDetails.jsx";

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-50">
      <nav className="border-b border-slate-800 bg-slate-950 px-5 py-5">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link to="/" className="text-lg font-bold tracking-tight text-white">
            Movie Explorer
          </Link>

          <div className="flex items-center gap-5">
            <Link
              to="/"
              className="text-sm text-slate-400 transition hover:text-white"
            >
              Home
            </Link>

            <Link
              to="/movies"
              className="text-sm text-slate-400 transition hover:text-white"
            >
              Movies
            </Link>
          </div>
        </div>
      </nav>

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </div>

      <footer className="border-t border-slate-800 bg-slate-950 px-5 py-5 text-center text-xs text-slate-600">
        <p>Developed by Sajal Chaulagain aka Mr. Chaule</p>
      </footer>
    </div>
  );
}

export default App;
