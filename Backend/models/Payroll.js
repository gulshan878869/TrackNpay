const mongoose = require("mongoose");

const payrollSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: true,
  },

  name: String,

  department: String,

  month: Number,

  year: Number,

  monthlySalary: Number,

  presentDays: Number,

  absentDays: Number,

  leaveDays: Number,

  earnedSalary: Number,

  generatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model(
  "Payroll",
  payrollSchema
);