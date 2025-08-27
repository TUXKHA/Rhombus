import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        SID :
        {
             type : Number,
             required : true
        }
    }
);

const User = mongoose.model('studentid',schema);
export default User;