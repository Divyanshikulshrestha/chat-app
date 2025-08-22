import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import bgImage from "./assets/bgImage.svg";
import { Toaster } from "react-hot-toast";
import { AuthContext } from "../context/AuthContext.jsx";

const App = () => {
  const { authUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => (authUser ? children : <Navigate to="/login" />);
  const GuestRoute = ({ children }) => (!authUser ? children : <Navigate to="/" />);

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/login" element={<GuestRoute><LoginPage /></GuestRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      </Routes>
    </div>
  );
};

export default App;
