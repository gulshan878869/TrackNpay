import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from "./components/Dashboard";
import About from "./components/About";
import Contact from "./components/Contact";
import AddEmployee from "./components/AddEmployee";
import EmployeeList from "./components/EmployeeList";
import Attendence from "./components/Attendence";
import Payroll from "./components/Payroll";
import Register from './components/Register';
import Login from './components/Login';
import PrivateRoutes from './utils/privateRoutes';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        
        <Routes>
          
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
           <Route element={<PrivateRoutes />}>
           <Route path="/home" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/Add" element={<AddEmployee />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/attendance" element={<Attendence />} />
          <Route path="/payroll" element={<Payroll />} />
           </Route>

        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;

