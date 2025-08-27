import express from "express";
import {
    adminregistretion,signup,login,librarycard,
    cancleroomreservation,
    applyroom,returnbook,issuebook,upcomingbook,
    addbook,totalmember,
    bookhistory,rooms,returndue,recentlyreturned,
    allbooks,booksearch,deleteupcomingbook,removebook,resetpassword,
    forgotpassword,googleCallback,allbookshistory,applyroomshow,allreturndue,allbookhistory,bookdetails,
    allupcomingbooks,allbookshistoryreturned,addfavourite,removefavourite,getfavourite,addroom,enterSID,deleteroom,
    editbook,editupcomingbook,upcomingbookbookdetails,deletelibrary,getlibrary,edilibrarycard,getAllFavouriteBooksDetails,
  logout,Tester,deletesignup,deleteadmin } from "../controllers/authcontroller.js"
import passport from 'passport';

const route = express.Router();


route.post('/signup', signup);
route.post('/login', login);
route.post('/reset-password/:token',resetpassword);
route.post('/forgetPassword',forgotpassword);


route.get('/me',Tester);
route.get("/log/google",passport.authenticate("google",{scope:["profile","email"]}))
route.get("/log/google/callback",passport.authenticate('google', 
  { session: false, failureRedirect: "http://localhost:3001" }),
  googleCallback
);

export default route;