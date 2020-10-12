const express = require('express');
const router = express.Router();

//const cont = require('../controllers/auth');

router.get('/auth',(req, res) => {
    res.json({ message: "get message" });
  });

module.exports = router;