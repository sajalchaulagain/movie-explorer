import { useState } from "react";

function SearchBar({ onSearch }) {
    const [search, setSearch] = useState("");
    const [inputError, setInputError] = useState("");

    function handleSubmit(event) {
        event.preventDefault();

        const trimmedSearch = search.trim();

        if (trimmedSearch === "") {
            setInputError("Please enter a movie name.");
            return;
        }

        setInputError("");
        onSearch(trimmedSearch);
    }

    return (
        <form onSubmit={handleSubmit} className="mt-8 max-w-2xl">
            <label
                htmlFor="movie-search"
                className="sr-only"
            >
                Movie name
            </label>

            <div className="flex flex-col gap-3 sm:flex-row">
                <input
                    id="movie-search"
                    type="text"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search by movie title e.g. 365 Days"
                    className="w-full rounded-md border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                />

                <button
                    type="submit"
                    className="rounded-md bg-amber-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 focus:ring-offset-slate-900"
                >
                    Search
                </button>
            </div>

            {inputError && (
                <p className="mt-3 text-left text-sm text-red-400">{inputError}</p>
            )}
        </form>
    );
}

export default SearchBar;
