import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        googleId: String,
        email :
        {
             type : String,
             required : true,
             unique :true
        },
        role :
        {
            type : String,
            default : "student"
        }
    }
);

const User = mongoose.model('GoogleSignup',schema);
export default User;