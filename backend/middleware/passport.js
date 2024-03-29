const keys = require("../config/keys");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

module.exports = function (passport) {
    passport.use(
        new GoogleStrategy(
            {
                clientID: keys.googleClientID,
                clientSecret: keys.googleClientSecret,
                callbackURL: "/auth/google/callback",
                proxy: true,
            },
            async (accessToken, refreshToken, profile, done) => {
                const newUser = {
                    googleId: profile.id,
                    displayName: profile.displayName,
                    image: profile.photos[0].value,
                };

                try {
                    let user = await User.findOne({ googleId: profile.id });
                    if (user) {
                        done(null, user);
                    } else {
                        user = await User.create(newUser);
                        done(null, user);
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
};
