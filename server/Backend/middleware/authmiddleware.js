import jwt from "jsonwebtoken";

export const Token = (req, res, next) => {
  const token = req.cookies?.token;
  console.log("Token middleware:", token);

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};

export default Token;
