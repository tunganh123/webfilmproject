const fs = require("fs");
const path = require("path");
const userToken = {
  all: function () {
    return JSON.parse(
      fs.readFileSync(
        path.join(__dirname, "../", "data", "userToken.json"),
        "utf8"
      )
    );
  },
};
module.exports = userToken;
