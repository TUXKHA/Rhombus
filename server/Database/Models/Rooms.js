import mongoose, { Schema } from "mongoose";

const schema = new mongoose.Schema(
    {
        roomnumber :
        {
             type : Number,
             required : true,
        },
        avilable :
        {
             type : String,
             required : true
        }
    }
);

const User = mongoose.model('Rooms',schema);
export default User;