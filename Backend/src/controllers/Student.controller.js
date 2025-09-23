const { StatusCodes } = require("http-status-codes");
const { Student } = require("../models");

// creating student route
const createStudent = async (req, res, next) => {
  try {
    // cheking for all fields
    const {
      user_id,
      first_name,
      last_name,
      phone,
      email,
      date_of_birth,
      created_by,
    } = req.body;
    if (
      !user_id ||
      !first_name ||
      !last_name ||
      !phone ||
      !email ||
      !date_of_birth ||
      !created_by
    ) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "All fields are required!",
      });
    }

    // cheking for existing user
    const existingUser = await Student.findOne({ email });
    if (existingUser) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Student Already exists!",
      });
    }

    // creating new user
    const newStudent = new Student({
      user_id: user_id,
      first_name: first_name,
      last_name: last_name,
      phone: phone,
      email: email,
      date_of_birth: date_of_birth,
      created_by: created_by,
    });

    await newStudent.save();

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
    ]);

    if (!student) {
      res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Student found",
      student,
    });
  } catch (error) {
    next(error);
  }
};

const deleteStudent = async (req, res, next) => {
  try {
    const delete_student = await Student.findByIdAndDelete(req.params.id);

    if (!delete_student) {
      res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Student not found",
      });
    }
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Student deleted",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createStudent,
  getAllStudent,
  findOneStudents,
  deleteStudent,
};
