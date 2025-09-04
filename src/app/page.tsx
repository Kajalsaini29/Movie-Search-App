
"use client";

import { useState } from "react";
import { useMovies } from "../hooks/useMovie";
import MovieCard from "./component/MovieCard";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";


export default function HomePage() {
  const [search, setSearch] = useState("batman");
  const [query, setQuery] = useState("batman");
  const { movies, loading, error, loadMore } = useMovies(query);
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") setQuery(search);
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">

      {/* Search Box */}

      <div className="relative mb-6 flex gap-2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search movies..."
          className="w-full border p-3 pr-10 rounded-lg shadow-sm focus:ring-2 focus:ring-black outline-none"
        />

        {/* Search Icon */}

        <MagnifyingGlassIcon
          onClick={() => setQuery(search)}
          className="h-6 w-6 text-gray-600 absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer hover:text-black"
        />
      </div>


      {/* Error / Loading */}

      {error && <p className="text-red-500">{error}</p>}
      {loading && <p className="text-gray-500">Loading...</p>}

      {/* Movies Grid */}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map(movie => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            isFavorite={favorites.includes(movie.imdbID)}
            toggleFavorite={toggleFavorite}
          />
        ))}
      </div>

      {/* Load More Button */}

      {movies.length > 0 && (
        <div className="flex justify-center">
          <button
            onClick={loadMore}
            disabled={loading}
            className="mt-8 px-5 py-2 bg-black hover:bg-black disabled:bg-gray-400 text-white font-semibold rounded-lg shadow transition"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}
