const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const User = require('../models/Usermodel.js')


exports.registerUser = async (req, res) => {
    try {
        const { username, email } = req.body;
        const existuser = await User.findOne({ username });
        const existemail = await User.findOne({ email });
        if (existuser || existemail) {
            throw new Error("user is already exist")
        }
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedpassword;

        const newUser = new User(req.body);
        await newUser.save();

        res.send({
            success: true,
            message: "user registered sucessfully"
        })

    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        }
        )
    }

}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (user) {
            const validPassword = await bcrypt.compare(password, user.password)
            if (!validPassword) {
                throw new Error("invalid Email or password");
            }
        }
        else {
            throw new Error("user not found");
        }
        const token = jwt.sign({ userId: user._id, email: user.email }, `${process.env.SECRET}`, { expiresIn: "2h" });

        res.status(200).json({
            success: true,
            message: "login sucessfully",
            user,
            token
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
}

exports.getCurrentUser = async(req,res)=>{
    try {
        const user = await User.findById(req.body.userId);
        res.send({
            success : true,
            message : "User Fetched Successfully",
            data : user,
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        })
    }
}