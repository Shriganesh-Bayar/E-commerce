require("dotenv").config();

const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const cors = require('cors');
app.use(cors({
    origin: "*",
    credential: true
}));





app.listen(process.env.PORT, () => {
    console.log(`Server running at ${process.env.PORT}.....`);
});