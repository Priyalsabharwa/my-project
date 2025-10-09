const express = require('express');
const router = express.Router();
const studentController = require('../controller/studentController'); // ✅ correct path

// CRUD routes
router.post('/', studentController.createStudent);
router.get('/', studentController.getAllStudents);
router.put('/:id', studentController.updateStudent);
router.delete('/:id', studentController.deleteStudent);

module.exports = router;
