const express = require("express");
const router = express.Router();

const Employee = require("../models/employee");

// ADD EMPLOYEE
router.post("/add", async (req, res) => {
  try {
    const year = new Date()
      .getFullYear()
      .toString()
      .slice(-2);

    const dept = req.body.department
      .toUpperCase();

    const totalEmployees =
      await Employee.countDocuments();

    const serial = String(
      totalEmployees + 1
    ).padStart(4, "0");

    const employeeId =
      `${year}/${dept}/${serial}`;

    const employee =
      await Employee.create({
        employeeId,
        name: req.body.name,
        email: req.body.email,
        department: req.body.department,
        salary: req.body.salary,
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
router.get("/view", async (req, res) => {
  try {
    const employees =
      await Employee.find();

    res.json(employees);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// VIEW SINGLE EMPLOYEE
router.get("/view/:id", async (req, res) => {
  try {
    const employee =
      await Employee.findById(
        req.params.id
      );

    res.json(employee);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// UPDATE EMPLOYEE
router.put("/update/:id", async (req, res) => {
  try {
    const employee =
      await Employee.findByIdAndUpdate(
        req.params.id,
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
router.delete("/delete/:id", async (req, res) => {
  try {
    await Employee.findByIdAndDelete(
      req.params.id
    );

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
router.get("/count/all", async (req, res) => {
  try {
    const totalEmployees =
      await Employee.countDocuments();

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
router.get("/payroll/total", async (req, res) => {
  try {
    const employees =
      await Employee.find();

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