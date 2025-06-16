const express = require('express');
const userRouter = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserRegister = require('../models/users.model');

// Register User
userRouter.post('/register', async (req, res) => {
    try {
        // destructure properties from body 
        const { fullName, email, password } = req.body;
        // find user if exists 
        const user = await UserRegister.findOne({ email: email });
        if (user) {
            return res.status(400).send({ message: "User Already Exits. Please sign in" });
        } else {
            // make password bycrypt hashPassword 
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            // create user 
            const user = new UserRegister({
                fullName,
                email,
                password: hashPassword
            });
            await user.save();
            return res.status(201).json({ success: true, message: "Registration User Successfully." });
        };
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

// Login User
userRouter.post('/login', async (req, res) => {
    try {
        // destructure properties from body 
        const { email, password } = req.body;
        // find user if exists 
        const user = await UserRegister.findOne({ email: email });
        console.log(user)
        if (!user) {
            return res.status(400).send({ message: "Invalid Users. Please Register Account." });
        };

        // password matching with bycrypt 
        const isMatch = await bcrypt.compare(password, user.password);

        // is password didn't match 
        if (!isMatch) {
            return res.status(400).send({ message: "Invalid Password. Please sign in with right password." });
        }
        // json web token create 
        const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '1h' });

        return res.status(201).json({ token, message: "User Logged in Successfully", user: { id: user._id, name: user.fullName } });

    } catch (error) {
        return res.status(400).json({ message: error.message });
    };
});

// LogOut User
userRouter.post('/logout', async (req, res) => {
    try {
        return res.status(200).json({ success: true, message: "User Logged Out Successfully" });

    } catch (error) {
        return res.status(400).json({ message: error.message });
    };
});









module.exports = userRouter;