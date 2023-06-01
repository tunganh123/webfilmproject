const express = require("express");
const cors = require("cors");
const movieTrending = require("./routes/movieTrending");
const bodyparser = require("body-parser");
const middleware = require("./middleware/middleware");
const web404 = require("./routes/web404");
require("dotenv").config();
const app = express();
// Thiet lap port
app.set("port", process.env.PORT);
// Thiet lap cors
const corsoption = {
  origin: "http://localhost:3000",
};
// Khai bao cors
app.use(cors(corsoption));
// use bodyparser convert json
app.use(bodyparser.json());
// Middleware xac thuc token nguoi dung
app.use("/", middleware);
//Routes trending
app.use(movieTrending);
// Routes 404
app.use(web404);

app.listen(app.get("port"));
