import React from 'react';
import { FaThLarge, FaFileAlt, FaUser, FaMapMarkedAlt } from 'react-icons/fa';
import '../CSS/Sidebar.css';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom'; // Pastikan ini ada!

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <div className="sidebar-content">
        <div className="logo-container">
          <img src={logo} alt="TAPATUPA Logo" className="sidebar-logo" />
        </div>

        {/* Daftar menu */}
        <ul className="nav-links">
          <li className="nav-item active">
            <Link to="/"> {/* Link ke Dashboard */}
              <FaThLarge /> Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/Jenis-permohonan">
              <FaFileAlt /> Jenis permohonan
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/permohonan-sewa"> {/* Contoh link lain */}
              <FaFileAlt /> Permohonan sewa
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/wajib-retribusi">
              <FaUser /> Wajib Retribusi
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/objek-retribusi">
              <FaMapMarkedAlt /> Objek Retribusi
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/lokasi-objek-retribusi">
              <FaFileAlt /> Lokasi objek retribusi
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/jenis-objek-retribusi">
              <FaFileAlt /> Jenis objek retribusi
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/tarif-objek-retribusi">
              <FaFileAlt /> Tarif objek retribusi
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/jenis-jangka-waktu">
              <FaFileAlt /> Jenis jangka waktu
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/jangka-waktu-sewa">
              <FaFileAlt /> Jangka waktu sewa
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/peruntukan-sewa">
              <FaFileAlt /> Peruntukan sewa
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/jenis-status">
              <FaFileAlt /> Jenis Status
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/status-permohonan">
              <FaFileAlt /> Status Permohonan
            </Link>
          </li>
        </ul>
      </div>

      {/* Kotak info Admin */}
      <div className="admin-box">
        <div className="admin-info">
          <FaUser className="admin-icon" />
          <span>Admin</span>
        </div>
        <span className="dropdown-arrow">▾</span>
      </div>
    </div>
  );
};

export default Sidebar;