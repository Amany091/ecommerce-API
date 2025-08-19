const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const {hostedImage} = require("../middlewares/uploadImgMiddleware")


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "User required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password required"],
        minlength: [6, "Password must be at least 6 characters"],
    },
    passwordChangedAt : Date,
    role: {
        type: String,
        enum: ["admin", "user" , "manager"],
        default: "user",
    },
    phone: String,
    profileImg: String,
    active: {
        type: Boolean,
        default: true,
    }
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
  })

hostedImage("users", userSchema, "profileImg")

const User = mongoose.model("User", userSchema);

module.exports = User;
