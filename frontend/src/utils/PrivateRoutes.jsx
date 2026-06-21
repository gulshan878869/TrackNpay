import React from 'react'
import {Outlet,Navigate } from 'react-router-dom';

const privateRoutes = () => {
     const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/login" />;
    <div>
      
    </div>
  
}

export default privateRoutes

