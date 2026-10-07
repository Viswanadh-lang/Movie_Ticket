import React, { useEffect, useState } from "react";
import Display from "./Component/Display";
import Search from "./Component/Search";
import Footer from "./Component/Footer";
import { useNavigate } from "react-router-dom";

const API_KEY = "f45b0c8a";

const movieSearches = [
  "Avengers",
  "Batman",
  "Spider Man",
  "Harry Potter",
  "Jurassic Park",
  "Superman",
  "Mission Impossible",
  "Fast Furious",
];

export default function Home() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);

  const navigate = useNavigate();

  // Load movies when Home page opens
  useEffect(() => {
    const loadMovies = async () => {
      try {
        const responses = await Promise.all(
          movieSearches.map(async (search) => {
            const response = await fetch(
              `https://www.omdbapi.com/?s=${encodeURIComponent(
                search
              )}&type=movie&apikey=${API_KEY}`
            );

            return response.json();
          })
        );

        let allMovies = [];

        responses.forEach((result) => {
          if (result.Response === "True" && result.Search) {
            allMovies = [...allMovies, ...result.Search];
          }
        });

        // Remove duplicate movies
        const uniqueMovies = Array.from(
          new Map(
            allMovies.map((movie) => [movie.imdbID, movie])
          ).values()
        );

        // Convert OMDb format into the format used by our project
        const formattedMovies = uniqueMovies.map((movie, index) => ({
          id: movie.imdbID,
          title: movie.Title,
          poster_path:
            movie.Poster && movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/300x450?text=No+Poster",
          release_date: movie.Year,
          vote_average: "OMDb",
          vote_count: 150 + (index % 4) * 50,
        }));

        setData(formattedMovies);
      } catch (error) {
        console.error("Error loading movies:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  // Search movies using OMDb
  const handleSearch = async (e) => {
    e.preventDefault();

    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setSearching(true);

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${encodeURIComponent(
          query
        )}&type=movie&apikey=${API_KEY}`
      );

      const result = await response.json();

      if (result.Response === "True" && result.Search) {
        const formattedResults = result.Search.map((movie, index) => ({
          id: movie.imdbID,
          title: movie.Title,
          poster_path:
            movie.Poster && movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/300x450?text=No+Poster",
          release_date: movie.Year,
          vote_average: "OMDb",
          vote_count: 150 + (index % 4) * 50,
        }));

        setSearchResults(formattedResults);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">

      {/* Header */}
      <header className="flex justify-between items-center w-full px-8 py-5 bg-gradient-to-r from-blue-700 to-indigo-700 text-white shadow-md">
        <h1 className="text-3xl font-extrabold tracking-wide">
          New Movies
        </h1>

        <button
          onClick={() => navigate("/login")}
          className="bg-white text-blue-700 font-semibold px-5 py-2 rounded-full hover:bg-blue-50 transition shadow-sm"
        >
          Back to Login
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center mt-8">

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="flex items-center border border-gray-300 rounded-full px-5 py-2 w-96 shadow-md focus-within:ring-2 focus-within:ring-blue-500 mb-8 bg-white"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="🔍 Search movies..."
            className="w-full outline-none text-gray-700 placeholder-gray-400"
          />

          <button type="submit" className="hidden">
            Search
          </button>
        </form>

        {/* Loading */}
        {loading && (
          <div className="text-center">
            <h2 className="text-lg font-semibold text-blue-600">
              Loading movies...
            </h2>
          </div>
        )}

        {/* Search Results */}
        {!loading && query && (
          <>
            {searching ? (
              <h2 className="text-lg font-semibold text-blue-600">
                Searching...
              </h2>
            ) : searchResults.length === 0 ? (
              <h2 className="text-lg font-semibold text-red-500">
                No Movies Found
              </h2>
            ) : (
              <Search data={searchResults} />
            )}
          </>
        )}

        {/* Default Movies */}
        {!loading && !query && data.length > 0 && (
          <Display data={data} />
        )}

        {/* API/Loading Problem */}
        {!loading && !query && data.length === 0 && (
          <div className="text-center">
            <h2 className="text-lg font-semibold text-red-500">
              Movies could not be loaded
            </h2>
            <p className="text-gray-500 mt-2">
              Please check your OMDb API key or internet connection.
            </p>
          </div>
        )}

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}