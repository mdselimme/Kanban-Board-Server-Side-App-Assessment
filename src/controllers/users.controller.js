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

        // If User Not Exists 
        if (!user) {
            return res.status(400).send({ message: "Invalid Users. Please Register Account." });
        };

        // password matching with bycrypt 
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        // is password didn't match 
        if (!isPasswordMatch) {
            return res.status(400).send({ message: "Invalid Password. Please sign in with right password." });
        }

        if (user && isPasswordMatch) {
            // Access web token create 
            const accessToken = jwt.sign({ id: user._id, email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });

            // Refresh Web Token Create 
            const refreshToken = jwt.sign({ email: user.email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });

            // refresh Token assign httponly cookie 
            res.cookie('jwt', refreshToken, {
                httpOnly: true,
                sameSite: 'none', secure: true,
                maxAge: 24 * 60 * 60 * 1000
            });

            return res.status(201).json({ token: accessToken, message: "User Logged in Successfully", user: { id: user._id, name: user.fullName } });
        } else {
            return res.status(406).json({
                message: 'Invalid credentials'
            });
        }

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