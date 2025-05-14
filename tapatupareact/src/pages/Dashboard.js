import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import DashboardCards from '../components/DashboardCards';

const Dashboard = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1, backgroundColor: '#EFEADB' }}>
        <Header />
        <DashboardCards />
      </div>
    </div>
  );
};

export default Dashboard;