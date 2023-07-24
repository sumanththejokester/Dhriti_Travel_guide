const mongoose = require('mongoose');

var mongoURL = 'mongodb+srv://sumanthbadugu07:sumanth@cluster0.8mykts1.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });

var connection = mongoose.connection

connection.on('error', () => {
    console.log('Failed');
})

connection.on('connected', () => {
    console.log('Success');
})

module.exports = mongoose;
