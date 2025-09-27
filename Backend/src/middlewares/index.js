module.exports = {
  errorHandler: require("./errorhandler.middleware.js"),
  VerifyUserToken: require("./Auth.middleware.js"),
  RoleAuthorization: require("./RoleAuth.middleware.js"),
};
