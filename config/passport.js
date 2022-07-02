const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();

passport.use(
    new GoogleStrategy({
        callbackURL: 'auth/google/redirect',
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.SECRET
    }, (accessToken, refreshToken, profile, done) => {
        // passport callback function
    })
);