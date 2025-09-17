import mongoose from "mongoose"

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
    console.log("Connection created succesfully");
    } catch (error) {
        console.error("Connection failed", error.message);
        process.exit(1);
    }
}

export default connectDB;