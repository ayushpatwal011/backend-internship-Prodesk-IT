import mongoose from "mongoose";

 export function dbConnection ( ) {
    mongoose.connect(process.env.MONGO_DB_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error(err));
}