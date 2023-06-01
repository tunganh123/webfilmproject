const fs = require("fs");
const path = require("path");
const movieList = {
  all: function () {
    return JSON.parse(
      fs.readFileSync(
        path.join(__dirname, "../", "data", "movieList.json"),
        "utf8"
      )
    );
  },
};
module.exports = movieList;
