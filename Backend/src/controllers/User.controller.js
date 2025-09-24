const { User } = require("../models");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcrypt");

const createUser = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "All fieldes are require",
      });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "User Alredy Exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email: email,
      password: hashedPassword,
      role: role,
    });

    await newUser.save();

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "User created successfully",
      newUser,
    });
  } catch (error) {
    next(error);
  }
};

const getallUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find();

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Here are all users",
      allUsers,
    });
  } catch (error) {
    next(error);
  }
};

const getOneUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "User found",
      user,
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  getallUsers,
  getOneUser,
  deleteUser,
};
