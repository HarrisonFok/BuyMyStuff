import mongoose from "mongoose";

// async because when we do .connect, .find etc., it'll always return a promise
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        })

        console.log(`mongodb connected: ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        console.log(`error: ${error.message}`.red.underline.bold);
        // exit with failure
        process.exit(1);
    }
}

export default connectDB; 