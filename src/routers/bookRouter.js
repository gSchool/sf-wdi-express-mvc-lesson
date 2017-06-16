const express = require('express');

const router = express.Router();

const handleIndexPage = require('../controllers/handleIndexPage');
const handleBookPage = require('../controllers/handleBookPage');

router.get('/books', handleIndexPage);
router.get('/books/:id', handleBookPage);

module.exports = router;
