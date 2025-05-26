import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const Login = ({ onLoginSuccess }) => { 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email: email,
        password: password,
      });

      console.log('Login Berhasil:', response.data);
      localStorage.setItem('authToken', response.data.token);
      onLoginSuccess(); // Panggil fungsi login sukses di App.js
      navigate('/'); // Redirect ke halaman utama setelah login berhasil
    } catch (err) {
      console.error('Login Gagal:', err.response?.data?.message || err.message);
      setError(err.response?.data?.message || 'Login gagal. Periksa email dan password Anda.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default Login;