const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (value) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: "Invalid email address format",
      },
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("findOneAndDelete", async function (next) {
  const userId = this.getQuery()["_id"];
  await mongoose.model("Student").findOneAndDelete({ user_id: userId });
  await mongoose.model("Teacher").findOneAndDelete({ user_id: userId });
  await mongoose.model("Admin").findOneAndDelete({ user_id: userId });

  next();
});

module.exports = mongoose.model("User", UserSchema);
