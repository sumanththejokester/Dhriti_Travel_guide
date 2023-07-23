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

router.post('/Bookings', async (req, res) => {
    const { name, address, price, userid } = req.body;
    try {
        const newBooking = new Booking({
            name,
            address,
            price,
            userid,
            isBooked: false, // Default value, you can change this if needed
        });

        // Save the new booking in the database
        const savedBooking = await newBooking.save();

        // Respond with the saved booking
        res.send(savedBooking);
    } catch (error) {
        return res.status(400).json({ message: error });
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
    const updatedBookings = req.body;
    try {
        // Assuming each element of updatedBookings array contains an updated booking object with _id field
        const bulkUpdateOps = updatedBookings.map((updatedBooking) => ({
            updateOne: {
                filter: { _id: updatedBooking._id },
                update: {
                    $set: {
                        count: updatedBooking.count,
                        from: updatedBooking.from,
                        to: updatedBooking.to,
                        isBooked: updatedBooking.isBooked,
                        username: updatedBooking.username,
                        email: updatedBooking.email,
                    },
                },
            },
        }));

        // Perform the bulk update operation
        await Booking.bulkWrite(bulkUpdateOps);

        // Fetch all bookings after the bulk update
        const updatedBookingsFromDB = await Booking.find({});

        res.send({ bookings: updatedBookingsFromDB });
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.delete('/Bookings/:bookingId', async (req, res) => {
    const bookingId = req.params.bookingId;
    try {
        // Find the booking by its ID and delete it
        await Booking.findByIdAndDelete(bookingId);

        // Respond with a success message
        res.send({ message: 'Booking deleted successfully' });
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

module.exports = router