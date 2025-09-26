const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const TeacherSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    address_id: {
      type: Schema.Types.ObjectId,
      ref: "Address",
    },
  },
  {
    timestamps: true,
  }
);

TeacherSchema.pre("findOneAndDelete", async function (next) {
  const teacher = await this.model.findOne(this.getQuery());
  if (teacher?.address_id) {
    await mongoose.model("Address").findByIdAndDelete(teacher.address_id);
  }
  next();
});


module.exports = mongoose.model("Teacher", TeacherSchema);
