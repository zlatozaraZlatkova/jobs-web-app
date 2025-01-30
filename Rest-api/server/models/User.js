const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        match: [
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/gi,
            "Email is invalid",
        ],
    },
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minLength: [2, "Name should be at least 2 characters long"],
        maxLength: [30, "Name shouldn't contain more than 30 characters"],
        match: [
            /^[a-zA-Z0-9\s]+$/gi,
            "Username may contain only english letters and numbers",
        ],
    },
    role: {
        type: String,
        enum: ['employer', 'employee'],
        required: [true, 'Role is required'],
        default: 'employee'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    hashedPassword: { type: String, required: true },
    avatar: { type: String },
    createdPosts: {
        type: [Types.ObjectId],
        required: true,
        ref: "Post",
        default: [],
    },
    likedPostList: {
        type: [Types.ObjectId],
        required: true,
        ref: "Post",
        default: [],
    },

    

}, {timestamps: true} );

userSchema.index(
    { email: 1 },
    {
        unique: true,
        collation: {
            locale: "en",
            strength: 2,
        },
    }
);

const User = model("User", userSchema);

module.exports = User;