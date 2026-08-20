import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import SearchBar from "../components/SearchBar.jsx";
import MovieList from "../components/MovieList.jsx";
import Loading from "../components/Loading.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import { requestOmdb } from "../api/omdb.js";

function Movies() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const searchQuery = searchParams.get("search") || "";
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    function handleSearch(movieName) {
        const encodedMovieName = encodeURIComponent(movieName);
        navigate(`/movies?search=${encodedMovieName}`);
    }

    useEffect(() => {
        const controller = new AbortController();

        async function fetchMovies() {
            if (searchQuery === "") {
                setMovies([]);
                setError("");
                return;
            }

            try {
                setLoading(true);
                setError("");
                const data = await requestOmdb({ s: searchQuery }, controller.signal);
                setMovies(data.Search || []);
            } catch (requestError) {
                if (requestError.name === "AbortError") return;
                setMovies([]);
                setError(requestError.message || "Something went wrong while fetching movies.");
            } finally {
                setLoading(false);
            }
        }

        fetchMovies();
        return () => controller.abort();
    }, [searchQuery]);

    return (
        <main className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8">
            <section className="border-b border-slate-700 pb-8">
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-amber-400">Movie library</p>
                <h1 className="text-3xl font-bold text-white sm:text-4xl">Find your next watch</h1>

                <SearchBar onSearch={handleSearch} />

                {searchQuery && <p className="mt-5 text-sm text-slate-400">Results for <span className="font-semibold text-slate-200">{searchQuery}</span></p>}

                {loading && <Loading message="Loading movies..." />}

                {error && <ErrorMessage message={error} />}

                {!loading && !error && movies.length > 0 && (
                    <MovieList movies={movies} />
                )}

                <Link to="/" className="mt-10 inline-block text-sm font-semibold text-amber-400 transition hover:text-amber-300">Back to home</Link>
            </section>
        </main>
    );
}

export default Movies;
