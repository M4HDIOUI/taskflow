import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import TestAPI from "./pages/TestAPI";
// import { GoogleLogin } from "@react-oauth/google";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/test" element={<TestAPI />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}