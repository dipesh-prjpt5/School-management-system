const { StatusCodes } = require("http-status-codes");
const { Student, Address, User } = require("../models");

// creating student route
const createStudent = async (req, res, next) => {
  try {
    // cheking for all fields
    const {
      house_no,
      street,
      city,
      state,
      postal_code,
      user_id,
      first_name,
      last_name,
      phone,
      date_of_birth,
      created_by,
    } = req.body;

    if (
      !house_no ||
      !street ||
      !city ||
      !state ||
      !postal_code ||
      !user_id ||
      !first_name ||
      !last_name ||
      !phone ||
      !date_of_birth ||
      !created_by
    ) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "All fields are required!",
      });
    }

    // cheking for existing user
    const existingUser = await User.findOne({ user_id });
    if (existingUser) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "User Already exists!",
      });
    }

    const address = new Address({
      house_no,
      street,
      city,
      state,
      postal_code,
    });

    const savedAddress = await address.save();

    // creating new user
    const newStudent = new Student({
      user_id,
      first_name,
      last_name,
      phone,
      date_of_birth,
      created_by,
      address_id: savedAddress._id,
    });

    const savedStudent = await newStudent.save();

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    next(error);
  }
};

const getAllStudent = async (req, res, next) => {
  try {
    const students = await Student.find().populate([
      { path: "created_by", select: "first_name last_name" },
      {
        path: "user_id",
        select: "email role",
        populate: {
          path: "role",
          select: "name permissions",
        },
      },
      { path: "address_id" },
    ]);

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Here are all Student and their count",
      count: students.length,
      students,
    });
  } catch (error) {
    next(error);
  }
};

const findOneStudents = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id).populate([
      { path: "created_by", select: "first_name last_name" },
      {
        path: "user_id",
        select: "email role",
        populate: {
          path: "role",
          select: "name permissions",
        },
      },
      { path: "address_id" },
    ]);

    if (!student) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Student not found",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Student found",
      student,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createStudent,
  getAllStudent,
  findOneStudents,
};