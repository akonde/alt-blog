const mongoose = require('mongoose');
require("dotenv").config()

const dbUrl = process.env.DB_URL;

const connect = () => {
    mongoose.connect(dbUrl)

    mongoose.connection.on("connected", () => {
        console.log("Connected to MongoDB Successfully");
    });

    mongoose.connection.on("error", (err) => {
        console.log("An error occurred while connecting to MongoDB");
        console.log(err);
    });
}

module.exports = {
    connect
};
