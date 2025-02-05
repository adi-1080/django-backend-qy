import User from "../models/user-model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import crypto from "crypto";

const register = async (req, res) => {
  try {
    const email_to_check = req.body.email;
    const userExists = await User.findOne({ email: email_to_check });

    if (userExists) {
      return res
        .status(400)
        .json({ message: `User with email ${email_to_check} already exists!` });
    }

    const hashedPass = await bcrypt.hash(req.body.password, 12);

    let user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPass,
    });

    const savedUser = await user.save();

    res.status(201).json({
      message: "User registered successfully",
      user: savedUser,
    });
  } catch (e) {
    console.error("Error during registration:", e);
    res.status(500).json({
      message: "Some error occurred",
      error: e.message,
    });
  }
};

const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "No User found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Password didn't match" });
    }

    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.json({
      message: "Login successful",
      token: token,
    });

    // Mail transporter setup
    let mailTransporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    // Email details
    let details = {
      from: process.env.EMAIL,
      to: req.body.email,
      subject: "Login on Quickyearning",
      text: `User with email ${req.body.email} just logged in`,
    };

    // Sending email
    mailTransporter.sendMail(details, (err) => {
      if (err) {
        console.log("An error occurred!", err);
      } else {
        console.log("Email has been sent!");
      }
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "An error occurred during login", error });
  }
};

const resetPassword = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) {
      return res.status(401).json({ message: "Password didn't match" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    return res
      .status(200)
      .json({ user: user, message: "Password reset successfully completed" });
  } catch (err) {
    console.error("Error reseting password:", err);
    return res
      .status(500)
      .json({ message: "An error occured during reseting password", err });
  }
};

const otpStore = {}; // Temporary store for OTPs and expiry

const sendOtpForPasswordChange = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    // Generate and send OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000;

    otpStore[user.email] = { otp, expiresAt };

    const sendOTP = async (email, otp) => {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "OTP for Password Change",
        text: `Your OTP for password change is: ${otp}`,
      };

      await transporter.sendMail(mailOptions);
    };

    await sendOTP(user.email, otp);

    return res.status(200).json({ message: "OTP sent to email" });
  } catch (err) {
    console.error("Send OTP Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { otp, newPassword } = req.body;

    if (!otp || !newPassword) {
      return res
        .status(400)
        .json({ message: "OTP and new password are required" });
    }
    let userEmail = null;
    for (let email in otpStore) {
      if (otpStore[email].otp === otp) {
        userEmail = email;
        break;
      }
    }
    if (!userEmail) {
      return res.status(401).json({ message: "Invalid OTP" });
    }

    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const storedOtpData = otpStore[user.email];
    if (!storedOtpData) {
      return res
        .status(401)
        .json({ message: "No OTP found. Please request a new one." });
    }

    const { otp: storedOtp, expiresAt } = storedOtpData;
    if (Date.now() > expiresAt) {
      delete otpStore[user.email];
      return res
        .status(401)
        .json({ message: "OTP has expired. Please request a new one." });
    }

    if (storedOtp !== otp) {
      return res.status(401).json({ message: "Invalid OTP" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    delete otpStore[user.email]; // Remove OTP after successful password change

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Change Password Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export default {
  register,
  login,
  resetPassword,
  sendOtpForPasswordChange,
  forgotPassword,
};
