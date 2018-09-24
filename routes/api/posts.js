const express = require('express');
const router = express.Router();

/**
 * @example	GET api/posts/test
 * @desc	Test posts route
 * @access	Public
 */
router.get('/test', (req, res) =>
  res.json({
    message: 'Posts Works'
  })
);

module.exports = router;
