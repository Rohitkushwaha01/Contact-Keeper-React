const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async()=>{
    try {
        await mongoose.connect(db);
        console.log("MongoDB Connected");
    } catch (error) {
        console.error(error.message);
        // Exit the process with Failure
        process.exit(1);
    }
}

module.exports = connectDB;