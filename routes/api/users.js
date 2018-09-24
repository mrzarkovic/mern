const router = require('express').Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Load User model
const User = require('../../models/User');

/**
 * @example	GET api/users/test
 * @desc	Test users route
 * @access	Public
 */
router.get('/test', (req, res) =>
  res.json({
    message: 'Users Works'
  })
);

/**
 * @example	POST api/users/register
 * @desc	Register a user
 * @access	Public
 */
router.post('/register', (req, res) => {
  const { email, name, password } = req.body;

  User.findOne({ email }).then(user => {
    if (user) {
      return res.status(400).json({ email: 'Email already exists' });
    }

    const avatar = gravatar.url(email, {
      s: '200', // Size
      r: 'pg', // Rating
      d: 'mm' // Default
    });

    const newUser = new User({
      name,
      email,
      avatar,
      password
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) {
          throw err;
        }
        newUser.password = hash;
        newUser
          .save()
          .then(user => res.json(user))
          .catch(err => console.log(err));
      });
    });
  });
});

/**
 * @example	POST api/users/login
 * @desc	Login User / Returning JWT
 * @access	Public
 */
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      res.status(404).json({ email: 'User not found' });
    }

    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        // Create JWT payload
        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar
        };
        // Sign token
        jwt.sign(payload);
      }

      return res.status(400).json({ password: 'Password is incorrect' });
    });
  });
});

module.exports = router;
