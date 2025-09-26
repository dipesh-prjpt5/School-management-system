const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const StudentSchema = new Schema(
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
    phone: {
      type: String,
      required: true,
    },
    date_of_birth: {
      type: Date,
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

StudentSchema.pre("findOneAndDelete", async function (next) {
  const student = await this.model.findOne(this.getQuery());
  if (student?.address_id) {
    await mongoose.model("Address").findByIdAndDelete(student.address_id);
  }
  next();
});


module.exports = mongoose.model("Student", StudentSchema);
