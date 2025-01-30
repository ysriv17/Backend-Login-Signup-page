const express = require("express");
const session = require("express-session");
const passport = require("passport");
const googleSchema = require("../model/googlesignupmodel")
const OAuth2Stategy = require("passport-google-oauth20").Strategy
const Clientid = process.env.CLIENT_ID
const ClientSecret = process.env.CLIENT_SECRET
const app = express();
const MongoStore = require('connect-mongo');
const sessionStorage = MongoStore.create({ mongoUrl: process.env.CONNECTION_STRING ,collectionName : "session"})

////////////// setup passport //////////////////////
app.use(passport.initialize());
app.use(passport.session());
passport.use(
    new OAuth2Stategy(
        {
            clientID: Clientid,
            clientSecret: ClientSecret,
            callbackURL: "http://localhost:3001/user/google-signup/callback",
            scope: ["profile", "email"],
            passReqToCallback: true
        },
        async (request, accessToken, refreshToken, Profile, done) => {
            try {

                let user = await googleSchema.findOne({ googleId: Profile.id })
                if (!user) {
                    await googleSchema.create({
                        googleId: Profile.id,
                        name: Profile.displayName,
                        email: Profile.emails[0].value,
                    })
                }
                console.log(Profile, "wdeadcweccewcw")
                return done(null, Profile)
            } catch (errr) {
                console.log(Profile, "wdeadcwedssdsdsdsdccewcw im at err")
                return done(null, errr)
            }
        }
    )
)

passport.serializeUser((user, done) => {
    process.nextTick(function () {
        return done(null, {
            id: user.id,
            username: user.username,
        });
    });
    console.log(user)
})
passport.deserializeUser((user, done) => {
    process.nextTick(function () {
        return done(null, user);
    });
    console.log(user)
})