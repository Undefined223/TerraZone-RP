const express = require("express");
const router = express.Router();
const {
    registerUser,
    authUser,
    allUsers,
    getAllUsers,
    editUser,
    forgotPassword,
    resetPassword
} = require("../controllers/user.controller");

router.route("/").post(registerUser);
router.post("/login", authUser);
router.post("/recovery", forgotPassword);
router.post('/resetpassword/:token', resetPassword);

module.exports = router;
