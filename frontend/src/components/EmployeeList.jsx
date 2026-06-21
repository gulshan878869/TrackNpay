import React, { useEffect, useState } from "react";
import axios from "axios";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [editEmployee, setEditEmployee] = useState({
    _id: "",
    employeeId: "",
    name: "",
    email: "",
    department: "",
    salary: "",
  });

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/employee/view"
      );

      setEmployees(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // DELETE EMPLOYEE
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:3000/api/employee/delete/${id}`
      );

      alert("Employee Deleted Successfully");
      fetchEmployees();
    } catch (error) {
      console.log(error);
    }
  };

  // OPEN EDIT FORM
  const handleEditClick = (emp) => {
    setEditEmployee(emp);
    setIsEditing(true);
  };

  // EDIT INPUT CHANGE
  const handleEditChange = (e) => {
    setEditEmployee({
      ...editEmployee,
      [e.target.name]: e.target.value,
    });
  };

  // UPDATE EMPLOYEE
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:3000/api/employee/update/${editEmployee._id}`,
        editEmployee
      );

      alert("Employee Updated Successfully");

      setIsEditing(false);
      fetchEmployees();
    } catch (error) {
      console.log(error);
      alert("Update Failed");
    }
  };

  // SEARCH
  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      emp.employeeId
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      emp.department
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen p-8 bg-gray-100">

      <h1 className="text-4xl font-bold text-blue-700 mb-6">
        Employee List
      </h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by Name, ID or Department..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border rounded-lg p-3 mb-6"
      />

      {/* Edit Form */}
      {isEditing && (
        <div className="bg-white p-5 rounded-lg shadow mb-6">
          <h2 className="text-2xl font-bold mb-4">
            Edit Employee
          </h2>

          <form
            onSubmit={handleUpdate}
            className="space-y-3"
          >
            <input
              type="text"
              name="name"
              value={editEmployee.name}
              onChange={handleEditChange}
              placeholder="Name"
              className="w-full border rounded p-3"
              required
            />

            <input
              type="email"
              name="email"
              value={editEmployee.email}
              onChange={handleEditChange}
              placeholder="Email"
              className="w-full border rounded p-3"
              required
            />

            <input
              type="text"
              name="department"
              value={editEmployee.department}
              onChange={handleEditChange}
              placeholder="Department"
              className="w-full border rounded p-3"
              required
            />

            <input
              type="number"
              name="salary"
              value={editEmployee.salary}
              onChange={handleEditChange}
              placeholder="Salary"
              className="w-full border rounded p-3"
              required
            />

            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-green-600 text-white px-5 py-2 rounded"
              >
                Update
              </button>

              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 text-white px-5 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Employee Cards */}
      <div className="grid gap-4">
        {filteredEmployees.length > 0 ? (
          filteredEmployees.map((emp) => (
            <div
              key={emp._id}
              className="bg-white p-5 rounded-lg shadow"
            >
              <h2 className="text-xl font-bold mb-2">
                {emp.name}
              </h2>

              <p>
                <strong>Employee ID:</strong>{" "}
                {emp.employeeId || "Not Assigned"}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {emp.email || "Not Available"}
              </p>

              <p>
                <strong>Department:</strong>{" "}
                {emp.department}
              </p>

              <p>
                <strong>Salary:</strong> ₹{emp.salary}
              </p>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => handleEditClick(emp)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(emp._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white p-5 rounded-lg shadow text-center">
            No Employees Found
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeList;