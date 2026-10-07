import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Ticket() {
  const location = useLocation();
  const navigate = useNavigate();

  const movie = location.state?.movie;

  const [time_S, setTime] = useState(null);
  const [category_S, setCategory] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const timings = ["10AM", "2PM", "6PM"];
  const categories = ["Premium", "Standard"];

  // Seat rows
  const premiumRows = ["A", "B", "C"];
  const standardRows = ["D", "E", "F"];

  // Movie price
  const basePrice = movie?.vote_count || 200;

  const premiumPrice = basePrice + 100;
  const standardPrice = basePrice;

  // If movie doesn't exist
  if (!movie) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">

        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Movie information not found
        </h1>

        <button
          onClick={() => navigate("/home")}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Back to Home
        </button>

      </div>
    );
  }

  // Select/deselect seat
  const toggleSeat = (seat) => {
    setSelectedSeats((prev) =>
      prev.includes(seat)
        ? prev.filter((s) => s !== seat)
        : [...prev, seat]
    );
  };

  // Render seats
  const renderRow = (row, color) => (
    <div key={row} className="flex items-center gap-4">

      <span className="font-bold text-gray-800 w-6">
        {row}
      </span>

      <div className="flex gap-3">

        {[...Array(5)].map((_, i) => {
          const seatId = `${row}${i + 1}`;
          const isSelected = selectedSeats.includes(seatId);

          return (
            <div
              key={seatId}
              onClick={() => toggleSeat(seatId)}
              className={`
                cursor-pointer
                w-12
                h-12
                flex
                items-center
                justify-center
                rounded-md
                border
                text-xs
                font-semibold
                transition-transform
                duration-200

                ${
                  isSelected
                    ? `${color} text-white border-none scale-105 shadow-md`
                    : "bg-gray-200 text-gray-700 border-gray-400 hover:bg-blue-100 hover:scale-105"
                }
              `}
            >
              {seatId}
            </div>
          );
        })}

      </div>
    </div>
  );

  // Calculate total
  const totalPrice =
    category_S === "Premium"
      ? selectedSeats.length * premiumPrice
      : category_S === "Standard"
      ? selectedSeats.length * standardPrice
      : 0;

  return (
    <div className="flex font-sans bg-gray-50 min-h-screen">

      {/* Movie Information */}
      <div className="p-6 w-64 bg-white shadow-md rounded-lg m-6 h-fit">

        <h1 className="text-xl font-bold text-gray-800">
          {movie.title}
        </h1>

        <img
          src={movie.poster_path}
          alt={movie.title}
          className="w-full rounded-lg mt-3"
        />

        <h3 className="text-sm text-gray-600 mt-3">
          Base Price: ₹{basePrice}
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          Release: {movie.release_date}
        </p>

      </div>

      {/* Booking Section */}
      <div className="flex-1 p-6">

        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Ticket Booking
        </h1>

        {/* Show Timings */}
        <div className="mb-4 text-center">

          <p className="font-semibold mb-2">
            Show Timings:
          </p>

          {timings.map((time) => (
            <button
              key={time}
              onClick={() => setTime(time)}
              className={`
                px-4
                py-2
                m-2
                rounded-md
                transition

                ${
                  time_S === time
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-blue-100"
                }
              `}
            >
              {time}
            </button>
          ))}

        </div>

        {/* Categories */}
        <div className="mb-4 text-center">

          <p className="font-semibold mb-2">
            Choose Category:
          </p>

          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setCategory(cat);
                setSelectedSeats([]);
              }}
              className={`
                px-4
                py-2
                m-2
                rounded-md
                transition

                ${
                  category_S === cat
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-blue-100"
                }
              `}
            >
              {cat}
            </button>
          ))}

        </div>

        {/* Seat Layout */}
        <div className="mt-6 flex flex-col items-center space-y-5">

          <h3 className="font-semibold mb-4 text-lg text-gray-700">
            Seat Layout
          </h3>

          {/* Category Price */}
          {category_S && (
            <h4
              className={`
                text-center
                font-bold
                mb-4

                ${
                  category_S === "Premium"
                    ? "text-yellow-600"
                    : "text-gray-700"
                }
              `}
            >
              {category_S} Price: ₹
              {category_S === "Premium"
                ? premiumPrice
                : standardPrice}
            </h4>
          )}

          {/* Premium Seats */}
          {category_S === "Premium" && (
            <div className="space-y-3">
              {premiumRows.map((row) =>
                renderRow(row, "bg-yellow-600")
              )}
            </div>
          )}

          {/* Standard Seats */}
          {category_S === "Standard" && (
            <div className="space-y-3">
              {standardRows.map((row) =>
                renderRow(row, "bg-gray-700")
              )}
            </div>
          )}

        </div>

        {/* Booking Summary */}
        {selectedSeats.length > 0 &&
          category_S &&
          time_S && (
            <div className="text-center mt-8 p-6 bg-white rounded-lg shadow-lg border border-blue-500">

              <div className="flex items-center justify-center gap-2 mb-3 text-green-600 font-bold text-lg">
                Ticket Purchase Successful
              </div>

              <p className="text-gray-700 leading-relaxed">

                You have booked{" "}
                <b>{selectedSeats.length}</b> seat(s):
                <br />

                <b>{selectedSeats.join(", ")}</b>

                <br />

                Category: <b>{category_S}</b>

                <br />

                Show Time: <b>{time_S}</b>

                <br />

                <b>Total Price: ₹{totalPrice}</b>

              </p>

            </div>
          )}

        {/* Back Button */}
        <div className="text-center mt-6">

          <button
            onClick={() => navigate("/home")}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Back to Home
          </button>

        </div>

      </div>
    </div>
  );
}