const express = require('express');
const router = express.Router();

const cont = require('../controllers/auth');

router.post('/auth',cont.register);

module.exports = router;