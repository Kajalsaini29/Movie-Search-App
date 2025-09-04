
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
}

interface FetchMoviesResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
  Error?: string;
}

export function useMovies(query: string) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = useCallback(async (pageNumber: number) => {
    setLoading(true);
    try {
      const response = await axios.get<FetchMoviesResponse>("/api/movie", {
        params: { s: query, page: pageNumber },
      });

      if (response.data.Response === "True") {
        setMovies(prev => {
          const combined = [...prev, ...(response.data.Search || [])];

          const unique = combined.filter(
            (movie, index, self) =>
              index === self.findIndex(m => m.imdbID === movie.imdbID)
          );

          return unique;
        });

        const totalResults = parseInt(response.data.totalResults, 10) || 0;
        setTotalPages(Math.ceil(totalResults / 10));
        setError(null);
      } else {
        setError(response.data.Error || "No movies found");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch movies");
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    setMovies([]);
    setPage(1);
    if (query) fetchMovies(1);
  }, [query, fetchMovies]);


  const loadMore = () => {
    if (page < totalPages) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchMovies(nextPage);
    }
  };

  return { movies, loading, error, loadMore, page, totalPages };
}
