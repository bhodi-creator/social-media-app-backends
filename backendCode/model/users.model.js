const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: String,     // Change 'username' to 'name'
    email: {
        type: String,
        unique: true   // Ensure uniqueness for email
    },
    gender: String,
    password: String  // Keep 'pass' as 'password'
}, {
    versionKey: false
});

const UserModel = mongoose.model("User", userSchema);

module.exports = {
    UserModel
};
