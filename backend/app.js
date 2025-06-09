require("dotenv").config();

const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require('cors');
app.use(cors({
    origin: "*",
    credential: true
}));

// routers
const User = require('./routes/UserRouter');
const Customer = require('./routes/CustomerRouter');
const Seller = require('./routes/SellerRouter');

// endpoints
app.use('/', (req, res) => {
    console.log("Server has started....");
    res.json({ message: "Server has started....." });
});

app.use('/user', User);
app.use('/customer', Customer);
app.use('/seller', Seller);

// error handling
app.use((err, req, res, next) => {
    console.error(err.message);
    res.send({ status: 500, error: (err.message) ? err.message : "Something broke" });
});

app.listen(process.env.PORT, () => {
    console.log(`Server running at ${process.env.PORT}.....`);
});