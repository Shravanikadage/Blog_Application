
// src/components/AddPost.jsx
import { useState } from "react";
import axios from "axios";
import "./AddBlog.css";

const AddBlog = () => {
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [image, setImage] = useState(null);

const handleSubmit = async (e) => {
e.preventDefault();
const formData = new FormData();
formData.append("title", title);
formData.append("description", description);
formData.append("image", image);

try {
  await axios.post("http://localhost:5000/api/posts", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  alert("Post added successfully!");
  setTitle("");
  setDescription("");
  setImage(null);
} catch (error) {
  console.error("Error adding post:", error);
  alert("Failed to add post");
}

};

return (
<div className="add-post-container">
<div className="add-post-form-container">
<h2>Create a New Blog Post</h2>
<form className="add-post-form" onSubmit={handleSubmit}>
<input
type="text"
placeholder="Title"
value={title}
onChange={(e) => setTitle(e.target.value)}
required
/>
<textarea
placeholder="Description"
value={description}
onChange={(e) => setDescription(e.target.value)}
required
/>
<input
type="file"
accept="image/*"
onChange={(e) => setImage(e.target.files[0])}
required
/>
<button type="submit" className="submit-btn">
Add Post
</button>
</form>
</div>
</div>
);
};

export default AddBlog;
