const express = require('express');
const router = express.Router();

/**
 * @example	GET api/profile/test
 * @desc	Test profile route
 * @access	Public
 */
router.get('/test', (req, res) =>
  res.json({
    message: 'Profile Works'
  })
);

module.exports = router;
