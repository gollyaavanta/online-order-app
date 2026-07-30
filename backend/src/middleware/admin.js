export const adminMiddleware = (req, res, next) => {
  console.log("Inside admin middleware");
  console.log(req.user);

  if (!req.user) {
    console.log("401");
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  if (!req.user.role || req.user.role.toLowerCase() !== "admin") {
    console.log("403");
    return res.status(403).json({
      success: false,
      message: "Access denied",
    });
  }

  console.log("Admin middleware passed");
  next();
};