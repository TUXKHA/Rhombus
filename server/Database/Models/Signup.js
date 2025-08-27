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
        password :
        {
             type : String
        },
        role :
        {
            type : String,
            default : "student"
        }
    }
);

const User = mongoose.model('SignupData',schema);
export default User;