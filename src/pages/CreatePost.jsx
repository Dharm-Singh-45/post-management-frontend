import { useState } from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    await axios.post("https://post-management-backend-zyz8.onrender.com/api/posts/create-post", formData);
    navigate("/");
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
        <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border"/>
        <textarea placeholder="Description" onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border"></textarea>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} className="w-full"/>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Create</button>
      </form>
    </div>
  );
}

export default CreatePost;
