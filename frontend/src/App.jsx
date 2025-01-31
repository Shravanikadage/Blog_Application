// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import AddPost from "./AddBlog";
import PostList from "./PostList";
import Home from "./Home"; 

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/post-list" element={<PostList />} />
        <Route path="/add-post" element={<AddPost />} />
      </Routes>
    </Router>
  );
};

export default App;
