import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        emailx:
        {
            type : String,
            required : true
        },
        email:
        {
            type : String,
            required : true
        },
        firstname :
        {
             type : String,
             required : true,
        },
        lastname :
        {
             type : String,
             required : true,
        },
        city :
        {
             type : String,
             required : true,
        },
        phonenum :
        {
             type : Number,
             required : true
        },
        SID :
        {
             type : Number,
             required : true
        }
    }
);

const User = mongoose.model('LibraryCard',schema);
export default User;