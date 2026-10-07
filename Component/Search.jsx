import React from "react";
import { useNavigate } from "react-router-dom";

export default function Search({ data }) {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-8 w-full">

      {data.map((movie) => (
        <div
          key={movie.id}
          className="bg-white border border-gray-200 shadow-md hover:shadow-xl transition-transform hover:-translate-y-1 p-4 flex flex-col justify-between"
        >

          {/* Poster */}
          <div className="relative overflow-hidden">

            <img
              src={movie.poster_path}
              alt={movie.title}
              className="w-full h-72 object-contain hover:scale-105 transition-transform duration-300"
            />

            {/* Rating/Source */}
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 flex items-center justify-center text-white font-semibold transition">
              {movie.vote_average}
            </div>

          </div>

          {/* Movie Info */}
          <div className="mt-3 text-center">

            <h2 className="text-lg font-bold text-gray-800 break-words line-clamp-2">
              {movie.title}
            </h2>

            <p className="text-sm text-gray-600 mt-1">
              Release:{" "}
              <span className="font-semibold">
                {movie.release_date}
              </span>
              <br />

              Price:{" "}
              <span className="font-semibold text-green-600">
                ₹{movie.vote_count}
              </span>
            </p>

          </div>

          {/* Book Button */}
          <button
            onClick={() =>
              navigate("/ticket", {
                state: { movie },
              })
            }
            className="mt-4 w-full px-4 py-2 bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
          >
            Book Ticket
          </button>

        </div>
      ))}

    </div>
  );
}