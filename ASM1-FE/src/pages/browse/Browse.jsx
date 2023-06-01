import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import style from "./Browse.module.css"
import Banner from './Banner';
import MovieList from './MovieList';
import { TOKEN } from '../../Token/Token';
// Danh sách link API
const link = process.env.REACT_APP_URL_FETCH;
const requests = {
	fetchTrending: `${link}/api/movies/trending/1${TOKEN}`,
	fetchTopRated: `${link}/api/movies/top-rate/2${TOKEN}`,
	fetchActionMovies: `${link}/api/movies/discover/28${TOKEN}`,
	fetchComedyMovies: `${link}/api/movies/discover/35${TOKEN}`,
	fetchHorrorMovies: `${link}/api/movies/discover/27${TOKEN}`,
	fetchRomanceMovies: `${link}/api/movies/discover/10749${TOKEN}`,
	fetchDocumentaries: `${link}/api/movies/discover/99${TOKEN}`,
	// fetchSearch: `/search/movie?api_key=${API_KEY}&language=en-US`,
};
////////////////////////////////////////////////
function Browse() {
	// stateOriginals để lấy danh sách film Originals và chọn random 1 bộ 
	const [stateOriginals, setOriginals] = useState([])
	// Hàm fetch API
	const fetchNetflixOriginals = async function (type, setstate) {
		const a = await fetch(type)
		const b = await a.json();
		setstate(b)
	}
	// Cho chạy lần đầu khi duyệt web
	useEffect(() => {
		fetchNetflixOriginals(requests.fetchTopRated, setOriginals)
	}, [])
	// Lấy numberRandom = 0->19 ( Vì danh sách trả về mảng 20 phần tử)
	const numberRandom = Math.floor(Math.random() * 20)
	let firmRandom;
	// Check điều kiện đầu tiên
	if (stateOriginals.length == 0) {
		return
	}
	// Lấy ra 1 fiml ngẫu nhiên
	firmRandom = stateOriginals.results[numberRandom]
	// Tạo đường dẫn lấy ảnh
	const test = "https://image.tmdb.org/t/p/w500" + firmRandom.backdrop_path;
	return (
		<>
			<div className={style.browse} style={{ backgroundImage: `url(${test})` }}>
				<Navbar />
				<Banner firmRandom={firmRandom} />
			</div >
			<MovieList />
		</>
	);
}

export default Browse;

