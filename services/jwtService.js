import jwt from "jsonwebtoken";

const generateAccessToken = (user) => {
  return jwt.sign(
    { _id: user._id, isAdmin: user.isAdmin },
    process.env.SECRET_KEY
  );
};

export { generateAccessToken };
