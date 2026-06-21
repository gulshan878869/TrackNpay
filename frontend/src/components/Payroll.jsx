import React, { useEffect, useState } from "react";
import axios from "axios";

const Payroll = () => {
  const [payroll, setPayroll] = useState([]);

  useEffect(() => {
    fetchPayroll();
  }, []);

  const fetchPayroll = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/payroll/view"
      );

      setPayroll(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const generatePayroll = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/payroll/generate"
      );

      setPayroll(res.data);

      alert("Payroll Generated Successfully");
    } catch (error) {
      console.log(error);
      alert("Error Generating Payroll");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-purple-700 mb-6">
        Payroll Management
      </h1>

      <div className="bg-white shadow-lg rounded-lg p-6 overflow-x-auto">
        <table className="w-full border">
          <thead>
            <tr className="bg-purple-600 text-white">
              <th className="p-3">Employee ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Department</th>
              <th className="p-3">Monthly Salary</th>
              <th className="p-3">Present</th>
              <th className="p-3">Absent</th>
              <th className="p-3">Leave</th>
              <th className="p-3">Earned Salary</th>
            </tr>
          </thead>

          <tbody>
            {payroll.length > 0 ? (
              payroll.map((emp) => (
                <tr
                  key={emp.employeeId}
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
                    ₹{emp.monthlySalary}
                  </td>

                  <td className="p-3 text-green-600 font-bold">
                    {emp.presentDays}
                  </td>

                  <td className="p-3 text-red-600 font-bold">
                    {emp.absentDays}
                  </td>

                  <td className="p-3 text-yellow-600 font-bold">
                    {emp.leaveDays}
                  </td>

                  <td className="p-3 text-blue-600 font-bold">
                    ₹{emp.earnedSalary}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="p-5 text-center text-gray-500"
                >
                  No Payroll Data Found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <button
          onClick={generatePayroll}
          className="mt-6 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
        >
          Generate Payroll
        </button>
      </div>
    </div>
  );
};

export default Payroll;