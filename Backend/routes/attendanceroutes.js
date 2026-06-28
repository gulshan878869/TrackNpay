const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const Attendance = require("../models/Attendance");

// SAVE ATTENDANCE
router.post("/add", auth, async (req, res) => {
  try {
    const existing = await Attendance.findOne({
      userId: req.userId,
      employeeId: req.body.employeeId,
      date: req.body.date,
    });

    if (existing) {
      return res.status(400).json({
        message: "Attendance already marked",
      });
    }

    const attendance = await Attendance.create({
      employeeId: req.body.employeeId,
      name: req.body.name,
      department: req.body.department,
      date: req.body.date,
      status: req.body.status,
      userId: req.userId,
    });

    res.status(201).json(attendance);

  } catch (error) {
    console.log("Attendance Add Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// VIEW ALL ATTENDANCE
router.get("/view", auth, async (req, res) => {
  try {

    const attendance = await Attendance.find({
      userId: req.userId,
    }).sort({
      date: -1,
    });

    res.json(attendance);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }
});

// TODAY SUMMARY
router.get("/summary", auth, async (req, res) => {

  try {

    const today = new Date()
      .toISOString()
      .split("T")[0];

    const present = await Attendance.countDocuments({
      userId: req.userId,
      date: today,
      status: "Present",
    });

    const absent = await Attendance.countDocuments({
      userId: req.userId,
      date: today,
      status: "Absent",
    });

    const leave = await Attendance.countDocuments({
      userId: req.userId,
      date: today,
      status: "Leave",
    });

    const attendance = await Attendance.find({
      userId: req.userId,
      date: today,
    });

    res.json({
      present,
      absent,
      leave,
      attendance,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }
});

// EMPLOYEE HISTORY
router.get("/employee/:employeeId", auth, async (req, res) => {

  try {

    const attendance = await Attendance.find({
      userId: req.userId,
      employeeId: req.params.employeeId,
    }).sort({
      date: -1,
    });

    res.json(attendance);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }
});

module.exports = router;