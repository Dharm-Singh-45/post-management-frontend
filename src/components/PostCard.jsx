import React from 'react'
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg p-6 bg-white transition-transform transform hover:scale-105 hover:shadow-xl">
      {/* Image Section */}
      <div className="w-full h-48 relative">
        <img 
          src={`https://post-management-backend-zyz8.onrender.com${post.imageUrl}`} 
          alt={post.title} 
          className="w-full h-full object-cover rounded-lg transition-all transform hover:scale-110" 
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30 rounded-lg"></div> {/* Overlay */}
      </div>
      
      {/* Content Section */}
      <div className="mt-4">
        {/* Title with Label */}
        <div className="bg-blue-100 p-2 rounded-lg">
          <label className="text-lg font-semibold text-gray-700">Title</label>
          <h2 className="text-xl font-semibold text-gray-800">{post.title}</h2>
        </div>
        
        {/* Description with Label */}
        <div className="mt-4 bg-blue-100 p-2 rounded-lg">
          <label className="text-lg font-semibold text-gray-700">Description</label>
          <p className="mt-2 text-gray-600">{post.description.substring(0, 100)}...</p>
        </div>

        <div className="mt-4">
          <Link 
            to={`/post/${post._id}`} 
            className="text-blue-600 font-semibold hover:text-blue-800 transition duration-300"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
