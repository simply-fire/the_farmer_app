const express = require('express');
const { Login, Signup } = require('../conrollers/LoginSignupPage');
const { verifyOtp } = require('../conrollers/Verify');

const router = express.Router();

router
    .route('/')
    .get(Login)
    .post(Signup)

router.route('/Verify')
    .post(verifyOtp)

module.exports = router;