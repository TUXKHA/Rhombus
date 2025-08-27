import express from "express";
import Token from "../middleware/authmiddleware.js";
import Role from "../middleware/rolemiddleware.js";
import multer from 'multer';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from "path";
import { v4 as uuidv4 } from 'uuid';
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
const route = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const storage = multer.diskStorage({
  
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "../../../client/public/uploads"));
    },
    filename: function (req, file, cb) {
      const uniqueId = uuidv4();
      cb(null, uniqueId  + file.originalname);
    },
});
  
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 10,
    },
    fileFilter: fileFilter,
});


route.post('/librarycard', Token, Role("student"), librarycard);
route.post('/applyroom', Token, Role("student"), applyroom);
route.post('/addfavourite', Token, Role("student"),addfavourite);
route.post('/edilibrarycard', Token, Role("student"), edilibrarycard);

route.get('/bookhistory', Token, Role("student"),bookhistory);
route.get('/returndue', Token, Role("student"),returndue);
route.get('/recentlyreturned', Token, Role("student"),recentlyreturned);
route.get('/booksearch/:bookNam', Token, Role("student"), booksearch);
route.get('/getfavourite/:id', Token, Role("student"), getfavourite);
route.get('/getlibrary', Token, Role("student"), getlibrary);
route.get('/getAllFavouriteBooksDetails', Token, Role("student"), getAllFavouriteBooksDetails);

route.delete('/removefavourite', Token, Role("student"),removefavourite);


route.post('/addroom', Token, Role("admin"), addroom);
route.post('/addsid', Token, Role("admin"), enterSID);
route.post('/returnbook', Token, Role("admin"), returnbook);
route.post('/issuebook', Token, Role("admin"), issuebook);
route.post('/adminregistretion', Token, Role("admin"), adminregistretion);
route.post('/upcomingbook', Token, Role("admin"), upload.single("image"), upcomingbook);
route.post('/addbook', Token, Role("admin"), upload.single("image") , addbook);
route.post('/editbook', Token, Role("admin"), upload.single("image") ,editbook);
route.post('/editupcomingbook', Token, Role("admin"), upload.single("image") ,editupcomingbook);

route.get('/allbookshistory', Token, Role("admin"), allbookshistory);
route.get('/allbookhistory', Token, Role("admin"), allbookshistory);
route.get('/allreturndue', Token, Role("admin"), allreturndue);
route.get('/upcomingbookdetails/:id', Token, Role("admin"), upcomingbookbookdetails);
route.get('/allbookshistoryreturned', Token, Role("admin"), allbookshistoryreturned);
route.get('/totalmember', Token, Role("admin"),totalmember);

route.delete('/removebook', Token, Role("admin"),removebook);
route.delete('/removeroom', Token, Role("admin"),deleteroom);
route.delete('/removelibrary', Token, Role("admin"),deletelibrary);
route.delete('/deleteupcomingbook', Token, Role("admin"),deleteupcomingbook);
route.delete('/deletesignup', Token, Role("admin"), deletesignup);
route.delete('/deleteadmin', Token, Role("admin"), deleteadmin);





route.post('/deletroomreservation', Token, Role("student", "admin"), cancleroomreservation);
route.post('/logout', Token, Role("student", "admin"),logout);

route.get('/book/:id', Token, Role("student", "admin"), bookdetails);
route.get('/rooms', Token, Role("student", "admin"), rooms);
route.get('/allbooks', Token, Role("student", "admin"), allbooks);
route.get('/allupcomingbooks', Token, Role("student", "admin"), allupcomingbooks);
route.get('/applyroomshow', Token, Role("student", "admin"), applyroomshow);


export default route;