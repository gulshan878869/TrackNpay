const mongoose = require("mongoose");

const payrollSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: true,
  },
  userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User-su",
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
  paid: {
  type: Boolean,
  default: false,
},

paidDate: {
  type: Date,
}
});

module.exports = mongoose.model(
  "Payroll",
  payrollSchema
);