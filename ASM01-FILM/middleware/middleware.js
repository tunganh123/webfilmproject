const userToken = require("../models/userToken");
const midleware = (req, res, next) => {
  // gettoken with request query
  let token = req.query.token;
  // list user
  let usertk = userToken.all();
  // Get user with token
  let userok = usertk.find((user) => user.token == token);
  if (userok) {
    next();
  } else {
    res.status(401).json({ er: "Unauthorized" });
  }
};
module.exports = midleware;
