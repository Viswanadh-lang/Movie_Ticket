import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const userData = location.state?.user || {}; // data from signup

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {

    if (userData.email) {
      setEmail(userData.email);
      setPassword(userData.password || "");
    }
  }, [userData]);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter your credentials");
      return;
    }


    if (email === userData.email && password === userData.password) {
      navigate("/home"); // only go to Home if match
    } else {
      alert("Invalid credentials. Please sign up first.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 to-blue-500">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">Log In</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition"
          >
            Log in
          </button>
        </form>

        <button
          onClick={() => navigate("/signup")}
          className="w-full border border-blue-600 text-blue-600 py-2 rounded-full mt-4 hover:bg-blue-50 transition"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
