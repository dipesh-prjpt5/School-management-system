const RoleAuthorization = (...AuthRoles) => {
  return (req, res, next) => {
    const userRole = req.Role;
    if (!AuthRoles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to access this route",
      });
    }

    next();
  };
};

module.exports = RoleAuthorization;
