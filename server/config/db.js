const mongoose = require("mongoose");
const dbName = process.env.dbName;

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(`mongodb://127.0.0.1:27017/${dbName}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`MongoDb connected: ${dbName}`);
    } catch (error) {
        console.error(`Error connecting to database: ${error.message}`);
        process.exit(1); // Exiting with a non-zero code to indicate failure
    }
};

module.exports = connectDB;
