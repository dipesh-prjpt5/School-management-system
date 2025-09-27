const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const {
  generateTokenAndSetCookie,
} = require("../utils/generateJwtTokenAndSetCookies");

const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email }).populate("role");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    generateTokenAndSetCookie(res, user._id, user.role.name);

    const { password: _, ...userData } = user.toObject();
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: userData,
    });
  } catch (error) {
    next(error);
  }
};

const logoutController = async (req, res, next) => {
  try {
    res.clearCookie("Utoken", {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { loginController, logoutController };
