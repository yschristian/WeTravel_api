import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()
const dbUrl = process.env.MONGODB_URL;

const dbConnect = async () =>{
   await mongoose.connect(
     dbUrl,
    {   useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log('database connected successfully!!'))
    .catch((error) => console.log('error', error));
}

export default dbConnect