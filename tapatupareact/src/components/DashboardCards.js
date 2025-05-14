import React from 'react';
import { FaListUl, FaCheckSquare, FaPlusSquare } from 'react-icons/fa';
import '../CSS/DashboardCards.css';

const DashboardCards = () => {
  return (
    <div className="card-container">
      <div className="card">
        <FaListUl size={30} color="#0C756F" />
        <h3>Jumlah pemohon sewa</h3>
        <button>View All</button>
      </div>
      <div className="card">
        <FaPlusSquare size={30} color="#0C756F" />
        <h3>Permohonan terbaru</h3>
        <button>View All</button>
      </div>
      <div className="card">
        <FaCheckSquare size={30} color="#0C756F" />
        <h3>Jumlah pemohon aktif</h3>
        <button>View All</button>
      </div>
    </div>
  );
};

export default DashboardCards;
