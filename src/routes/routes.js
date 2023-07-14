const express = require("express");
const router = express.Router();

const Booking = require('../Screens/Booking/Booking');
const User = require('../Screens/auth/register/registermodel');
const Bookings = require("../Screens/Booking/Booking");

router.use(express.json());

router.get('/Bookings', async (req, res) => {
    try {
        const bookings = await Booking.find({})
        res.send({ bookings })
    } catch (error) {
        return console.log(res.status(400).json({ message: error }));
    }
});

router.post('/Register', async (req, res) => {
    const newuser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        birthday: req.body.birthday
    });
    try {
        const user = await newuser.save();
        res.send('Success');
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});
router.post('/Login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email, password: password })
        if (user) {
            const temp = {
                username: user.username,
                email: user.email,
                birthday: user.birthday,
                _id: user._id
            }
            res.send(temp);
        } else {
            return res.status(400).json({ message: error })
        }

    } catch (error) {
        return res.status(400).json({ message: error })
    }

});

router.post('/Bookings', async (req, res) => {
    const Booking = new Bookings({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        birthday: req.body.birthday
    });
    try {
        
    } catch (error) {
        
    }
})

module.exports = router