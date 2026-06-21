import React, { useState } from "react";
import { Link , useNavigate } from "react-router-dom";

const Header = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const hl = () => {
    localStorage.removeItem("token");
    navigate("/login");
  }

  const menu = [
    { name: "Dashboard", path: "/home" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Add Employee", path: "/Add" },
    { name: "Employee List", path: "/employees" },
    { name: "Attendance", path: "/attendance" },
    { name: "Payroll", path: "/payroll" },
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-5 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link
  to="/"
  className="text-2xl font-bold tracking-wide hover:scale-105 transition duration-300"
>
  💼 TrackNPay
</Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 items-center">
          <div className="flex items-center gap-4">
  <Link
    to="/"
    className="px-5 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-blue-500 hover:-translate-y-1 transition-all duration-300 shadow-lg"
  >
    Register
  </Link>

  <Link
    to="/login"
    className="px-5 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-green-500 hover:-translate-y-1 transition-all duration-300 shadow-lg"
  >
    Login
  </Link>

  <button
    onClick={hl}
    className="px-5 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-red-500 hover:-translate-y-1 transition-all duration-300 shadow-lg"
  >
    Logout
  </button>
</div>
          {token && menu.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className="relative font-medium hover:text-yellow-300 transition duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-yellow-300 after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-3xl"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="bg-blue-900 px-6 py-4 space-y-3">
          {menu.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                onClick={() => setOpen(false)}
                className="block py-2 px-4 rounded-lg hover:bg-purple-600 transition duration-300"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Header;