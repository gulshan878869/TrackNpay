import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddEmployee = () => {
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    department: "",
    salary: "",
  });

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token");
    console.log("TOKEN =", token);
    await axios.post(
      "http://localhost:3000/api/employee/add",
      employee,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Employee added successfully!");

    setEmployee({
      name: "",
      email: "",
      department: "",
      salary: "",
    });

    navigate("/employees");

  } catch (error) {
    console.log(error.response?.data);

    alert(
      error.response?.data?.message ||
      "Failed to add employee"
    );
  }
};

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-slate-100 to-blue-100">

      <h1 className="text-4xl font-bold text-blue-800 mb-6">
        Add Employee
      </h1>

      <div className="max-w-2xl bg-white shadow-lg rounded-xl p-6">

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="name"
            value={employee.name}
            onChange={handleChange}
            placeholder="Employee Name"
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="email"
            name="email"
            value={employee.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="text"
            name="department"
            value={employee.department}
            onChange={handleChange}
            placeholder="Department"
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="number"
            name="salary"
            value={employee.salary}
            onChange={handleChange}
            placeholder="Salary"
            className="w-full border rounded-lg p-3"
            required
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Add Employee
          </button>

        </form>

      </div>

    </div>
  );
};

export default AddEmployee;