const express = require('express');
const {
  createTask,
  getTasks,
  markCompleted,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');
const router = express.Router();

// Route to get all tasks for the user
router.get('/', getTasks);

// Route to create a new task
router.post('/', createTask);

// Route to mark a task as completed
router.post('/complete/:id', markCompleted);

// Route to show the edit task form
router.get('/edit/:id', async (req, res) => {
  const task = await Task.findById(req.params.id);
  res.render('tasks/editTask', { task });
});

// Route to update a task
router.post('/edit/:id', updateTask);

// Route to delete a task
router.post('/delete/:id', deleteTask);

module.exports = router;
