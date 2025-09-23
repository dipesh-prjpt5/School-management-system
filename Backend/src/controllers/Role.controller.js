const { Role } = require("../models");
const { StatusCodes } = require("http-status-codes");

const createRole = async (req, res, next) => {
  try {
    const { name, permissions } = req.body;

    // 1. Validate input
    if (!name) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Role name is required",
      });
    }

    // 2. Check if role already exists
    const existingRole = await Role.findOne({ name });
    if (existingRole) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Role already exists",
      });
    }

    // 3. Create new role
    const newRole = new Role({
      name,
      permissions: permissions || [],
    });

    await newRole.save();

    // 4. Send response
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Role created successfully",
      role: newRole,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createRole };
