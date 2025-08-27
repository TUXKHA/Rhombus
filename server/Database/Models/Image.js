import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        image :
        {
             type : String,
             required : true,
        }
    }
);

const User = mongoose.model('image',schema);
export default User;