import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        bookName:
        {
            type : String,
            required : true
        },
        author :
        {
             type : String,
             required : true,
        },
        edition :
        {
             type : Number,
             required : true,
        },
        shelf :
        {
             type : String,
             required : true,
        },
        bookid :
        {
             type : Number,
             required : true
        },
        image :
        {
             type : String,
             required : true,
        },
        state :
        {
           type : String
        },
        SID :
        {
              type : Number,
        },
        issudate:
        {
          type : Date
        },
        returndate:
        {
          type : Date
        }
    }
);

const User = mongoose.model('Books',schema);
export default User;