import { useEffect, useState } from "react";
import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null); // Start with null to handle loading state

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`https://post-management-backend-zyz8.onrender.com/api/posts/single-post/${id}`);
        setPost(response.data.post); 
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`https://post-management-backend-zyz8.onrender.com/api/posts/delete-post/${id}`);
      navigate("/");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  if (!post) return <p className="text-center mt-10">Loading...</p>;

  const imageUrl = `https://post-management-backend-zyz8.onrender.com${post.imageUrl}`;

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-3xl mx-auto border shadow-xl p-6 rounded-lg bg-white hover:shadow-2xl transition duration-300">
        {/* Image Section */}
        <div className="w-full h-96 relative rounded-lg overflow-hidden">
          <img
            src={imageUrl}
            alt={post.title}
            className="w-full h-full object-fill rounded-lg transition-transform transform hover:scale-105"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-25 rounded-lg"></div> {/* Overlay */}
        </div>

        {/* Title Section */}
        <h1 className="text-3xl font-semibold text-gray-900 mt-6 leading-snug">{post.title}</h1>

        {/* Description Section */}
        <p className="mt-4 text-lg text-gray-700 leading-relaxed">{post.description}</p>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <Link to={`/edit/${id}`} className="bg-green-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-700 transition duration-200">
            Edit
          </Link>
          <button onClick={handleDelete} className="bg-red-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-red-700 transition duration-200">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
