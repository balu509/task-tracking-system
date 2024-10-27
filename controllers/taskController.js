const Task = require('../models/Task');

// Create a new task
exports.createTask = async (req, res) => {
  const { title, description, dueDate } = req.body;
  const task = new Task({
    title,
    description,
    dueDate,
    createdBy: req.user._id,
    assignedTo: req.user._id,
  });
  await task.save();
  res.redirect('/tasks');
};

// Get all tasks assigned to the user
exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ assignedTo: req.user._id });
  res.render('tasks/tasks', { tasks });
};

// Mark a task as completed
exports.markCompleted = async (req, res) => {
  await Task.findByIdAndUpdate(req.params.id, { status: 'completed' });
  res.redirect('/tasks');
};

// Update a task
exports.updateTask = async (req, res) => {
  const { title, description, dueDate } = req.body;
  await Task.findByIdAndUpdate(req.params.id, { title, description, dueDate });
  res.redirect('/tasks');
};

// Delete a task
exports.deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.redirect('/tasks');
};
