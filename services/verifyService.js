import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const accessToken = token.split(" ")[1];

    jwt.verify(accessToken, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).json("Token is not valid");
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated");
  }
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user._id == req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json("You are not authenticated");
    }
  });
};

export { verifyToken, verifyAdmin };
