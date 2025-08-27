import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        SID :
        {
             type : Number,
             required : true,
        },
        bookName:
        {
             type : String,
             required : true
        },
        bookid :
        {
             type : Number,
             required : true,
        },
        bookstatus:
        {
          type : String,
          required : true
        },
        issudate:
        {
          type : Date,
          required : true
        },
        returndate:
        {
          type : Date,
          required : true
        }
    }
);

const User = mongoose.model('BookHistory',schema);
export default User;