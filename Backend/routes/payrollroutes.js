const express = require("express");
const router = express.Router();

const Employee = require("../models/employee");
const Attendance = require("../models/Attendance");

// Generate Payroll
router.post("/generate", async (req, res) => {
  try {
    const employees = await Employee.find();

    const result = [];

    for (const emp of employees) {

      const presentDays =
        await Attendance.countDocuments({
          employeeId: emp.employeeId,
          status: "Present",
        });

      const absentDays =
        await Attendance.countDocuments({
          employeeId: emp.employeeId,
          status: "Absent",
        });

      const leaveDays =
        await Attendance.countDocuments({
          employeeId: emp.employeeId,
          status: "Leave",
        });

      const dailySalary =
        emp.salary / 30;

      const earnedSalary =
        Math.round(
          dailySalary * presentDays
        );

      result.push({
        employeeId: emp.employeeId,
        name: emp.name,
        department: emp.department,
        monthlySalary: emp.salary,
        presentDays,
        absentDays,
        leaveDays,
        earnedSalary,
      });
    }

    res.status(200).json(result);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error generating payroll",
    });
  }
});

// View Payroll
router.get("/view", async (req, res) => {
  try {
    const employees = await Employee.find();

    const result = [];

    for (const emp of employees) {

      const presentDays =
        await Attendance.countDocuments({
          employeeId: emp.employeeId,
          status: "Present",
        });

      const absentDays =
        await Attendance.countDocuments({
          employeeId: emp.employeeId,
          status: "Absent",
        });

      const leaveDays =
        await Attendance.countDocuments({
          employeeId: emp.employeeId,
          status: "Leave",
        });

      const dailySalary =
        emp.salary / 30;

      const earnedSalary =
        Math.round(
          dailySalary * presentDays
        );

      result.push({
        employeeId: emp.employeeId,
        name: emp.name,
        department: emp.department,
        monthlySalary: emp.salary,
        presentDays,
        absentDays,
        leaveDays,
        earnedSalary,
      });
    }

    res.status(200).json(result);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error fetching payroll",
    });
  }
});

module.exports = router;