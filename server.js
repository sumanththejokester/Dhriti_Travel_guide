const express = require("express");

const app = express();

const dbConfig = require('./src/Server/db');
const bookingsRoute = require('./src/routes/routes')
const userRoute = require('./src/routes/routes')

app.use('/Bookings', bookingsRoute)
app.use('/Users', userRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Server"));
