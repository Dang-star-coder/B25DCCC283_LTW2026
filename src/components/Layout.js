import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = () => {
  return (
    <div className="app-layout">
      <NavBar />
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout; 