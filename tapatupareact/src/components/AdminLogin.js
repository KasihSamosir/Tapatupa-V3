import React, { useState } from 'react';
import '../CSS/AdminLogin.css'; 
import logo from '../assets/logo.png';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email tidak boleh kosong');
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError('Format email tidak valid');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (password) => {
    if (!password) {
      setPasswordError('Password tidak boleh kosong');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setError('');
    setEmailError('');
    setPasswordError('');

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        setError('');
        // Replace alert with toast
        toast.success('Login berhasil! Mengalihkan...', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          onClose: () => window.location.href = '/'
        });
      } else {
        setError(data.message || 'Login gagal');
        toast.error('Login gagal! Periksa kembali email dan password Anda.', {
          position: "top-center",
          autoClose: 3000,
          theme: "colored"
        });
      }
    } catch (err) {
      setError('Terjadi kesalahan, coba lagi nanti');
      toast.error('Terjadi kesalahan pada server', {
        position: "top-center",
        theme: "colored"
      });
    }
  };

  return (
    <div className="admin-login-wrapper">
      <ToastContainer />
      <div className="admin-login-card">
        <div className="admin-login-left">
          <div className="admin-login-info">
            <img src={logo} alt="Logo Admin" className="admin-login-image" />
            <h1>Selamat Datang</h1>
            <p>Login sebagai admin untuk mengelola konten, produk, dan aktivitas pengguna pada platform Tapatupa.</p>
            </div>
        </div>

        <div className="admin-login-right">
          <form className="admin-login-form" onSubmit={handleSubmit}>
            <h2>Login Admin</h2>
            {error && <div className="admin-login-error">{error}</div>}

            <div className="admin-login-group">
      <label>Email:</label>
      <div className="admin-login-icon-group">
        <span className="admin-login-icon"><FaEnvelope /></span>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            validateEmail(e.target.value);
          }}
          className={emailError ? 'error' : ''}
          required
        />
      </div>
      {emailError && <span className="admin-login-error-text">{emailError}</span>}
    </div>


            <div className="admin-login-group">
      <label>Password:</label>
      <div className="admin-login-icon-group">
        <span className="admin-login-icon"><FaLock /></span>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            validatePassword(e.target.value);
          }}
          className={passwordError ? 'error' : ''}
          required
        />
      </div>
      {passwordError && <span className="admin-login-error-text">{passwordError}</span>}
    </div>

            <button type="submit" className="admin-login-button">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}