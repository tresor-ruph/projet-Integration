const express = require('express');
const router = express.Router();

const cont = require('../controllers/auth');
router.get("/", (req, res) => {
    res.json({ message: "Welcome to the application." });
  });

//router.post('/auth',cont.register);


module.exports = router;