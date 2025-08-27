import mongoose from "mongoose";

export const cc = async () =>
{
    try
    {
        const c = await mongoose.connect(process.env.Mdb);
        console.log('Connected');
    }
    catch(err)
    {
        console.log('Not Connected',err);
        process.exit(1);
    }
};