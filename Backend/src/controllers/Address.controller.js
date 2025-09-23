const Address = require("../models");

const createAddress = async (req, res, next) => {
  try {
    const { user_id, house_no, street, city, state, postal_code } = req.body;
    if (!user_id || !house_no || !street || !city || !state || !postal_code) {
      res.json({
        success: false,
        message: "All fields are required",
      });
    }
    const address = new Address({
      user_id: user_id,
      house_no: house_no,
      street: street,
      city: city,
      state: state,
      postal_code: postal_code,
    });
    await address.save();
    res.json({
      success: true,
      message: "Address created",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createAddress,
};
