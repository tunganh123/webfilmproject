const express = require("express");
const router = express.Router();
const movie = require("../controllers/movie");

//Trending
router.get("/api/movies/trending/:idpage", movie.movieTrending);
//rating
router.get("/api/movies/top-rate/:idpage", movie.movieToprate);
//type firm
router.get("/api/movies/discover/:idgenre", movie.movieGenre);
//trailer
router.post("/api/movies/video/:idfilm", movie.movieDetail);
//searchSS
router.post("/api/movies/search/:idpage", movie.movieSearch);
module.exports = router;
