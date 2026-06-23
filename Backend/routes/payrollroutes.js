const express = require("express");
const router = express.Router();

const Employee = require("../models/employee");
const Attendance = require("../models/Attendance");
const Payroll = require("../models/Payroll");

router.post("/generate", async (req, res) => {
  try {
    const employees = await Employee.find();

    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();

    const result = [];

    for (const emp of employees) {

      const alreadyGenerated =
        await Payroll.findOne({
          employeeId: emp.employeeId,
          month,
          year,
        });

      if (alreadyGenerated) {
        result.push(alreadyGenerated);
        continue;
      }

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

      const payroll =
        await Payroll.create({
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
        });

      result.push(payroll);
    }

    res.status(200).json(result);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error generating payroll",
    });
  }
});
router.get("/view", async (req, res) => {
  try {
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();

    const payroll = await Payroll.find({
      month,
      year,
    });

    res.status(200).json(payroll);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error fetching payroll",
    });
  }
});
router.get(
  "/history/:employeeId",
  async (req, res) => {
    try {

      const history =
        await Payroll.find({
          employeeId:
            req.params.employeeId,
        }).sort({
          year: -1,
          month: -1,
        });

      res.status(200).json(history);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Error fetching history",
      });
    }
  }
);

router.get("/history", async (req, res) => {
  try {
    const month = Number(req.query.month);
    const year = Number(req.query.year);

    const payroll = await Payroll.find({
      month,
      year,
    });

    res.status(200).json(payroll);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error fetching payroll history",
    });
  }
});

module.exports = router;