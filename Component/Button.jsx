import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Button({ movie }) {
  let navigate = useNavigate();

  function HandleButton() {
    navigate("/ticket", { state: { movie } });
  }

  return (
    <button 
      onClick={HandleButton} 
      className="mt-3 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
    >
      Book Ticket
    </button>
  )
}
