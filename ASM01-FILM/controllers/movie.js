const movieList = require("../models/movieList");
const paginate = require("../utils/paging");
const genrefirm = require("../models/genrelist");
const videoList = require("../models/videoList");

exports.movieTrending = (req, res) => {
  // get param
  let param = req.params.idpage || 1;
  // get listmovie
  let list = movieList.all();
  // arrange arr
  let listok = list.sort((a, b) => (a.popularity > b.popularity ? -1 : 1));
  //filter page
  let listfilter = paginate(listok, 20, param);
  // reponse
  let response = {
    results: listfilter,
    page: param,
    total_pages: Math.floor(list.length / 20) + 1,
  };
  res.status(200).json(response);
};
exports.movieToprate = (req, res) => {
  // get param
  let param = req.params.idpage || 1;
  let list = movieList.all();
  let listok = list.sort((a, b) => (a.vote_average > b.vote_average ? -1 : 1));
  //filter page
  let listfilter = paginate(listok, 20, param);
  // reponse
  let response = {
    results: listfilter,
    page: param,
    total_pages: Math.floor(list.length / 20) + 1,
  };
  res.status(200).json(response);
};
exports.movieGenre = (req, res) => {
  // Get param idgenre
  let paramidgenre = req.params.idgenre;
  // Has idgenre
  if (paramidgenre) {
    // get itemgenre with param idgenre
    let itemgenre = genrefirm.all().find((genre) => genre.id == paramidgenre);
    // Has itemgenre
    if (itemgenre) {
      // Page
      let query = req.query.page || 1;
      let list = movieList.all();
      // filter with genre
      let listok = list.filter((item) => {
        let arrgenre = item.genre_ids;
        let checkk = false;
        arrgenre.forEach((it) => {
          if (it == paramidgenre) {
            checkk = true;
          }
        });
        if (checkk) {
          return item;
        }
      });
      //filter page
      let listfilter = paginate(listok, 20, query);
      // reponse
      let response = {
        results: listfilter,
        page: query,
        total_pages: Math.floor(listok.length / 20) + 1,
        genre_name: itemgenre.name,
      };
      res.status(200).json(response);
    } else {
      res.status(400).json({ message: "Not found that gerne id" });
    }
  } else {
    res.status(400).json({ message: "Not found gerne parram" });
  }
};
exports.movieDetail = (req, res) => {
  // Lấy param film
  let paramidfilm = req.params.idfilm;
  // Lấy ra video của phần tử vừa click
  let videoItem = videoList.all().find((item) => item.id == paramidfilm);
  // nếu tồn tại
  if (videoItem) {
    // Lấy ra các video thỏa mãn yêu cầu & type = trailer
    let videotrailer = videoItem.videos.filter((video) => {
      if (video.official) {
        if (video.site == "YouTube") {
          if (video.type == "Trailer") {
            return video;
          }
        }
      }
    });
    // Lấy ra các video thỏa mãn yêu cầu & type = teaser
    let videoteaser = videoItem.videos.filter((video) => {
      if (video.official) {
        if (video.site == "YouTube") {
          if (video.type == "Teaser") {
            return video;
          }
        }
      }
    });
    // Tạo 2 biến
    let videook;
    let videook2;
    // Trường hợp kết quả từ video trailer >=1, sắp xếp lại mảng.
    // Lấy ra phần tử có getTime lớn nhất == thời gian gần nhất, gán cho videook
    if (videotrailer.length > 1) {
      let arr = videotrailer.sort((a, b) => {
        let timea = new Date(a.published_at);
        let timeb = new Date(b.published_at);
        return timea.getTime() > timeb.getTime() ? -1 : 1;
      });
      videook = arr[0];
    } else if (videotrailer.length == 1) {
      videook = videotrailer[0];
    }
    // Trường hợp kết quả từ video teaser >=1, sắp xếp lại mảng.
    // Lấy ra phần tử có getTime lớn nhất == thời gian gần nhất, gán cho videook2
    if (videoteaser.length > 1) {
      let arr = videoteaser.sort((a, b) => {
        let timea = new Date(a.published_at);
        let timeb = new Date(b.published_at);
        return timea.getTime() > timeb.getTime() ? -1 : 1;
      });
      videook2 = arr[0];
    } else if (videoteaser.length == 1) {
      videook2 = videoteaser[0];
    }
    // Ưu tiên lấy video có type = trailer
    let videosres = videook ? videook : videook2;
    // Nếu tồn tại
    if (videosres) {
      res.status(200).json(videosres);
    } else res.status(404).json({ message: "Not found video" }); // Nếu k thấy video thỏa mãn
  } else res.status(400).json({ message: `Not found ${paramidfilm}` });
  // Nếu k thấy video theo id của film
};
exports.movieSearch = (req, res) => {
  let inputsearch = req.body;
  console.log(inputsearch);
  // get param
  if (inputsearch.inputvalue) {
    let param = req.params.idpage || 1;
    // get listmovie
    let list = movieList.all();
    let listcheck = list.filter((mov) => {
      if (mov.title) {
        if (mov.title.includes(inputsearch.inputvalue)) {
          return mov;
        }
      }
      if (mov.overview.includes(inputsearch.inputvalue)) {
        return mov;
      }
    });
    let listcheckok = listcheck;
    // Has input genre
    if (inputsearch.genre) {
      // get id genre input
      let idgenre = genrefirm
        .all()
        .find((genre) => genre.name == inputsearch.genre).id;
      // Filter film by genre
      listcheckok = listcheckok.filter((ch) => {
        // Get arrgenre
        let arrgenre = ch.genre_ids;
        for (let index = 0; index < arrgenre.length; index++) {
          if (arrgenre[index] == idgenre) {
            return ch;
          }
        }
      });
    }
    // Has mediatype
    if (inputsearch.mediatype.length > 0) {
      if (inputsearch.mediatype == "all") {
        listcheckok = listcheckok;
      } else {
        listcheckok = listcheckok.filter(
          (item) => item.media_type == inputsearch.mediatype
        );
      }
    }
    // Has language
    if (inputsearch.language.length > 0) {
      listcheckok = listcheckok.filter(
        (item) => item.original_language == inputsearch.language
      );
    }
    // Has year
    if (inputsearch.year) {
      listcheckok = listcheckok.filter((item) => {
        // get year
        let yearmovie = "";
        if (item.release_date) {
          yearmovie = item.release_date.getFullYear();
        }
        if (yearmovie == inputsearch.year) {
          return item;
        }
      });
    }

    //filter page
    let listfilter = paginate(listcheckok, 20, param);
    // reponseSS
    let response = {
      results: listfilter,
      page: param,
      total_pages: Math.floor(listcheckok.length / 20) + 1,
    };
    res.status(200).json(response);
  } else {
    res.status(400).json({ message: "Not found keyword parram" });
  }
};
