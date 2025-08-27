import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        email :
        {
             type : String,
             required : true,
        },
        password :
        {
             type : String,
             required : true
        },
        role :
        {
            type : String,
            default : "admin"
        }
    }
);

const User = mongoose.model('adminaccount',schema);
export default User;