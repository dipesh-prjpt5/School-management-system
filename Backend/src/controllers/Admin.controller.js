const { StatusCodes } = require("http-status-codes");
const { Admin } = require("../models");

// creating student route
const createAdmin = async (req, res, next) => {
  try {
    // cheking for all fields
    const { first_name, last_name, phone, email } = req.body;
    if (!first_name || !last_name || !phone || !email) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "All fields are required!",
      });
    }

    // cheking for existing user
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Admin Already exists!",
      });
    }

    // creating new user
    const newAdmin = new Admin({
      first_name: first_name,
      last_name: last_name,
      phone: phone,
      email: email,
    });

    await newAdmin.save();

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Admin created successfully",
    });
  } catch (error) {
    next(error);
  }
};

const getAllAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.find().populate([
      {
        path: "user_id",
        select: "email role",
        populate: {
          path: "role",
          select: "name permissions",
        },
      },
    ]);

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Here are all Admin and their count",
      count: admin.length,
      admin,
    });
  } catch (error) {
    next(error);
  }
};

const findOneAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.params.id).populate([
      {
        path: "user_id",
        select: "email role",
        populate: {
          path: "role",
          select: "name permissions",
        },
      },
    ]);

    if (!admin) {
      res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Admin not found",
      });
    }

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Admin found",
      admin,
    });
  } catch (error) {
    next(error);
  }
};

const deleteAdmin = async (req, res, next) => {
  try {
    const delete_admin = await Admin.findByIdAndDelete(req.params.id);

    if (!delete_admin) {
      res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Admin not found",
      });
    }
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Admin deleted",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createAdmin,
  getAllAdmin,
  findOneAdmin,
  deleteAdmin,
};
