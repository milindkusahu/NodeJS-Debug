const Password = process.env.ROUTE_PASSWORD;

const verifyAuth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(403).json({ message: "Unauthorized Request" });
  }

  if (authorization !== Password) {
    return res.status(403).json({ message: "Unauthorized Request" });
  }

  next();
};

module.exports = { verifyAuth };
