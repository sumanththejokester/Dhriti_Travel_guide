const mongoose = require('mongoose');

var mongoURL = process.env.MONGO_URI;

mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });

var connection = mongoose.connection

connection.on('error', () => {
    console.log('Failed');
})

connection.on('connected', () => {
    console.log('Success');
})

module.exports = mongoose;
