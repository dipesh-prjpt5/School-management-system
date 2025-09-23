const { StatusCodes } = require("http-status-codes");
const { Teacher } = require("../models");

const createTeacher = async (req, res, next) => {
  try {
    // cheking for all fields
    const { user_id, first_name, last_name, salary, phone, email, created_by } =
      req.body;
    if (
      !user_id ||
      !first_name ||
      !last_name ||
      !salary ||
      !phone ||
      !email ||
      !created_by
    ) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "All fields are required!",
      });
    }

    // cheking for existing user
    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Teacher Already exists!",
      });
    }

    // creating new user
    const newTeacher = new Teacher({
      user_id: user_id,
      first_name: first_name,
      last_name: last_name,
      salary: salary,
      phone: phone,
      email: email,
      created_by: created_by,
    });

    await newTeacher.save();

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Teacher created successfully",
    });
  } catch (error) {
    next(error);
  }
};

const getAllTeachers = async (req, res, next) => {
  try {
    const teachers = await Teacher.find().populate([
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
      message: "Here are all Teacher and their count",
      count: teachers.length,
      teachers,
    });
  } catch (error) {
    next(error);
  }
};

const findOneTeacher = async (req, res, next) => {
  try {
    const teacher = await Teacher.findById(req.params.id).populate([
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

    if (!teacher) {
      res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Teacher not found",
      });
    }

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Teacher found",
      teacher,
    });
  } catch (error) {
    next(error);
  }
};

const deleteTeacher = async (req, res, next) => {
  try {
    const delete_teacher = await Teacher.findByIdAndDelete(req.params.id);

    if (!deleteTeacher) {
      res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Teacher not found",
      });
    }
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Teacher deleted",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTeacher,
  getAllTeachers,
  findOneTeacher,
  deleteTeacher,
};
