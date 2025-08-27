import pass from 'bcryptjs';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer';
import User from '../../Database/Models/Signup.js';
import Room from '../../Database/Models/Rooms.js';
import ApplyRoom from '../../Database/Models/ApplyRoom.js';
import Library from '../../Database/Models/LibraryCard.js';
import Sid from '../../Database/Models/StudentID.js';
import Books from '../../Database/Models/Books.js';
import BookHistory from '../../Database/Models/BookHistory.js';
import UpcomingBooks from '../../Database/Models/UpcomingBooks.js';
import AdminAccount from '../../Database/Models/AdminRegistration.js';
import FavouriteBook from '../../Database/Models/FavouriteBook.js';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


function addTime(timeStr, hoursToAdd) {
  const [hours, minutes] = timeStr.split(':').map(Number);

  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);

  date.setHours(date.getHours() + hoursToAdd);

  const newHours = String(date.getHours()).padStart(2, '0');
  const newMinutes = String(date.getMinutes()).padStart(2, '0');

  return `${newHours}:${newMinutes}`;
}

    const generateTokens = (user) => {
    return jwt.sign(
        {
            id: user._id,
            role:user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
};

const sendEmailNotification = async (email, bookName) => {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      pool: true, // enables connection reuse
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD_APP_EMAIL,
      }
    });
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'A Book You Favourited is Now Available!',
        text: `Good news! The book " ${bookName} " that you added to your favourites is now available in the library. Hurry up before it's borrowed again!`
    };
     
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Email send error:", err);
        return res.status(500).json({ message: "Failed to send email." });
      }
      console.log("Reset link sent to email:", email);
      return res.json("Success");
    });
};

    export const adminregistretion = async (req, res) => {
    const { email, password } = req.body;
    console.log("Request body:", req.body);

    try {
        let user = await AdminAccount.findOne({ email });
        if (user) {
            // 409 Conflict - Admin with email already exists
            return res.json("exist");
        }

        let userx = await User.findOne({ email });
        if (userx) {
            // 409 Conflict - Regular user with email already exists
            return res.json("exist");
        }

        user = new AdminAccount({ email, password });
        const addhashsalt = await pass.genSalt(10);
        user.password = await pass.hash(password, addhashsalt);
        console.log("Admin saved:", user);
        await user.save();

        // 201 Created - Admin account successfully registered
        return res.status(201).json("Success");
    } catch (err) {
        console.error(err);
        // 500 Internal Server Error
        return res.status(500).json("Server Error");
    }
};

    export const signup = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);

    try {
        let user = await User.findOne({ email });
        if (user) {
            // 409 Conflict - User with email already exists
            return res.json("exist");
        }

        let userx = await AdminAccount.findOne({ email });
        if (userx) {
            // 409 Conflict - Admin with email already exists
            return res.json("exist");
        }

        user = new User({ email, password });
        const addhashsalt = await pass.genSalt(10);
        user.password = await pass.hash(password, addhashsalt);
        await user.save();

        // 201 Created - New user successfully registered
        console.log(user);
        return res.status(201).json("Success");
    } catch (err) {
        console.error(err);
        // 500 Internal Server Error
        return res.status(500).json("Server Error");
    }
};

   export const login = async (req, res) => {
    const { email, password } = req.body;
    console.log("Request body:", req.body);

    console.log("Login attempt:", email, password);

    try {
        let user = await User.findOne({ email });
        console.log("User found in User DB:", !!user);

        if (!user) {
            user = await AdminAccount.findOne({ email });
            console.log("User found in Admin DB:", !!user);
        }

        if (!user) {
            // 401 Unauthorized – Email not found in either User or Admin
            return res.json({ message: 'Invalid credentials' });
        }

        console.log("user :", user);
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password match:", isMatch);

        if (!isMatch) {
            // 401 Unauthorized – Incorrect password
            return res.json({ message: 'Invalid credentials' });
        }

        const token = generateTokens(user);
        console.log("Generated JWT:", token);

        /* res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'None', maxAge: 3600000 });*/
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,      // ⚠️ Use `true` in production with HTTPS
            sameSite: 'Lax',    // ✅ Good for local testing
            maxAge: 3600000     // 1 hour
        });

        // 200 OK – Successful login
        console.log("user Token:", token);
        return res.status(200).json({
            success: true,
            user: {
                id: user._id,
                email: user.email,
                role: user.role
            }
        });

    } catch (err) {
        console.error("LOGIN ERROR:", err);
        // 500 Internal Server Error
        return res.status(500).json({ message: 'Server Error' });
    }
};

    export const librarycard = async (req, res) => {
    const { emailx, firstname, lastname, city, phonenum, SID } = req.body;
    const _id = req.user.id;
    console.log("Request body:", req.body);

    try {
        const xl = await User.findById({ _id });
        const email = xl.email;

        const existingCardForUser = await Library.findOne({ email });
        if (existingCardForUser) {
            // 409 Conflict – User already has a library card
            return res.json("Your Account Already Have LID");
        }

        const existingCardForEmail = await Library.findOne({ emailx });
        if (existingCardForEmail) {
            // 409 Conflict – This email already has a library card
            return res.json("Email Already Have LID");
        }

        const validSID = await Sid.findOne({ SID });
        if (!validSID) {
            // 404 Not Found – SID not found in the list
            return res.json("One");
        }

        const sidAlreadyUsed = await Library.findOne({ SID });
        if (sidAlreadyUsed) {
            // 409 Conflict – SID already used by another user
            return res.json("Two");
        }

        const newCard = new Library({ emailx, email, firstname, lastname, city, phonenum, SID });
        await newCard.save();

        // 201 Created – Card successfully created
        console.log("Success:", newCard);
        return res.status(201).json("Success");
    } catch (err) {
        console.error(err);
        // 500 Internal Server Error
        return res.status(500).json("Server Error OHHH YEAH");
    }
};

    export const cancleroomreservation = async (req, res) => {
    const { SID, roomnumber } = req.body;
    console.log("Request body:", req.body);
    try {
        let room = await Room.findOne({ roomnumber });
        if (!room) {
            // 404 Not Found - Room doesn't exist
            return res.json("Room Not Found");
        }
        if (room.avilable === "YES") {
            // 409 Conflict - Room is already available, can't cancel
            return res.json("Room Already Avilable");
        }
        let apply = await ApplyRoom.findOne({ SID });
        if (!apply) {
            // 404 Not Found - Booking for the SID not found
            return res.json("Student ID Wrong");
        }
        const avilable = "YES";
        await Room.updateOne(
            { roomnumber },
            { $set: { avilable: avilable } }
        );
        await ApplyRoom.deleteOne({ SID, roomnumber });

        // 200 OK - Cancellation success
        let lm = await Room.findOne({roomnumber});
        console.log("Return: Room Reservation Deleted and updated Room Status :",lm);
        return res.status(200).json("Success");
    } catch (err) {
        console.error(err);
        // 500 Internal Server Error
        return res.status(500).json("Server Error");
    }
};

    export const applyroom = async (req, res) => {
    const { name, SID, start, endx, roomnumber, numofs, status } = req.body;
    const end = addTime(start, endx);
    console.log("Request body:", req.body);

    try {
        let library = await Library.findOne({ SID });
        if (!library) {
            // 401 Unauthorized - library card missing
            return res.json("Library Card First");
        }

        let room = await Room.findOne({ roomnumber });
        if (!room) {
            // 404 Not Found - room does not exist
            return res.json("Room Not Found");
        }

        if (room.avilable === "NO") {
            // 409 Conflict - room already booked
            return res.json("Not Avilable");
        }

        let apply = await ApplyRoom.findOne({ SID });
        if (apply) {
            // 409 Conflict - student already booked
            return res.json("Already you booked Room");
        }

        const avilable = "NO";
        apply = new ApplyRoom({ name, SID, start, end, roomnumber, numofs, status });
        await apply.save();
        console.log("Room Apply :", apply);

        await Room.updateOne({ roomnumber }, { $set: { avilable } });
        let lm = await Room.findOne({roomnumber});
        console.log("Room Update :",lm);

        // 200 OK - successful
        return res.status(200).json("Success");
    } catch (err) {
        console.error(err);
        // 500 Internal Server Error
        return res.status(500).json("Server Error");
    }
};


    export const returnbook = async (req, res) => {
    const { bookid, SID, issudate, returndate } = req.body;
    console.log("Request body:", req.body);
    try {
        let us = await BookHistory.findOne({ SID, bookid, issudate, bookstatus: "borrowed" });
        if (!us) {
            return res.json("Book Not Found");
        }

        const bookstatus = 'returned';
        const state = 'avilable';

        await BookHistory.updateOne(
            { SID, bookid, issudate,bookstatus: "borrowed" },
            {
                $set: {
                    bookstatus: bookstatus,
                    returndate: returndate
                }
            }
        );
        let mm = await BookHistory.findOne({SID,bookid,issudate})
        console.log("Updated Bookhistory:", mm);

        await Books.updateOne(
            { bookid },
            {
                $set: {
                    state: state,
                    SID: "",
                    issudate: "",
                    returndate: ""
                }
            }
        );
        let mm1 = await Books.findOne({bookid})
        console.log("Updated Book:", mm1);
        const bookdetails = await Books.findOne({ bookid });
        const favUsers = await FavouriteBook.find({ bookid });
        console.log(favUsers);
        const SIDs = favUsers.map(fav => fav.SID);

        if (SIDs.length > 0) {
            const usersToNotify = await Library.find({ SID: { $in: SIDs } });
            for (const user of usersToNotify) {
                await sendEmailNotification(user.emailx, bookdetails.bookName);
            }
        }

        return res.status(200).json("YESS");
        
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server Error' });
    }
};

  export const issuebook = async (req, res) => {
    const { bookid, SID, issudate, returndate } = req.body;
    console.log("User:", req.body);
    try {
        let us = await Books.findOne({ bookid });
        if (!us) {
            // 404 Not Found - Book ID does not exist
            return res.json("Bookid Not Found");
        }

        let uss = await Library.findOne({ SID });
        if (!uss) {
            // 401 Unauthorized - User does not have a library card
            return res.json("Dont Have Library Card");
        }

        let yy = await Books.findOne({ bookid: bookid, state: "avilable" });
        if (!yy) {
            // 409 Conflict - Book is not available
            return res.json("Book Not Avilable");
        }

        const bookName = us.bookName;
        const bookstatus = 'borrowed';
        const state = 'Not Avilable';
        const x = new BookHistory({ SID, bookName, bookid, bookstatus, issudate, returndate });
        console.log("Book History Created:", x);
        await x.save();

        await Books.updateOne(
            { bookid },
            {
                $set: {
                    state: state,
                    SID: SID,
                    issudate: issudate,
                    returndate: returndate
                }
            }
        );

        // 200 OK - Book issued successfully
        return res.json("YESS");
    } catch (err) {
        console.error('Problem in Issue Book:', err);
        // 500 Internal Server Error
        return res.status(500).json({ message: 'Server Error' });
    }
};

    export const upcomingbook = async (req, res) => {
    const id = uuidv4();
    const bookNam = req.body.bookNam;
    const edition = req.body.edition;
    const bookid = req.body.bookid;
    const arrivaldate = req.body.arrivaldate;
    const image = req.file.filename;
    console.log("User:", req.body);


    try {
        const bookName = bookNam.toLowerCase();

        let us = await UpcomingBooks.findOne({ bookid });
        if (us) {
            // 409 Conflict - Book already in upcoming list
            return res.json("Book Already In Upcoming List");
        }

        let yy = await Books.findOne({ bookid });
        if (yy) {
            // 409 Conflict - Book already in library
            return res.json("Book Already In Library");
        }

        const x = new UpcomingBooks({ bookName, edition, bookid, arrivaldate, image });
        console.log("Data:", x);
        await x.save();

        // 200 OK - Book added to upcoming list successfully
        return res.status(200).json("YESS");
    } catch (err) {
        console.error('Problem in Listing', err);
        // 500 Internal Server Error
        return res.status(500).json({ message: 'Server Error' });
    }
};
    
