import mongoose from "mongoose";

// Function to establish connection with MongoDB database
const connectDB = async () => {

    // Log a message once the connection is successful
    mongoose.connection.on('connected', () => { 
        console.log("Database Connected") 
    });

    // Connect to MongoDB using the URI from .env and the 'medibook' database
    await mongoose.connect(`${process.env.MONGODB_URI}/medibook`);
}

export default connectDB;
