// models/Role.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const RoleSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  permissions: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("Role", RoleSchema);
