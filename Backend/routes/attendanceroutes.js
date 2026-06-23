const express = require("express");
const router = express.Router();

const Attendance = require("../models/Attendance");

// SAVE ATTENDANCE
router.post("/add", async (req, res) => {
  try {

    const existing = await Attendance.findOne({
  employeeId: req.body.employeeId,
  date: req.body.date,
});

if (existing) {
  return res.status(400).json({
    message: "Attendance already marked",
  });
}

    const attendance =
      await Attendance.create(req.body);

    res.json(attendance);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// VIEW ALL ATTENDANCE
router.get("/view", async (req, res) => {
  try {
    const attendance = await Attendance.find();

    res.json(attendance);
  } catch (error) {
    console.log("View Attendance Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// TODAY SUMMARY
router.get("/summary", async (req, res) => {
  try {
    const today = new Date()
      .toISOString()
      .split("T")[0];

    const present = await Attendance.countDocuments({
      date: today,
      status: "Present",
    });

    const absent = await Attendance.countDocuments({
      date: today,
      status: "Absent",
    });

    const leave = await Attendance.countDocuments({
      date: today,
      status: "Leave",
    });

    const attendance = await Attendance.find({
      date: today,
    });

    res.json({
      present,
      absent,
      leave,
      attendance,
    });
  } catch (error) {
    console.log("Summary Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// EMPLOYEE ATTENDANCE HISTORY
router.get("/employee/:employeeId", async (req, res) => {
  try {
    const attendance = await Attendance.find({
      employeeId: req.params.employeeId,
    });

    res.json(attendance);
  } catch (error) {
    console.log("Employee Attendance Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;