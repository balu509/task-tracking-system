const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = new User({ username, email, password });
    await user.save();
    res.redirect('/auth/login');
  } catch (error) {
    res.render('auth/register', { error: 'Registration failed' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.isValidPassword(password))) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    req.session.userId = user._id;
    req.session.token = token;  // Store JWT in session
    res.redirect('/tasks');
  } else {
    res.render('auth/login', { error: 'Invalid credentials' });
  }
};

exports.profile = (req, res) => {
  res.render('profile', { user: req.user });
};
