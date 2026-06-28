const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const Employee = require("../models/employee");
const Attendance = require("../models/Attendance");
const Payroll = require("../models/Payroll");

// ================= GENERATE PAYROLL =================

router.post("/generate", auth, async (req, res) => {
  try {
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();

    const employees = await Employee.find({
      userId: req.userId,
    });

    const payrollData = [];

    for (const emp of employees) {

      // Count attendance of current month
      const presentDays = await Attendance.countDocuments({
        userId: req.userId,
        employeeId: emp.employeeId,
        status: "Present",
        month,
        year,
      });

      const absentDays = await Attendance.countDocuments({
        userId: req.userId,
        employeeId: emp.employeeId,
        status: "Absent",
        month,
        year,
      });

      const leaveDays = await Attendance.countDocuments({
        userId: req.userId,
        employeeId: emp.employeeId,
        status: "Leave",
        month,
        year,
      });

      const earnedSalary = Math.round(
        (emp.salary / 30) * presentDays
      );

      let payroll = await Payroll.findOne({
        userId: req.userId,
        employeeId: emp.employeeId,
        month,
        year,
      });

      if (payroll) {
        // Update existing payroll
        payroll.monthlySalary = emp.salary;
        payroll.presentDays = presentDays;
        payroll.absentDays = absentDays;
        payroll.leaveDays = leaveDays;
        payroll.earnedSalary = earnedSalary;

        await payroll.save();
      } else {
        // Create new payroll
        payroll = await Payroll.create({
          userId: req.userId,
          employeeId: emp.employeeId,
          name: emp.name,
          department: emp.department,
          month,
          year,
          monthlySalary: emp.salary,
          presentDays,
          absentDays,
          leaveDays,
          earnedSalary,
          paid: false,
        });
      }

      payrollData.push(payroll);
    }

    res.json(payrollData);

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error generating payroll",
    });
  }
});

// ================= CURRENT MONTH =================

router.get("/view", auth, async (req, res) => {
  try {
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();

    const payroll = await Payroll.find({
      userId: req.userId,
      month,
      year,
    });

    res.json(payroll);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error fetching payroll",
    });
  }
});

// ================= MONTH HISTORY =================

router.get("/history", auth, async (req, res) => {
  try {
    const month = Number(req.query.month);
    const year = Number(req.query.year);

    const payroll = await Payroll.find({
      userId: req.userId,
      month,
      year,
    });

    res.json(payroll);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error fetching payroll",
    });
  }
});

// ================= EMPLOYEE HISTORY =================

router.get("/history/:employeeId", auth, async (req, res) => {
  try {
    const payroll = await Payroll.find({
      userId: req.userId,
      employeeId: req.params.employeeId,
    }).sort({
      year: -1,
      month: -1,
    });

    res.json(payroll);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error fetching history",
    });
  }
});

// ================= PAY SALARY =================

router.put("/pay/:id", auth, async (req, res) => {
  try {
    const payroll = await Payroll.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.userId,
      },
      {
        paid: true,
        paidDate: new Date(),
      },
      {
        new: true,
      }
    );

    res.json(payroll);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error paying salary",
    });
  }
});

module.exports = router;