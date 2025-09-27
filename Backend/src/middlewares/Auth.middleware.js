const jwt = require("jsonwebtoken");
const serverConfig = require("../config/serverConfig");

const VerifyUserToken = (req, res, next) => {
  const token = req.cookies?.Utoken;
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized access" });
  }
  try {
    const decoded = jwt.verify(token, serverConfig.JWT_SECRET);
    if (!decoded) {
      res.clearCookie("Utoken");
      return res
        .status(403)
        .json({ success: false, message: "Unauthenticated user" });
    }
    req.UserId = decoded.Uid;
    req.Role = decoded.Urole;
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
};

module.exports = VerifyUserToken;