export const addbook = async (req, res) => {
    const id = uuidv4();
    const bookNam = req.body.bookNam;
    const author = req.body.author;
    const edition = req.body.edition;
    const shelf = req.body.shelf;
    const bookid = req.body.bookid;
    const image = req.file.filename;
    console.log("User:", req.body);

    try {
        let user = await Books.findOne({ bookid });
        if (user) {
            // 409 Conflict - Book already exists
            return res.json("Book Already Exist");
        }

        const state = 'avilable';
        const bookName = bookNam.toLowerCase();
        user = new Books({ bookName, author, edition, shelf, bookid, image, state });
        console.log("Data:", user);
        await user.save();

        // 200 OK - Book added successfully
        return res.status(200).json("Success");
    } catch (err) {
        console.error(err);
        // 500 Internal Server Error
        return res.status(500).json({ message: 'Server Error' });
    }
};
    export const totalmember = async (req, res) => {
    try {
        const data = await User.find().sort({ bookid: 1 });
        console.log("Get DATA:", data);
        return res.status(200).json({ status: "ok", data: data });
    } catch (err) {
        console.error(err);
        // 500 Internal Server Error
        return res.status(500).json({ message: 'Server Error' });
    }
};

  export const bookhistory = async (req, res) => {
  const _id = req.user.id;
  console.log("User:", _id);

  try {
    const user = await User.findById(_id);
    const email = user?.email;
    const library = await Library.findOne({ email });

    if (!library) {
      // 200 OK - No library found, return empty data
      return res.status(200).json({ status: "ok", data: [] });
    }

    const SID = library.SID;
    const data = await BookHistory.find({ SID });
    console.log("Data:", data);

    // 200 OK - Return book history data
    return res.status(200).json({ status: "ok", data });
  } catch (err) {
    console.error("Problem get all data:", err);
    // 500 Internal Server Error
    return res.status(500).json({ message: "Server Error" });
  }
};


    export const rooms = async (req, res) => {
    try {
        let data = await Room.find({}).sort({ roomnumber: 1 });
        console.log(data);
        // 200 OK - Success
        return res.status(200).json({ status: "ok", data: data });
    } catch (err) {
        console.error('Problem get all data', err);
        // 500 Internal Server Error
        return res.status(500).json("Server Error");
    }
};

    export const returndue = async (req, res) => {
    const _id = req.user.id;
    console.log("User:", _id);

    try {
        let xl = await User.findById({ _id });
        const email = xl.email;
        let xc = await Library.findOne({ email });
        if (!xc) {
            // 200 OK - No library found, return empty array
            return res.status(200).json([]);
        }
        const SID = xc.SID;
        let x = await BookHistory.findOne({ SID });
        if (!x) {
            // 200 OK - No book history found, return empty array
            return res.status(200).json([]);
        }
        let xy = await BookHistory.findOne({ SID: SID, bookstatus: 'borrowed' });
        if (!xy) {
            // 200 OK - No borrowed books found, return empty array
            return res.status(200).json([]);
        }
        const data = await BookHistory.find({ SID: SID, bookstatus: 'borrowed' }).sort({ bookid: 1 });

        // 200 OK - Return borrowed book data
        console.log("Data:", data);
        return res.status(200).json({ status: "ok", data: data });
    } catch (err) {
        console.error('Problem get all data', err);
        // 500 Internal Server Error
        return res.status(500).json({ message: 'Server Error' });
    }
};

    export const recentlyreturned = async (req, res) => {
    const _id = req.user.id;
    console.log("User:", _id);

    try {
        let xl = await User.findById({ _id });
        const email = xl.email;
        let xc = await Library.findOne({ email });
        if (!xc) {
            // 200 OK - No library found, return empty array
            return res.status(200).json([]);
        }
        const SID = xc.SID;
        let xy = await BookHistory.findOne({ SID: SID, bookstatus: 'returned' });
        if (!xy) {
            // 200 OK - No returned books found, return empty array
            return res.status(200).json([]);
        }
        const xx = await BookHistory.find({ SID: SID, bookstatus: 'returned' }).sort({ returnedDate: -1 });
        // 200 OK - Return recently returned books data
        console.log("Data:", xx);
        return res.status(200).json(xx);
    } catch (err) {
        console.error('Problem get all data', err);
        // 500 Internal Server Error
        return res.status(500).json({ message: 'Server Error' });
    }
};

    export const allbooks = async (req, res) => {
    try {
        const data = await Books.find({});
        // 200 OK with data
        console.log("Data:", data);
        return res.status(200).send({ status: "ok", data: data });
    } catch (err) {
        console.error('Problem get all data', err);
        // 500 Internal Server Error
        return res.status(500).json({ message: 'Server Error' });
    }
};

   export const booksearch = async (req, res) => {
    const bookNam = req.params.bookNam;
    console.log("User:", bookNam);

    try {
        const xx = await Books.find({
            bookName: { $regex: bookNam, $options: 'i' }
        });

        if (xx.length === 0) {
            // 404 Not Found - no matching books
            return res.json("No");
        }

        // 200 OK - return found books
        console.log("Data:", xx);
        return res.status(200).json({ xx });
    } catch (err) {
        console.error(err);
        // 500 Internal Server Error
        return res.status(500).send('Server Error OHHH YEAH');
    }
};

    export const deleteupcomingbook = async (req, res) => {
    const { bookid, edition } = req.body;
    console.log("User:", req.body);
    try {
        let user = await UpcomingBooks.findOne({ edition, bookid });
        console.log("the data:", user);
        if (!user) {
            console.log(edition, bookid);
            // 404 Not Found
            return res.json("Book Didnt Found");
        }
        await UpcomingBooks.deleteOne({ edition, bookid });
        console.log("Book Deleted");
        // 200 OK
        return res.status(200).json("Deleted");
    } catch (err) {
        console.error(err);
        // 500 Internal Server Error
        return res.status(500).json({ message: 'Server Error' });
    }
};

   export const removebook = async (req, res) => {
    const { bookid } = req.body;
    console.log("User:", req.body);
    try {
        let user = await Books.findOne({ bookid });
        console.log("Book:", user);
        if (!user) {
            // 404 Not Found
            return res.json("Book Didnt Found");
        }
        if (user.state === 'Not Avilable') {
            // 409 Conflict
            return res.json("Someone Borrowed The Book, Return It First");
        }
        await BookHistory.deleteMany({ bookid });
        await FavouriteBook.deleteMany({ bookid });
        await Books.deleteOne({ bookid });
        console.log("Book deleted from Bookhistory, Favourite List and From Books");
        // 200 OK
        return res.status(200).json("Deleted");
    } catch (err) {
        console.error('Problem in Delete', err);
        // 500 Internal Server Error
        return res.status(500).json({ message: 'Server Error' });
    }
};

    export const resetpassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { passer: newPassword } = req.body;
        let decodedToken;
        console.log("User:", token);
        try {
            decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return res.status(401).json({ message: "Invalid or expired token." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        const userId = decodedToken.userId;
        let user = await User.findById(userId);
        if (user) {
            console.log("User:", user);
            user.password = hashedPassword;
            await user.save();
            console.log("User Updated:", user);
            return res.status(200).json({ message: "Password updated successfully." });
        }
        user = await AdminAccount.findById(userId);
        if (user) {
            console.log("User:", user);
            user.password = hashedPassword;
            await user.save();
            console.log("User Updated:", user);
            return res.status(200).json({ message: "Password updated successfully." });
        }
        return res.status(404).json({ message: "No user found with provided token." });

    } catch (err) {
        console.error("Reset password error:", err);
        return res.status(500).json({ message: "Server error. Please try again later." });
    }
};

export const forgotpassword = async (req, res) => {
  const { email } = req.body;
  console.log("User email input:", email);

  try {
    // Find user in either User or Admin collection
    let user = await User.findOne({ email });
    if (!user) {
      user = await AdminAccount.findOne({ email });
      if (!user) {
        return res.json("No"); // Email not found
      }
    }

    // Generate token for reset link
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "10m" }
    );

    // Configure the transporter with SMTP pooling
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      pool: true, // enables connection reuse
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD_APP_EMAIL,
      }
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Reset Password",
      html: `
        <h1>Reset Your Password</h1>
        <p>Click the link below to reset your password:</p>
        <a href="https://rhombus-tnso.onrender.com/reset-password/${token}">
          https://rhombus-tnso.onrender.com/reset-password/${token}
        </a>
        <p>This link will expire in 10 minutes.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `
    };

    // Send the email
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Email send error:", err);
        return res.status(500).json({ message: "Failed to send email." });
      }
      console.log("Reset link sent to email:", email);
      return res.json("Success");
    });

  } catch (err) {
    console.error("Forgot password error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};


   export const googleCallback = async (req, res) => {
  try {
    const userx = req.user;
    console.log("User:", userx);

    // Check for User
    const user = await User.findOne({ email: userx.email });
    if (user) {
      const token = generateTokens(user);

      res.cookie('token', token, {
        httpOnly: true,
        secure: true,       // Use true in production
        sameSite: 'Lax',
        maxAge: 3600000,
      });

      console.log("User Logged In, Token:", token);
      return res.redirect("https://rhombus-tnso.onrender.com/google-success");
    }

    // Check for Admin
    const admin = await AdminAccount.findOne({ email: userx.email });
    if (admin) {
      const token = generateTokens(admin);

      res.cookie('token', token, {
        httpOnly: true,
        secure: true,       // Use true in production
        sameSite: 'Lax',
        maxAge: 3600000,
      });

      console.log("Admin Logged In, Token:", token);
      return res.redirect("https://rhombus-tnso.onrender.com/google-success");
    }

    // If neither user nor admin found, send 401
    return res.json({ message: 'No account linked with this Google account' });

  } catch (err) {
    console.error(err);

    // Only send this error response if no other response has been sent yet
    if (!res.headersSent) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};


export const allbookshistory = async(req,res)=>
        {
            try
            {
                const data = await BookHistory.find({}).sort({ _id: -1 });
                console.log("Data", data );
                res.send({ status: "ok", data: data });
            }
            catch(err)
            {
                console.error('Problem get all data');
                res.status(500).json(
                    {
                        message : 'Server Error'
                    }
                );
            }
        };

export const applyroomshow = async(req,res)=>
            {
                try
                {
                    let data = await ApplyRoom.find({}).sort({roomnumber: 1 });
                    console.log(data);
                    res.send({ status: "ok", data: data });
                }
                catch(err)
                {
                    console.error('Problem get all data',err);
                    res.status(500).json("Server Error");
                }
            };

export const allreturndue = async(req,res)=>
        {
        try
        {

            let xy = await BookHistory.findOne({bookstatus : 'borrowed'});
            if(!xy)
            {
                return res.json("All Books Returned");
            }
            const data = await BookHistory.find({bookstatus : 'borrowed'}).sort({bookid: 1 });
            console.log(data);
            res.send({ status: "ok", data: data });
        }
        catch(err)
        {
            console.error('Problem get all data');
            res.status(500).json(
                {
                    message : 'Server Error'
                }
            );
        }
        };
export const allbookhistory = async(req,res)=>
        {
        try
        {
            const data = await BookHistory.find().sort({bookid: 1 });
            console.log(data);
            res.send({ status: "ok", data: data });
        }
        catch(err)
        {
            console.error('Problem get all data');
            res.status(500).json(
                {
                    message : 'Server Error'
                }
            );
        }
        };
export const bookdetails = async (req, res) => {
  try {
    const bookid=req.params.id;
    console.log("bookid", bookid);
    const data = await Books.findOne({bookid})
    if (!data) return res.send("NO");
    console.log(data);
    res.send({ status: "ok", data: data });
  } catch (error) {
    console.error("Error fetching book:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const allupcomingbooks = async(req,res)=>
        {
            try
            {
                const data = await UpcomingBooks.find({});
                console.log(data);
                 res.send({ status: "ok", data: data });
            }
            catch(err)
            {
                console.error('Problem get all data');
                res.status(500).json(
                    {
                        message : 'Server Error'
                    }
                );
            }
        };
export const allbookshistoryreturned = async(req,res)=>
        {
        try
        {
            const data = await BookHistory.find({bookstatus : 'returned'}).sort({returndate: -1 });
            console.log(data);
            res.send({ status: "ok", data: data });
        }
        catch(err)
        {
            console.error('Problem get all data');
            res.status(500).json(
                {
                    message : 'Server Error'
                }
            );
        }
        };

export const addfavourite = async(req,res)=>
        {
            const _id = req.user.id;
            const {id} = req.body;
            const bookid=id;
            console.log(bookid);
        try
        {
            let xl= await User.findById({_id});
            const email = xl.email;
            let xc = await Library.findOne({email});
            if(!xc)
            {
                return res.json("Need Library ID")
            }
            const SID = xc.SID;
            let uss = await Library.findOne({SID});
            if(!uss)
                {
                    return res.json("Dont Have Library Card");
                }
            let ux = await FavouriteBook.findOne({SID,bookid});
            if(!ux)
                {
                    const x = new FavouriteBook({SID,bookid});
                    await x.save();
                    console.log(x);
                    return res.json("Added in Favourite List");
                }
                return res.json("Book Already in Favourite List");
        }
        catch(err)
        {
            console.error('Problem in Favourite',err);
            res.status(500).json(err);
        }
        };
export const removefavourite = async(req,res)=>
        {
           const _id = req.user.id;
            const {id} = req.body;
            const bookid=id;
            console.log(bookid);
        try
        {
            let xl= await User.findById({_id});
            const email = xl.email;
            let xc = await Library.findOne({email});
            if(!xc)
            {
                return res.json("Need Library ID")
            }
            const SID = xc.SID;
            let uss = await FavouriteBook.findOne({SID,bookid});
            if(!uss)
                {
                    return res.json("Dont Have in List");
                }
            await FavouriteBook.deleteOne({SID,bookid})
            console.log("YES Removed From Favourite List");
            return res.json("YES Removed From Favourite List");
        }
        catch(err)
        {
            console.error('Problem in Favourite',err);
            res.status(500).json(err);
        }
        };

export const getfavourite = async(req,res)=>
        {
            const _id = req.user.id;
            const bookid=req.params.id;
            console.log(bookid);
        try
        {
            let xl= await User.findById({_id});
            const email = xl.email;
            console.log(email);
            let xc = await Library.findOne({email});
            console.log(xc);
            if(!xc)
            {
                return res.json("Nope")
            }
            const SID = xc.SID;
            console.log(SID)
            console.log(bookid)
            let uss = await FavouriteBook.findOne({SID,bookid});
            console.log(uss)
            if(!uss)
                {
                    return res.json("NO");
                }
            res.json("YES");
        }
        catch(err)
        {
            console.error('Problem in Favourite',err);
            res.status(500).json(err);
        }
        };

    export const addroom = async(req,res)=>
        {
             const {roomnumber}= req.body;
             console.log(req.body);
        try
        {
            let user = await Room.findOne({roomnumber});
            if(user)
            {
                return res.json("Book Already Exist");
            }
            const avilable = 'YES';
            const userx = new Room({roomnumber,avilable});
            await userx.save();
            console.log(userx);
            res.json("Success");
        } 
        catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
        };

    export const enterSID = async(req,res)=>
        {
             const {SID}= req.body;
             console.log(req.body);
        try
        {
            let user = await Sid.findOne({SID});
            if(user)
            {
                return res.json("SID Already Exist");
            }
            const userx = new Sid({SID});
            await userx.save();
            console.log(userx);
            res.json("Success");
        }
        catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
        };
     export const deleteroom = async(req,res)=>
        {
            const {roomnumber}= req.body;
            console.log(req.body);
            try
            {
                let room = await Room.findOne({roomnumber});
                console.log(room);
                if(!room)
                {
                    return res.json("Room Not Found");
                }
                let room2 = await ApplyRoom.findOne({roomnumber});
                console.log(room2);
                if(room2)
                {
                    return res.json("Room Is Booked")
                }
                await Room.deleteOne({roomnumber})
                console.log("Room Deleted");
                return res.json("Success")
            }
            catch (err) {
                console.error(err);
                res.status(500).send('Server Error');
            }
        };

    export const editbook = async (req, res) => {
  const {
    bookNam,
    author,
    edition,
    shelf,
    bookid,
    _id
  } = req.body;
  console.log(req.body);

  let image;

  try {
    const existingBook = await Books.findOne({ _id });
    console.log("BOOK",existingBook);

    if (!existingBook) {
      return res.json("Book Doesn't Exist");
    }

    if (req.file) {
      if (existingBook.image) {
        const oldImagePath = path.join(__dirname, "../../front/public/uploads", existingBook.image);
        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.error("Failed to delete old image:", err);
          } else {
            console.log("Old image deleted:", existingBook.image);
          }
        });
      }
      image = req.file.filename;
    } else {
      image = existingBook.image; // keep existing image if no new one
    }

    const bookName = bookNam.toLowerCase();
    const oldBookId = existingBook.bookid;
    const newBookIdNum = Number(bookid);
    const oldBookName = existingBook.bookName;

    // ✅ If book ID or name changed, check for duplicates and update history
    if (oldBookId !== newBookIdNum || oldBookName !== bookName) {
      if (oldBookId !== newBookIdNum) {
  const idTaken = await Books.findOne({ bookid: newBookIdNum });
  if (idTaken) {
    return res.json("Book ID Already Assigned To Other Book");
  }
}

      const borrowed = await BookHistory.findOne({
        bookid: oldBookId,
        bookstatus: 'borrowed'
      });

      if (borrowed) {
        await BookHistory.updateOne(
          { bookid: oldBookId, bookstatus: 'borrowed' },
          {
            $set: {
              bookName: bookName,
              bookid: bookid
            }
          }
        );
      }
    }
    await Books.updateOne(
      { _id },
      {
        $set: {
          bookName: bookName,
          author: author,
          edition: edition,
          shelf: shelf,
          bookid: bookid,
          image: image
        }
      }
    );

    const existingBook2 = await Books.findOne({ _id });
    console.log("Upadated BOOK",existingBook2);
    res.json("Success");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
        };
    export const editupcomingbook = async (req, res) => {
  const {
    bookNam,
    edition,
    bookid,
    arrivaldate,
    _id
  } = req.body;
    console.log(req.body);

  let image;

  try {
    const existingBook = await UpcomingBooks.findOne({ _id });
    console.log("BOOK",existingBook);

    if (!existingBook) {
      return res.json("Book Doesn't Exist");
    }

    if (req.file) {
      if (existingBook.image) {
        const oldImagePath = path.join(__dirname, "../../front/public/uploads", existingBook.image);
        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.error("Failed to delete old image:", err);
          } else {
            console.log("Old image deleted:", existingBook.image);
          }
        });
      }
      image = req.file.filename;
    } else {
      image = existingBook.image;
    }

    const bookName = bookNam.toLowerCase();
    const oldBookId = existingBook.bookid;
    const newBookIdNum = Number(bookid);

      if (oldBookId !== newBookIdNum) {
  const idTaken = await UpcomingBooks.findOne({ bookid: newBookIdNum });
  if (idTaken) {
    return res.json("Book ID Already Assigned To Other Book");
  }
  const idTaken2 = await Books.findOne({ bookid: newBookIdNum });
  if (idTaken2) {
    return res.json("Book ID Already Assigned To Other Book");
  }
}

    await UpcomingBooks.updateOne({ _id },
      {
        $set: {
          bookName: bookName,
          edition: edition,
          bookid: bookid,
          arrivaldate: arrivaldate,
          image: image
        }
      }
    );
    const existingBook2 = await UpcomingBooks.findOne({ _id });
    console.log("BOOK",existingBook2);
    res.json("Success");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
        };
    export const upcomingbookbookdetails = async (req, res) => {
  try {
    const bookid=req.params.id;
    const data = await UpcomingBooks.findOne({bookid})
    if (!data) return res.send("NO");
    res.send({ status: "ok", data: data });
  } catch (error) {
    console.error("Error fetching book:", error);
    res.status(500).json({ message: "Server error" });
  }
};
    export const deletelibrary = async(req,res)=>
        {
            const {SID}= req.body;
    console.log(req.body);
            try
            {
                let room = await Library.findOne({SID});
                if(!room)
                {
                    return res.json("Library ID Not Found");
                }
                let apply =  await ApplyRoom.findOne({SID});
                if(apply)
                    {
                        const roomnumber=apply.roomnumber;
                        const avilable = 'YES';
                        await ApplyRoom.deleteOne({SID});
                        await Room.updateOne({roomnumber},
                        {
                            $set: {
                            avilable:avilable
                            }
                        }
                        );
                    }
                const books = await BookHistory.find({ SID });
                if (books.length > 0) {

                    for (const book of books) {
                        const { bookid, bookstatus } = book;
                        const state = 'avilable';
                        if(bookstatus==='borrowed'){
                            await Books.updateOne({ bookid },
                            {
                                $set: {
                                  state:state
                                }
                            }
                        );
                        }
                    }
                    await BookHistory.deleteMany({ SID });
                }
                await Library.deleteOne({SID})
                console.log("Deleted Everything Related to The Library In Bookhistory, Apply Room , Room Updated and Deleted The Library Card");
                return res.json("Deleted")
            }
            catch (err) {
                console.error(err);
                res.status(500).send('Server Error');
            }
        };
    export const getlibrary = async (req, res) => {
        const _id = req.user.id;
        console.log(_id);
  try {
    let xl= await User.findById({_id});
            const email = xl.email;
            let data = await Library.findOne({email});
            if (!data) return res.send("NO");
            console.log(data);
    res.send({ status: "ok", data: data });
  } catch (error) {
    console.error("Error fetching book:", error);
    res.status(500).json({ message: "Server error" });
  }
};
    export const edilibrarycard = async (req, res) => {


    const {emailx,firstname,lastname,city,phonenum,SID} = req.body;
    console.log(req.body);

  try {
    const existingBook = await Library.findOne({ SID });
    console.log("Before :",existingBook);
    if (!existingBook) {
      return res.json("Library Card Doesn't Exist");
    }

    await Library.updateOne({ SID },
      {
        $set: {
          emailx:emailx,
          firstname:firstname,
          lastname:lastname,
          city:city,
          phonenum:phonenum,
        }
      }
    );
    const existingBook2 = await Library.findOne({ SID });
    console.log("After :",existingBook2);
    res.json("Success");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
        };
    export const getAllFavouriteBooksDetails = async (req, res) => {
        const _id = req.user.id;
    console.log(_id);

  try {
    let xl= await User.findById({_id});
            const email = xl.email;
            console.log(email);
            let xc = await Library.findOne({email});
            if(!xc){
                return res.json([]);
            }
            const SID = xc.SID;
            console.log(SID);
    const favouriteBooks = await FavouriteBook.find({ SID });
    if (favouriteBooks.length === 0) {
      return res.json([]);
    }

    const bookIds = favouriteBooks.map((fav) => fav.bookid);
    const booksDetails = await Books.find({ bookid: { $in: bookIds } });
    console.log(booksDetails);
    res.json(booksDetails);
  } catch (err) {
    console.error('Error fetching favourite books details:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
export const logout = (req, res) => {
  // Cookie options for local dev and production
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',  // true in prod, false locally
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
    path: '/',  // Important: must match path used by express-session
  };


  res.clearCookie('token', cookieOptions);

 
  res.clearCookie('connect.sid', cookieOptions);

  if (req.isAuthenticated && req.isAuthenticated()) {
    req.logout(err => {
      if (err) {
        console.error('Logout error:', err);
        return res.status(500).json({ message: 'Logout failed' });
      }
      req.session.destroy(err => {
        if (err) {
          console.error('Session destroy error:', err);
          return res.status(500).json({ message: 'Logout failed' });
        }
        console.log('Logged out from Website' );
        return res.json({ success: true, message: 'Logged out from Website' });
      });
    });
  } else {
    console.log('Logged out from Website' );
    return res.json({ success: true, message: 'Logged out from Website' });
  }
};

export const Tester = (req, res) => {
  console.log("Cookies:", req.cookies); // ✅ Add this
  const token = req.cookies?.token;

  if (!token) {
    return res.json({ message: "No token, authorization denied" });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    return res.json({ user });
  } catch (err) {
    return res.json({ message: "Token is not valid" });
  }
};
export const deletesignup = async(req,res)=>
        {
            const {email}= req.body;
            console.log(req.body);
            try
            {
                let room = await User.findOne({email});
                console.log("User :",room)
                if(!room)
                {
                    return res.json("Student Account Not Found");
                }
                let apply =  await Library.findOne({email});
                if(apply)
                    {
                        const SID = apply.SID;
                        let applystatus= await ApplyRoom.findOne({SID});
                        if(applystatus)
                        {
                            return res.json("Student Applyed For Room")
                        }
                        let BookBorrowed= await BookHistory.findOne({SID : SID ,bookstatus : 'borrowed'})
                        if(BookBorrowed)
                        {
                            return res.json("Student Borrowed A Book")
                        }
                        await FavouriteBook.deleteMany({ SID })
                        await BookHistory.deleteMany({SID});
                        await Library.deleteOne({SID});
                    }
                await User.deleteOne({email})
                console.log("Student Account Deleted")
                return res.json("Student Account Deleted")
            }
            catch (err) {
                console.error(err);
                res.status(500).send('Server Error');
            }
        };
export const deleteadmin = async(req,res)=>
        {
            const {email}= req.body;
            console.log(req.body)
            try
            {
                let room = await AdminAccount.findOne({email});
                console.log("User :",room)

                if(!room)
                {
                    return res.json("Admin Account Not Found");
                }
                await AdminAccount.deleteOne({email})
                console.log("Admin Account Deleted")
                return res.json("Admin Account Deleted")
            }
            catch (err) {
                console.error(err);
                res.status(500).send('Server Error');
            }
        };


export default {
    adminregistretion,signup,login,librarycard,cancleroomreservation,
    applyroom,returnbook,issuebook,upcomingbook,
    addbook,totalmember,
    bookhistory,rooms,returndue,recentlyreturned,
    allbooks,booksearch,deleteupcomingbook,removebook,resetpassword,
    forgotpassword,googleCallback,allbookshistory,applyroomshow,
    allreturndue,allbookhistory,bookdetails,
    allupcomingbooks,allbookshistoryreturned,addfavourite,
    removefavourite,getfavourite,addroom,enterSID,deleteroom,
    editbook,editupcomingbook,upcomingbookbookdetails,deletelibrary,getlibrary,
    edilibrarycard,getAllFavouriteBooksDetails,logout,Tester,deletesignup,deleteadmin };