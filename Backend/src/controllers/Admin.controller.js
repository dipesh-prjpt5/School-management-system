const { StatusCodes } = require("http-status-codes");
const { Admin, Address, User } = require("../models");

// creating student route
const createAdmin = async (req, res, next) => {
  try {
    const {
      user_id,
      first_name,
      last_name,
      phone,
      house_no,
      street,
      city,
      state,
      postal_code,
    } = req.body;

    // Check for required fields
    if (
      !user_id || !first_name || !last_name || !phone ||
      !house_no || !street || !city || !state || !postal_code
    ) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "All fields are required!",
      });
    }

    // Check if user exists
    const user = await User.findById(user_id).populate("role");
    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "User does not exist",
      });
    }

    // Check user role
    if (user.role.name !== "admin") {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "User is not an admin",
      });
    }

    // Check if admin profile already exists
    const existingAdmin = await Admin.findOne({ user_id });
    if (existingAdmin) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Admin profile already exists for this user",
      });
    }

    // Create address
    const address = new Address({ house_no, street, city, state, postal_code });
    const savedAddress = await address.save();

    // Create admin profile
    const newAdmin = new Admin({
      user_id,
      first_name,
      last_name,
      phone,
      address_id: savedAddress._id,
    });

    await newAdmin.save();

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Admin profile created successfully",
      admin: newAdmin,
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
