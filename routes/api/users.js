const express = require('express');
const router = express.Router();

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

module.exports = router;
