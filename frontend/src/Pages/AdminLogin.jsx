import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import the navigate hook

const AdminLogin = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Create navigate function for redirection

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/admin-login', {
        email,
        password,
      });

      const { token } = response.data;

      // Save token to localStorage
      localStorage.setItem('adminToken', token);

      // Notify parent component (if you have any logic in it)
      onLogin(token);

      // Redirect to the home/dashboard page
      navigate('/home'); // Replace '/home' with the actual route of your home or dashboard page

    } catch (error) {
      alert('Login failed: ' + (error.response?.data?.error || 'Unknown error'));
    }
  };

  const handleSignUpRedirect = () => {
    navigate('/signup'); // Navigate to the Sign Up page
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl mb-4 font-bold text-orange-600">Admin Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          className="w-full border p-2 mb-4"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          className="w-full border p-2 mb-4"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded w-full"
        >
          Login
        </button>

        {/* Sign Up Button */}
        <button
          type="button"
          onClick={handleSignUpRedirect}
          className="mt-4 text-blue-500 hover:underline w-full text-center"
        >
          Don't have an account? Sign up here
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
