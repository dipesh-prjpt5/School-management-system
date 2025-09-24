const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const AdminSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
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
    address_id: {
      type: Schema.Types.ObjectId,
      ref: "Address",
    },
  },
  {
    timestamps: true,
  }
);

AdminSchema.pre("findOneAndDelete", async function (next) {
  const admin = await this.model.findOne(this.getQuery());
  if (admin?.address_id) {
    await mongoose.model("Address").findByIdAndDelete(admin.address_id);
  }
  next();
});


module.exports = mongoose.model("Admin", AdminSchema);
