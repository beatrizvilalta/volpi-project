import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./modules/main/Main";
import Login from "./modules/login/Login";
import PostDetail from "./modules/postDetail/PostDetail";
import Register from "./modules/register/Register";
import AddPostForm from "./modules/addPostForm/AddPostForm";
import EditPostForm from "./modules/editPostForm/EditPostForm";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="root">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/postDetail/:id" element={<PostDetail />} />
          <Route path="/addPostForm" element={<AddPostForm />} />
          <Route path="/editPostForm/:id" element={<EditPostForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
