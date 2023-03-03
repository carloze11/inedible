const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    googleId: { type: String },
    displayName: { type: String, required: true },
    image: { type: String },
    // username: { type: String, required: true, unique: true },
    // password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

//Password hash middleware
UserSchema.pre("save", function save(next) {
    const user = this;
    if (!user.isModified("password")) {
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});

//Helper method for validating user's passwords

UserSchema.methods.comparePassword = function comparePassword(
    candidatePassword,
    cb
) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        cb(err, isMatch);
    });
};

UserSchema.plugin(passportLocalMongoose);
UserSchema.plugin(findOrCreate);

module.exports = mongoose.model("User", UserSchema);
