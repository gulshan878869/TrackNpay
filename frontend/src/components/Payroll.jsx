import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Payroll = () => {
  const [payroll, setPayroll] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [selectedMonth, setSelectedMonth] = useState(
    new Date().getMonth() + 1
  );

  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear()
  );

  useEffect(() => {
  fetchHistory(selectedMonth, selectedYear);
}, [selectedMonth, selectedYear]);
// FETCH PAYROLL HISTORY
const fetchHistory = async (month, year) => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      `http://localhost:3000/api/payroll/history?month=${month}&year=${year}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setPayroll(res.data);
  } catch (error) {
    console.log(error);
  }
};
// GENERATE PAYROLL
  const generatePayroll = async () => {
  try {
    const token = localStorage.getItem("token");

    await axios.post(
      "http://localhost:3000/api/payroll/generate",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchHistory(selectedMonth, selectedYear);

    alert("Payroll Generated Successfully");
  } catch (error) {
    console.log(error);

    alert("Error Generating Payroll");
  }
};
// PAY SALARY
  const paySalary = async (id) => {
  try {
    const token = localStorage.getItem("token");

    await axios.put(
      `http://localhost:3000/api/payroll/pay/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setPayroll((prev) =>
      prev.map((emp) =>
        emp._id === id ? { ...emp, paid: true } : emp
      )
    );

    alert("Salary Paid Successfully");

    fetchHistory(selectedMonth, selectedYear);
  } catch (error) {
    console.log(error);

    alert("Error Paying Salary");
  }
};
// DOWNLOAD PDF

  const downloadPDF = (emp) => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Salary Slip", 75, 20);

    autoTable(doc, {
      startY: 35,
      theme: "grid",
      body: [
        ["Employee ID", emp.employeeId],
        ["Employee Name", emp.name],
        ["Department", emp.department],
        ["Month", `${emp.month}/${emp.year}`],
        ["Monthly Salary", `Rs. ${emp.monthlySalary}`],
        ["Present Days", emp.presentDays],
        ["Absent Days", emp.absentDays],
        ["Leave Days", emp.leaveDays],
        ["Net Salary", `Rs. ${emp.earnedSalary}`],
      ],
    });

    doc.save(
      `${emp.name}_SalarySlip.pdf`
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-4xl font-bold text-purple-700">
          Payroll Management
        </h1>

        <select
          value={selectedMonth}
          onChange={(e) => {
            const month = Number(
              e.target.value
            );

            setSelectedMonth(month);

            fetchHistory(
              month,
              selectedYear
            );
          }}
          className="border p-2 rounded-lg"
        >
          <option value="1">
            January
          </option>

          <option value="2">
            February
          </option>

          <option value="3">
            March
          </option>

          <option value="4">
            April
          </option>

          <option value="5">
            May
          </option>

          <option value="6">
            June
          </option>

          <option value="7">
            July
          </option>

          <option value="8">
            August
          </option>

          <option value="9">
            September
          </option>

          <option value="10">
            October
          </option>

          <option value="11">
            November
          </option>

          <option value="12">
            December
          </option>
        </select>

      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 overflow-x-auto">

        <table className="w-full border">

          <thead>

            <tr className="bg-purple-600 text-white">

              <th className="p-3">
                Employee ID
              </th>

              <th className="p-3">
                Name
              </th>

              <th className="p-3">
                Department
              </th>

              <th className="p-3">
                Monthly Salary
              </th>

              <th className="p-3">
                Present
              </th>

              <th className="p-3">
                Absent
              </th>

              <th className="p-3">
                Leave
              </th>

              <th className="p-3">
                Earned Salary
              </th>

              <th className="p-3">
                Salary Slip
              </th>
              <th className="p-3">
                Payment Status
              </th>

            </tr>

          </thead>

          <tbody>

            {payroll.length > 0 ? (

              payroll.map((emp) => (

                <tr
                  key={emp._id}
                  className="text-center border-b hover:bg-gray-50"
                >

                  <td className="p-3">
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
                 

                  <td className="p-3">

                    <button
                      onClick={() =>
                        setSelectedEmployee(
                          emp
                        )
                      }
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                    >
                      View Slip
                    </button>

                  </td>
                  <td className="p-3">
  {emp.paid ? (
    <span className="text-green-600 font-bold">
      ✅ Paid
    </span>
  ) : (
    <button
      onClick={() => paySalary(emp._id)}
      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
    >
      Pay Now
    </button>
  )}
</td>
             

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="9"
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

      {selectedEmployee && (

        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">

          <div className="bg-white w-[550px] rounded-xl shadow-2xl p-8">

            <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
              Salary Slip
            </h2>

            <div className="space-y-3 text-lg">

              <p>
                <strong>
                  Employee ID:
                </strong>{" "}
                {
                  selectedEmployee.employeeId
                }
              </p>

              <p>
                <strong>
                  Name:
                </strong>{" "}
                {
                  selectedEmployee.name
                }
              </p>

              <p>
                <strong>
                  Department:
                </strong>{" "}
                {
                  selectedEmployee.department
                }
              </p>

              <p>
                <strong>
                  Month:
                </strong>{" "}
                {
                  selectedEmployee.month
                }
                /
                {
                  selectedEmployee.year
                }
              </p>

              <hr />

              <p>
                <strong>
                  Monthly Salary:
                </strong>{" "}
                ₹
                {
                  selectedEmployee.monthlySalary
                }
              </p>

              <p>
                <strong>
                  Present Days:
                </strong>{" "}
                {
                  selectedEmployee.presentDays
                }
              </p>

              <p>
                <strong>
                  Absent Days:
                </strong>{" "}
                {
                  selectedEmployee.absentDays
                }
              </p>

              <p>
                <strong>
                  Leave Days:
                </strong>{" "}
                {
                  selectedEmployee.leaveDays
                }
              </p>

              <hr />

              <p className="text-2xl font-bold text-green-600">
                Net Salary : ₹
                {
                  selectedEmployee.earnedSalary
                }
              </p>

            </div>

            <div className="flex justify-between mt-8">

              <button
                onClick={() =>
                  downloadPDF(
                    selectedEmployee
                  )
                }
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
              >
                Download PDF
              </button>

              <button
                onClick={() =>
                  setSelectedEmployee(
                    null
                  )
                }
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default Payroll;