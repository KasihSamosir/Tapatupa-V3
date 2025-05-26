import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header'; 
import '../CSS/Layout.css'; 

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <Sidebar />
      <div className="main-content">
        <div className="content-wrapper">
          {children} 
        </div>
      </div>
    </div>
  );
};

export default Layout;