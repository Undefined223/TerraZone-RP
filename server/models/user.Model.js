const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const UserRoles = {
    Admin: 'Admin',
    Player: 'Player',
};

const userSchema = mongoose.Schema(
    {
        name: { type: "String", required: true },
        email: { type: "String", unique: true, required: true },
        password: { type: "String", required: true },
        pic: {
            type: Object,
        },

        role: {
            type: String,
            enum: Object.values(UserRoles), // Enforce that role must be one of the specified values
            default: UserRoles.Player
        },
        verified:{
            type:Boolean,
            default: false,
        }
    },
    { timestaps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
    if (!this.isModified) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

module.exports = {
    User,
    UserRoles,
};