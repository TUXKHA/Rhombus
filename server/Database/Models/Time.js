import mongoose, { Schema } from "mongoose";

const schema = new mongoose.Schema(
    {
        time :
        {
             type : String,
             required : true
        }
    }
);

const User = mongoose.model('Time',schema);
export default User;