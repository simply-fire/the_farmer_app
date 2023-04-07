const user = require('../models/userLoginDetails');
const OTP = require('../models/OTP');
const details_holder = require("../models/userDetailsUnverfied");
const bcrypt = require('bcrypt')

// the user makes the get request to accces the application

exports.Login = async (req, res, next) => {

    try {
        const usrnm = await user.find({ email: req.body.email });
        if (usrnm.length === 0) res.send("Unregistered User");
        else {
            let verify = bcrypt.compare(req.body.password, usrnm[0].password, (err, data) => {
                if (err) throw err;
                if (data) {
                    console.log("loggedin");
                    res.send("Love ur Logged in")
                } else {
                    res.send("Please be Sure about the password")
                }
            })
        }


    } catch (error) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }

};

exports.Signup = async (req, res, next) => {
    try {

        var email = req.body.email;
        var password_hash = await bcrypt.hash(req.body.password, 10);
        var otp_hash = await generateOtp(email);

        console.log(otp_hash);

        var cred = await user.find({ email: email });

        if (cred.length != 0)
            res.send("This email Id is Already registered");
        else {
            var user_cred = new details_holder({
                email: req.body.email,
                password: password_hash
            })

            user_cred.save()
                .then(() => {
                    console.log("Success");
                }).catch((err) => {
                    console.log(err);
                })
            res.send("Welcome user Now verify your email");
        }

    }

    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }
}

generateOtp = async (email) => {

    let otp_value = Math.ceil(Math.random() * 100000);
    if (otp_value < 100000) otp_value += 100000;
    console.log(process.env.saltRounds);
    let otp_hash = await bcrypt.hash(otp_value.toString(), 10);


    var otpCred = new OTP({
        otp: otp_hash,
        email: email
    })

    otpCred.save()
        .then(() => {
            console.log("success");
        }).catch((err) => {
            console.log(err);
            console.log("req failed");
        })

    return otp_value;
}
