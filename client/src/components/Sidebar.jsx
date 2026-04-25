import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, Package, LogOut } from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Productr.</h2>
      </div>
      <div className="nav-menu">
        <NavLink to="/" className={({isActive}) => isActive && window.location.pathname === '/' ? "nav-item active" : "nav-item"} end>
          <Home className="icon" size={20} />
          <span>Home</span>
        </NavLink>
        <NavLink to="/products" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <Package className="icon" size={20} />
          <span>Products</span>
        </NavLink>
      </div>
      <div className="sidebar-footer" onClick={handleLogout}>
        <div className="nav-item logout">
          <LogOut className="icon" size={20} />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
