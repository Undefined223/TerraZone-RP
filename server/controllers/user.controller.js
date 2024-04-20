const { User } = require("../models/user.Model");
const asyncHandler = require("express-async-handler");
const path = require('path');
const nodemailer = require('nodemailer');


const generateToken = require("../config/generateToken");
const jwt = require('jsonwebtoken');


const generateResetToken = (userId) => {
    const payload = { userId };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Base64 encode the token and remove padding characters ('=')
    const encodedToken = Buffer.from(token).toString('base64').replace(/=/g, '');

    return encodedToken;
};


const sendPasswordRecoveryEmail = async (email, token) => {
    // Create nodemailer transporter
    const transporter = nodemailer.createTransport({
        // Set your email service provider configuration here
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.APP_USER,
            pass: process.env.APP_PASS
        }
    });

    // Email content
    const mailOptions = {
        from: process.env.APP_USER,
        to: email,
        subject: 'Password Recovery',
        html: `
            <p>You have requested a password reset.</p>
            <p>Click <a href='${process.env.BASE_URL}/resetpassword/${token}' >here</a> to reset your password.</p>
        `
    };

    // Send email
    await transporter.sendMail(mailOptions);
};



const forgotPassword = asyncHandler(async (req, res) => {
    console.log(req.body)
    const { email } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }

    // Generate reset token
    const resetToken = generateResetToken(user._id);

    // Save the reset token in the user document
    user.resetToken = resetToken;
    await user.save();

    // Send password recovery email
    await sendPasswordRecoveryEmail(email, resetToken);

    res.status(200).json({ message: 'Password recovery email sent successfully' });
});

const resetPassword = asyncHandler(async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    try {
        // Decode the token to get the original JWT token
        const decodedToken = Buffer.from(token, 'base64').toString();

        // Verify the decoded token
        jwt.verify(decodedToken, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(400).json({ message: 'Invalid token' });
            }

            const { userId } = decoded;

            // Find user by user ID
            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Update user's password
            user.password = newPassword;
            user.resetToken = null; // Reset the reset token after password change
            await user.save();

            res.status(200).json({ message: 'Password updated successfully' });
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});




const registerUser = asyncHandler(async (req, res) => {
    // Process user registration data
    console.log("Request Body:", req.body);
    console.log("File:", req.file);

    const { name, email, password, role } = req.body;
    const pic = req.file;
    if (!pic) {
        return res.status(400).json({ message: 'Profile picture is required.' });
    }

    // Validation and user existence checks

    if (pic) {
        // Allowed file extensions
        const allowedFileTypes = /jpeg|jpg|png|gif/;

        // Check the file extension
        const extname = allowedFileTypes.test(path.extname(pic.originalname).toLowerCase());

        // Check the mime type
        const mimetype = allowedFileTypes.test(pic.mimetype);

        if (!(extname && mimetype)) {
            return res.status(400).json({ message: 'Only image files (jpeg, jpg, png, gif) are allowed!' });
        }

        picData = {
            data: pic.path,
            contentType: pic.mimetype,
        };
    }

    try {
        const user = await User.create({
            name,
            email,
            password,
            pic: picData,
            role: role
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: picData,
            role: user.role,
            token: generateToken(user._id),
        });
        console.log(user)
    } catch (error) {
        // Handle database-related errors
        console.error(error);
        res.status(500).json({ message: 'Error creating user' });
        console.error("Error:", error);
        console.log("Response:", error.response);
    }
});



const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            role: user.role,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error("Invalid Email or Password");
    }
});

const allUsers = asyncHandler(async (req, res) => {
    const keyword = req.query.search
        ? {
            $or: [
                { name: { $regex: req.query.search, $options: "i" } },
                { email: { $regex: req.query.search, $options: "i" } },
            ],
        }
        : {};

    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(users);
});

module.exports = { allUsers, registerUser, authUser, forgotPassword, resetPassword };