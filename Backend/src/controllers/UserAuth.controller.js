const { User } = require("../models");
const bcrypt = require("bcrypt");
const {
  generateJwtTokenAndSetCookiesUser,
} = require("../utils/generatejwttokenandsetcookies");

const handleUserLogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (!user.password || !password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
        type: "UserLogin",
      });
    }

    generateJwtTokenAndSetCookiesUser(res, user._id, user.role);

    // hide password before sending user
    const { password: _, ...safeUser } = user.toObject();

    res.status(200).json({
      success: true,
      message: "User login successful",
      type: "UserLogin",
      user: safeUser,
    });
  } catch (error) {
    next(error);
  }
};

const handleUserLogOut = async (req, res, next) => {
  try {
    res.clearCookie("Utoken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    return res
      .status(200)
      .json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = { handleUserLogin, handleUserLogOut };
