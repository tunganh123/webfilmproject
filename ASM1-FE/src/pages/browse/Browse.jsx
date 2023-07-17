import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import style from "../css/Browse.module.css"
import Banner from './Banner';
import MovieList from './MovieList';
import { TOKEN } from '../../Token/Token';
import { fetchData } from '../../utils/fetchdata';
////////////////////////////////////////////////
function Browse() {
	// stateOriginals để lấy danh sách film Originals và chọn random 1 bộ 
	const [stateOriginals, setOriginals] = useState([])
	// Hàm fetch API
	// Cho chạy lần đầu khi duyệt web
	useEffect(() => {
		fetchData(`api/movies/top-rate/2${TOKEN}`, setOriginals)
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

