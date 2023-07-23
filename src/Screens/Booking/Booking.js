const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true,
        default: 1,
    },
    isBooked: {
        type: Boolean,
        required: true,
        default: false,
    },
    from: {
        type: String,
    },
    to: {
        type: String,
    },
    price: {
        type: String
    },
    username: {
        type: String,
    },
    email: {
        type: String,
    },
    userid: {
        type: String,
    }
})

const bookingModel = mongoose.model('Bookings', bookingSchema)

module.exports = bookingModel