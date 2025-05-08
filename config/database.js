const mongoose = require('mongoose');
require('dotenv').config();
const cli = require('cli-colors')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log(cli.bgGreen("Connected To Database Successfully!"))
    } catch (error) {
        console.log(cli.bgRed("Error To connect Database ") + error?.message);
        process.exit(1);
    }
}

module.exports = connectDB;