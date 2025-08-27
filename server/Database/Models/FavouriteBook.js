import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        SID :
        {
             type : Number,
        },
        bookid :
        {
             type : Number,
        }
    }
);

const User = mongoose.model('FavouriteBook',schema);
export default User;