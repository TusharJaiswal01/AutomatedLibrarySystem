import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import sendEmail from "../utils/sendmail.js"
const router = express.Router();

/* User Registration */
router.post("/register", async (req, res) => {
  try {
    // Salting and Hashing the Password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    // Create a new user object
    const newuser = new User({
      userType: req.body.userType,
      userFullName: req.body.userFullName,
      admissionId: req.body.admissionId,
      employeeId: req.body.employeeId,
      age: req.body.age,
      dob: req.body.dob,
      gender: req.body.gender,
      address: req.body.address,
      mobileNumber: req.body.mobileNumber,
      email: req.body.email,
      password: hashedPass,
      isAdmin: req.body.isAdmin,
    });

    // Save the user to the database
    const user = await newuser.save();

    // Prepare email content
    const emailContent = `
      Dear ${req.body.userFullName},

      Welcome to LibraryXauto! Your account has been created successfully. Below are your login credentials:

      Username: ${req.body.admissionId}
      Password: ${req.body.password}

      Please keep your credentials safe and secure. If you have any questions, feel free to contact us.

      Best regards,
      LibraryXauto Team
    `;

    // Send an email to the user
    await sendEmail(req.body.email, emailContent);

    // Respond with success
    res.status(200).json({
      message: "User registered successfully and email sent.",
      user,
    });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ message: "Failed to register user." });
  }
});


/* User Login */
router.post("/signin", async (req, res) => {
  try {
    console.log(req.body, "req");
    const user = req.body.admissionId
      ? await User.findOne({
          admissionId: req.body.admissionId,
        })
      : await User.findOne({
          employeeId: req.body.employeeId,
        });

    console.log(user, "user");

    !user && res.status(404).json("User not found");

    const validPass = await bcrypt.compare(req.body.password, user.password);
    !validPass && res.status(400).json("Wrong Password");

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});

export default router;
