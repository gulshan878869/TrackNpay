const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const connectDB = require('./config/db');

const employeeRoutes = require('./routes/employeeroutes');
const attendanceRoutes = require('./routes/attendanceroutes');
const payrollRoutes = require("./routes/payrollroutes");
const userRoutes = require("./routes/userroutes");

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// Employee Routes
app.use('/api/employee', employeeRoutes);

// Attendance Routes
app.use('/api/attendance', attendanceRoutes);
// Payroll Routes
app.use("/api/payroll", payrollRoutes);
// User Routes
app.use("/api/auth", userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});