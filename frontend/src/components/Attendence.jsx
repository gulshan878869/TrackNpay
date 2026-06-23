import React, { useEffect, useState } from "react";
import axios from "axios";

const Attendence = () => {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState({});

  useEffect(() => {
    fetchEmployees();
  }, []);

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

  const handleAttendance = (id, status) => {
    setAttendance((prev) => ({
      ...prev,
      [id]: status,
    }));
  };

  const handleSubmit = async () => {
    try {
      const today = new Date()
        .toISOString()
        .split("T")[0];

      const promises = employees
        .filter((emp) => attendance[emp._id])
        .map((emp) =>
          axios.post(
            "http://localhost:3000/api/attendance/add",
            {
              employeeId: emp.employeeId, // 26/IT/0001
              name: emp.name,
              department: emp.department,
              date: today,
              status: attendance[emp._id],
            }
          )
        );

      await Promise.all(promises);

      alert("Attendance Saved Successfully");

      setAttendance({});
    } catch (error) {
      console.log(error);
      alert("Error Saving Attendance");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-blue-700 mb-4">
        Employee Attendance
      </h1>

      <p className="text-gray-700 mb-6">
        Mark Daily Attendance
      </p>

<p className="text-lg font-semibold text-blue-700 mb-4">
  Date : {new Date().toLocaleDateString()}
</p>
      <div className="bg-white shadow-lg rounded-lg p-6 overflow-x-auto">
        <table className="w-full border">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-3">Employee ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Department</th>
              <th className="p-3">Attendance</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp) => (
              <tr
                key={emp._id}
                className="text-center border-b"
              >
                <td className="p-3 font-semibold">
                  {emp.employeeId}
                </td>

                <td className="p-3">
                  {emp.name}
                </td>

                <td className="p-3">
                  {emp.department}
                </td>

                <td className="p-3">
                  <select
                    className="border p-2 rounded"
                    value={attendance[emp._id] || ""}
                    onChange={(e) =>
                      handleAttendance(
                        emp._id,
                        e.target.value
                      )
                    }
                  >
                    <option value="">
                      Select
                    </option>

                    <option value="Present">
                      Present
                    </option>

                    <option value="Absent">
                      Absent
                    </option>

                    <option value="Leave">
                      Leave
                    </option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          onClick={handleSubmit}
          className="mt-5 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
        >
          Save Attendance
        </button>
      </div>
    </div>
  );
};

export default Attendence;