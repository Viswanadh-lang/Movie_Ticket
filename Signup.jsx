import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    mobile: "",
    dob: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user.name || !user.mobile || !user.dob || !user.email || !user.password) {
      alert("Please fill all fields");
      return;
    }
    navigate("/login", { state: { user } });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">
          Create New Account
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" value={user.name} onChange={handleChange} placeholder="Full Name" className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500" />
          <input type="text" name="mobile" value={user.mobile} onChange={handleChange} placeholder="Mobile Number" className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500" />
          <input type="date" name="dob" value={user.dob} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500" />
          <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email Address" className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500" />
          <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Password" className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500" />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">Submit</button>
        </form>
      </div>
    </div>
  );
}
