import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./Pages/Home";
import AdminLogin from "./Pages/AdminLogin";
import CreateEmployee from "./components/CreateEmployee";
import EmployeeList from "./components/ListEmployee";
import LogActivity from "./components/LogActivity";
import Screenshots from "./components/Screenshot";
import Signup from "./Pages/Signup";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("adminToken"));

  const handleLogin = (newToken) => {
    localStorage.setItem("adminToken", newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setToken(null);
  };

  const isAuthenticated = !!token;

  return (
    <Router>
      <Navbar onLogout={handleLogout} isAuthenticated={isAuthenticated} />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-4">
          <Routes>
            <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/admin-login" />} />
            <Route path="/admin-login" element={<AdminLogin onLogin={handleLogin} />} />
            <Route path="/create_employee" element={isAuthenticated ? <CreateEmployee /> : <Navigate to="/admin-login" />} />
            <Route path="/list-employee" element={isAuthenticated ? <EmployeeList /> : <Navigate to="/admin-login" />} />
            <Route path="/log-activity" element={isAuthenticated ? <LogActivity /> : <Navigate to="/admin-login" />} />
            <Route path="/screenshot" element={isAuthenticated ? <Screenshots /> : <Navigate to="/admin-login" />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
