import mongoose from "mongoose";
import DB_NAME from "../constant.js";

const connectDB = async () => {
    try {
        console.log(process.env.MONGO_URI)
        await mongoose.connect(`${process.env.MONGO_URI}`)
        console.log('DB connected successfully...');
    } catch (error) {
        console.log('Error: DB connection failed!!!');
        console.log(error);
    }
}


export default connectDB