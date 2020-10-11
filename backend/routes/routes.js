const express = require('express');
const router = express.Router();

const cont = require('../controllers/auth');
const cont2 = require('../controllers/ajoutDem');
router.get("/", (req, res) => {
    res.json({ message: "Welcome to the application." });
  });

router.post('/auth',cont.register);
router.post('/demande', cont2.registerDem);


module.exports = router;