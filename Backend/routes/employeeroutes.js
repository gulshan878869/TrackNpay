const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const Employee = require("../models/employee");

// ADD EMPLOYEE
router.post("/add", auth, async (req, res) => {
  try {
    const year = new Date()
      .getFullYear()
      .toString()
      .slice(-2);

    const dept = req.body.department
      .toUpperCase();

  const lastEmployee = await Employee.findOne({
  userId: req.userId,
  department: req.body.department,
}).sort({ createdAt: -1 });

let serial = 1;

if (lastEmployee) {
  serial =
    parseInt(lastEmployee.employeeId.split("/")[2]) + 1;
}

const employeeId =
  `${year}/${dept}/${String(serial).padStart(4, "0")}`;

    const employee =
      await Employee.create({
        employeeId,
        name: req.body.name,
        email: req.body.email,
        department: req.body.department,
        salary: req.body.salary,
        userId: req.userId,
      });

    res.status(201).json(employee);

  } catch (error) {

    console.log(
      "Employee Add Error:",
      error
    );

    res.status(500).json({
      message: error.message,
    });
  }
});

// VIEW ALL EMPLOYEES
router.get("/view", auth, async (req, res) => {
  try {

    const employees =
      await Employee.find({
        userId: req.userId,
      });

    res.json(employees);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// VIEW SINGLE EMPLOYEE
router.get("/view/:id", auth, async (req, res) => {
  try {

    const employee =
      await Employee.findOne({
        _id: req.params.id,
        userId: req.userId,
      });

    res.json(employee);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// UPDATE EMPLOYEE
router.put("/update/:id", auth, async (req, res) => {
  try {

    const employee =
      await Employee.findOneAndUpdate(
        {
          _id: req.params.id,
          userId: req.userId,
        },
        req.body,
        { new: true }
      );

    res.json(employee);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// DELETE EMPLOYEE
router.delete("/delete/:id", auth, async (req, res) => {
  try {

    await Employee.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    res.json({
      message:
        "Employee deleted successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// TOTAL EMPLOYEES
router.get("/count/all", auth, async (req, res) => {
  try {

    const totalEmployees =
      await Employee.countDocuments({
        userId: req.userId,
      });

    res.json({
      totalEmployees,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// TOTAL PAYROLL
router.get("/payroll/total", auth, async (req, res) => {
  try {

    const employees =
      await Employee.find({
        userId: req.userId,
      });

    const totalPayroll =
      employees.reduce(
        (sum, emp) =>
          sum + Number(emp.salary),
        0
      );

    res.json({
      totalPayroll,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;