import { useState, useEffect } from "react";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `https://post-management-backend-zyz8.onrender.com/api/posts/single-post/${id}`
        );
        setTitle(response.data.title);
        setDescription(response.data.description);
        setExistingImage(response.data.imageUrl);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image) formData.append("image", image);

    try {
      await axios.put(
        `https://post-management-backend-zyz8.onrender.com/api/posts/update-post/${id}`,
        formData
      );
  
      navigate("/");
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleUpdate} className="max-w-lg mx-auto space-y-4">
        {/* Title Input */}
        <div>
          <label htmlFor="title" className="block text-gray-700 font-semibold">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter title"
          />
        </div>

        {/* Description Input */}
        <div>
          <label
            htmlFor="description"
            className="block text-gray-700 font-semibold"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter description"
          />
        </div>

        {/* Existing Image */}
        {existingImage && (
          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-gray-700 font-semibold"
            >
              Current Image
            </label>
            <img
              src={`https://post-management-backend-zyz8.onrender.com${existingImage}`}
              alt="Current Post Image"
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        )}

        {/* New Image */}
        <div>
          <label htmlFor="image" className="block text-gray-700 font-semibold">
            Upload New Image (Optional)
          </label>
          <input
            type="file"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Update Post
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditPost;
