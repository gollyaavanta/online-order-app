import jwt from "jsonwebtoken";

const authMiddleWare = async (req, res, next) => {
  // 1. Extract raw token from standard Authorization header or fallback 'token' header
  const authHeader = req.headers.authorization || req.headers.token;
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized. Please login again.",
    });
  }

  // 2. Clean the token string (strip out "Bearer " if present)
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized. Token missing.",
    });
  }

  try {
    // 3. Verify JWT
    const decoded = jwt.verify(token, process.env.SECRET);
    console.log("---->",decoded)
    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default authMiddleWare;