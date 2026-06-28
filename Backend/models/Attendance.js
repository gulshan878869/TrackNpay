const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  department: {
    type: String,
    required: true,
  },
userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User-su",
  required: true,
},
  date: {
    type: String,
    default: () =>
      new Date().toISOString().split("T")[0],
  },

  month: {
    type: Number,
    default: () => new Date().getMonth() + 1,
  },

  year: {
    type: Number,
    default: () => new Date().getFullYear(),
  },

  status: {
    type: String,
    required: true,
  },
});

// One attendance per employee per day
attendanceSchema.index(
  {
    employeeId: 1,
    date: 1,
  },
  {
    unique: true,
  }
);

module.exports = mongoose.model(
  "Attendance",
  attendanceSchema
);