import React from "react";

const About = () => {
  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-slate-100 to-blue-100">
      
      <h1 className="text-4xl font-bold text-blue-800 mb-6">
        About TrackNPay
      </h1>

      <div className="bg-white shadow-lg rounded-xl p-6">
        
        <p className="text-gray-700 mb-4">
          TrackNPay is an Employee Attendance & Payroll Management System
          designed to simplify workforce management. The system helps
          organizations maintain employee records, track attendance,
          and manage payroll efficiently.
        </p>

        <p className="text-gray-700 mb-4">
          This project provides a user-friendly interface for managing
          employee information, monitoring attendance status, and
          calculating payroll details. It reduces manual work and
          improves accuracy in employee management.
        </p>

        <h2 className="text-2xl font-semibold text-blue-700 mt-6 mb-3">
          Key Features
        </h2>

        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Add and manage employee records.</li>
          <li>Track daily attendance.</li>
          <li>Maintain employee payroll information.</li>
          <li>View employee details in a structured format.</li>
          <li>Responsive and user-friendly interface.</li>
        </ul>

      </div>
    </div>
  );
};

export default About;