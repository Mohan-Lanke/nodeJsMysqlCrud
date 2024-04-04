const express = require("express");
const { getStudents, getStudentById, createStudent, updataDetails, deleteRecord } = require("../Controllers/studentController");

//router
const router = express.Router();

//routes

//get all students list
router.get("/getAll",getStudents);

router.get("/get/:id", getStudentById)

router.post("/create", createStudent)

router.put("/update/:id", updataDetails)

router.delete("/delete/:id", deleteRecord)

module.exports = router;