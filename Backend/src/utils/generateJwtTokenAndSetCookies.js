const jwt = require("jsonwebtoken");
const serverConfig = require("../config/serverConfig");

const generateTokenAndSetCookie = (res, Uid, Urole) => {
  const token = jwt.sign({ Uid, Urole }, serverConfig.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("Utoken", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  return token;
};

module.exports = {
  generateTokenAndSetCookie,
};
