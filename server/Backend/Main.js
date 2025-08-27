import Express from 'express';
import dev from 'dotenv';
import Authroute from './Routes/authrouts.js';
import Route from './Routes/userRoutes.js';
import { cc } from '../Database/connect.js';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import "./Config/Passport.js";
import path from "path";

dev.config();
const server = Express();

server.use(Express.json());
server.use(cors({
  origin: 'https://rhombus-tnso.onrender.com', // frontend URL
  credentials: true
}));
server.use(cookieParser());
server.use(session({
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:false
}))
server.use(passport.initialize());
server.use(passport.session());
server.use("/upload",Express.static("uploads"));

server.use("/api/auth", Authroute);
server.use("/api/enter", Route);


console.log(process.env.Mdb);

import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const buildPath = path.join(__dirname, "../../client/build");

server.use(Express.static(buildPath));

server.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

server.listen(3001,()=>
{
    cc();
    console.log(`Running on Port : 3001 `);
});