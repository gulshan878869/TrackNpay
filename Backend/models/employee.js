const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    employeeId: {
        type: String,
        unique: true
    },

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    department: {
        type: String,
        required: true
    },

    salary: {
        type: Number,
        required: true
    },
    userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User-su",
  required: true,
},
});

module.exports = mongoose.model('Employee', employeeSchema);