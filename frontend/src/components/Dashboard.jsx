import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  const [totalEmployees, setTotalEmployees] = useState(0);
  const [present, setPresent] = useState(0);
  const [absent, setAbsent] = useState(0);
  const [totalPayroll, setTotalPayroll] = useState(0);

  const fetchDashboardData = async () => {
  try {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const empRes = await axios.get(
      "http://localhost:3000/api/employee/count/all",
      config
    );

    const attRes = await axios.get(
      "http://localhost:3000/api/attendance/summary",
      config
    );

    const payrollRes = await axios.get(
      "http://localhost:3000/api/payroll/view",
      config
    );

    const paidAmount = payrollRes.data
      .filter((emp) => emp.paid)
      .reduce((sum, emp) => sum + emp.earnedSalary, 0);

    setTotalEmployees(empRes.data.totalEmployees);
    setPresent(attRes.data.present);
    setAbsent(attRes.data.absent);
    setTotalPayroll(paidAmount);

  } catch (error) {
    console.log(error.response?.data || error);
  }
};
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    fetchDashboardData();

    return () => clearInterval(timer);
  }, []);

  const dateStr =
    currentTime.toLocaleDateString();

  const timeStr =
    currentTime.toLocaleTimeString();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 to-blue-100 p-8">

      {/* Date & Time */}
      <div className="flex justify-end mb-6">
        <div className="text-right">
          <p className="text-gray-700 font-semibold">
            {dateStr}
          </p>

          <p className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md font-bold">
            {timeStr}
          </p>
        </div>
      </div>

      {/* Heading */}
      <h1 className="text-4xl font-bold text-blue-700 mb-4">
        Welcome to TrackNPay
      </h1>

      <p className="text-lg text-gray-700 mb-8">
        Track and manage your employees'
        attendance and payroll efficiently.
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        {/* Total Employees */}
        <div className="bg-blue-600 text-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold">
            Total Employees
          </h2>

          <p className="text-3xl font-bold mt-2">
            {totalEmployees}
          </p>
        </div>

        {/* Present */}
        <div className="bg-green-600 text-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold">
            Present Today
          </h2>

          <p className="text-3xl font-bold mt-2">
            {present}
          </p>
        </div>

        {/* Absent */}
        <div className="bg-red-600 text-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold">
            Absent Today
          </h2>

          <p className="text-3xl font-bold mt-2">
            {absent}
          </p>
        </div>

        {/* Paid Payroll */}
        <div className="bg-purple-600 text-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold">
            Paid Payroll
          </h2>

          <p className="text-3xl font-bold mt-2">
            ₹{totalPayroll}
          </p>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;