import { useEffect, useState } from "react";
import axios from "axios";
import "./PostList.css";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedPost, setUpdatedPost] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8; // Number of posts per page

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get("http://localhost:5000/api/posts");
      setPosts(response.data);
    };
    fetchPosts();
  }, []);

  const handleReadMore = (post) => {
    setSelectedPost(post);
    document.body.style.overflow = "hidden";
  };

  const handleShowLess = () => {
    setSelectedPost(null);
    document.body.style.overflow = "auto";
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`);
      setPosts(posts.filter((post) => post._id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleUpdate = (post) => {
    setIsEditing(true);
    setUpdatedPost(post);
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setUpdatedPost((prevPost) => ({ ...prevPost, [name]: value }));
  };

  const handleSaveEdit = async () => {
    try {
      console.log("Updated post ID:", updatedPost._id);
      const response = await axios.put(
        `http://localhost:5000/api/posts/${updatedPost._id}`,
        {
          title: updatedPost.title,
          description: updatedPost.description,
          image: updatedPost.image,
        }
      );
      console.log("Response:", response);
      setPosts(
        posts.map((post) =>
          post._id === updatedPost._id ? response.data : post
        )
      );
      setIsEditing(false);
    } catch (error) {
      console.error("Error editing post:", error);
    }
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filteredPosts = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm) ||
        post.description.toLowerCase().includes(searchTerm)
    );
    setFilteredPosts(filteredPosts);
  };

  // Get current posts for the page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = searchTerm === "" ? posts.slice(indexOfFirstPost, indexOfLastPost) : filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil((searchTerm === "" ? posts.length : filteredPosts.length) / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      {/* Post List Section */}
      <div className="post-list-container">
        {/* Search Bar */}
        <div className="search-bar-container">
          <input
            type="search"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search posts..."
            className="search-bar"
          />
        </div>

        <div className="post-list">
          {currentPosts.length === 0 ? (
            <p>No posts available.</p>
          ) : (
            currentPosts.map((post) => (
              <div key={post._id} className="post-card">
                {post.image && (
                  <img
                    src={`http://localhost:5000${post.image}`}
                    alt={post.title}
                    className="post-image"
                  />
                )}
                <h3>{post.title}</h3>
                <div className="post-description">
                  {post.description.slice(0, 100)}...{" "}
                </div>
                <a
                  href="#"
                  className="read-more-link"
                  onClick={(e) => {
                    e.preventDefault();
                    handleReadMore(post);
                  }}
                >
                  Read More
                </a>
                <div className="post-actions">
                  <button
                    className="update-btn"
                    onClick={() => handleUpdate(post)}
                  >
                    Update
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(post._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        <div className="pagination">
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`page-btn ${currentPage === number ? "active" : ""}`}
            >
              {number}
            </button>
          ))}
        </div>
      </div>

      {/* Read More Modal */}
      {selectedPost && (
        <div className="modal-overlay" onClick={handleShowLess}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {selectedPost.image && (
              <img
                src={`http://localhost:5000${selectedPost.image}`}
                alt={selectedPost.title}
                className="modal-image"
              />
            )}
            <h3>{selectedPost.title}</h3>
            <p>{selectedPost.description}</p>
            <a
              href="#"
              className="show-less-link"
              onClick={(e) => {
                e.preventDefault();
                handleShowLess();
              }}
            >
              Show Less
            </a>
          </div>
        </div>
      )}

      {/* Edit Post Modal */}
      {isEditing && (
        <div className="modal-overlay" onClick={() => setIsEditing(false)}>
          <div className="modal-content-2" onClick={(e) => e.stopPropagation()}>
            <h2>Edit Post</h2>
            <form>
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={updatedPost.title}
                onChange={handleEditChange}
              />
              <br />
              <label>Description:</label>
              <textarea
                name="description"
                value={updatedPost.description}
                onChange={handleEditChange}
              />
              <br />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleSaveEdit();
                }}
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default PostList;
