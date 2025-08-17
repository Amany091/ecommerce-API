const GoogleStrategy = require("passport-google-oauth20").Strategy;
const Client = require("../models/client")

module.exports = function (passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.BASE_URL}/api/v1/auth/google/callback`,
    },
        async (profile, done) => {
            const newUser = {
                userId: profile.id,
                displayName: profile.displayName,
                // email: profile.emails[0].value,
                image: profile.photos[0].value,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName
            }
            try {
                let user = await Client.findOne({ userId: profile.id })
                if (user) {
                    done(null, user)
                } else {
                    user = await Client.create(newUser)
                    done(null, user)
                }
            } catch (error) {
                console.log(error)
            }
        }
    ))
    passport.serializeUser((user, done) => {
        done(null, user);
    })

    passport.deserializeUser((id, done) => {
        Client.findById(id, (err, user) => {
            done(err, user);
        })
    })
}