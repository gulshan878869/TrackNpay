import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  const [totalEmployees, setTotalEmployees] = useState(0);
  const [present, setPresent] = useState(0);
  const [absent, setAbsent] = useState(0);

  const fetchDashboardData = async () => {
    try {
      const empRes = await axios.get(
        "http://localhost:3000/api/employee/count/all"
      );

      const attRes = await axios.get(
        "http://localhost:3000/api/attendance/summary"
      );

      setTotalEmployees(
        empRes.data.totalEmployees
      );

      setPresent(
        attRes.data.present
      );

      setAbsent(
        attRes.data.absent
      );

    } catch (error) {
      console.log(error);
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

      {/* Date & Time Top Right */}
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

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <div className="bg-blue-600 text-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold">
            Total Employees
          </h2>

          <p className="text-3xl font-bold mt-2">
            {totalEmployees}
          </p>
        </div>

        <div className="bg-green-600 text-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold">
            Present Today
          </h2>

          <p className="text-3xl font-bold mt-2">
            {present}
          </p>
        </div>

        <div className="bg-red-600 text-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold">
            Absent Today
          </h2>

          <p className="text-3xl font-bold mt-2">
            {absent}
          </p>
        </div>

        <div className="bg-purple-600 text-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold">
            Monthly Payroll
          </h2>

          <p className="text-2xl font-bold mt-2">
            Coming Soon
          </p>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;