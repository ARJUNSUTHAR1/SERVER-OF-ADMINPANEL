const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "please provide username"]
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user",
    },
    avatar: {
        type: String,
        default:"https://i.pinimg.com/564x/05/4c/b1/054cb148f9a8ef419b55166e0ce4dd64.jpg"
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },

})

module.exports = mongoose.model("user", userSchema);
