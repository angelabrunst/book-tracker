const express = require('express');
const router = express.Router();
// const { requiresAuth } = require('express-openid-connect');

router.use('/', require('./swagger'));
router.use('/user', require('./user'));
router.use('/book', require('./book'));
router.use('/auth', require('./oauth'));

module.exports = router;