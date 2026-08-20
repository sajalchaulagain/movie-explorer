import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar.jsx";

function Home() {
    const navigate = useNavigate();

    function handleSearch(movieName) {
        const encodedMovieName = encodeURIComponent(movieName);
        navigate(`/movies?search=${encodedMovieName}`);
    }

    return (
        <>
            <header className="border-b border-slate-800 bg-slate-900 px-5 py-16 sm:py-24">
                <div className="mx-auto max-w-3xl">
                    <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">Movie search</p>

                    <h1 className="mb-4 max-w-2xl text-4xl font-bold tracking-tight text-white sm:text-5xl">Find something worth watching.</h1>

                    <p className="max-w-xl text-base leading-7 text-slate-400">Search films by title and open the ones that catch your eye.</p>

                    <SearchBar onSearch={handleSearch} />

                </div>
            </header>

            <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
                <p className="text-sm text-slate-500">A small, focused catalogue powered by OMDb.</p>
            </main>
        </>
    );
}

export default Home;
