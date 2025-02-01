import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();  // Get the current location

  const handleBack = () => {
    // Check if the current location is not the homepage
    if (location.pathname !== "/") {
      navigate(-1); // Go one step back in the history
    }
  };

  return (
    <nav className="bg-blue-500 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-lg font-bold">
          PostApp
        </Link>

        {/* Button container */}
        <div className="flex space-x-4">
          {/* Back Button */}
          <button 
            onClick={handleBack} 
            className="bg-white text-blue-500 px-3 py-2 rounded hover:bg-gray-100"
          >
            Back
          </button>

          {/* Create Post Button */}
          <Link to="/create" className="bg-white text-blue-500 px-3 py-2 rounded hover:bg-gray-100">
            Create post
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
