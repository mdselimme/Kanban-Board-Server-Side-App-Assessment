const express = require('express');
const userRouter = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserRegister = require('../models/users.models');

// Register User
userRouter.post('/register', async (req, res) => {
    try {
        // destructure properties from body 
        const { fullName, email, password } = req.body;
        // find user if exists 
        const user = await UserRegister.findOne({ email: email });
        if (user) {
            return res.status(400).send("User Already Exits. Please sign in");
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
            return res.status(201).json({ success: true, message: "Registration User Successfully.", user });
        };
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});









module.exports = userRouter;