const express = require('express');

const router = express.Router();

const handleIndexPage = require('../controllers/handleIndexPage');

router.get('/', handleIndexPage);

module.exports = router;
