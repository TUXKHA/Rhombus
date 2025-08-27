import passport from 'passport';
import {Strategy as Oauth2} from 'passport-google-oauth2';
import AdminAccount from "../../Database/Models/AdminRegistration.js"
import UUx from "../../Database/Models/Signup.js";
import dev from 'dotenv';

dev.config();

passport.serializeUser((user,done)=>{
    done(null,user)
})
passport.deserializeUser((user,done)=>{
    done(null,user)
})
passport.use(
  new Oauth2(
    {
      clientID: process.env.CLIENTID,
      clientSecret: process.env.CLIENTSECRET,
      callbackURL: "https://rhombus-tnso.onrender.com/api/auth/log/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;

        // 1. Check if admin exists
        let admin = await AdminAccount.findOne({ email });
        if (admin) {
          return done(null, admin);  // Login as admin
        }

        // 2. Check if student exists
        let user = await UUx.findOne({ email });
        if (user) {
          return done(null, user);   // Login as student
        }

        // 3. If no student or admin found, create student account
        user = new UUx({
          googleId: profile.id,
          email,
        });
        await user.save();

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);