import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../browse/Navbar';
import style from "./Search.module.css"
import SearchForm from './SearchForm/SearchForm';
import ResultList from './ResultList/ResultList';
import YouTube from 'react-youtube';
import { TOKEN } from '../../Token/Token';
// Lưu thông tin mặc định
const Search = () => {
	const link = process.env.REACT_APP_URL_FETCH;
	// Gắn cho phần detail để scroll xuống
	const ref = useRef()
	// Các state
	// state page
	const [statepage, setstatepage] = useState(1)
	// state input value
	const [stateinputvalue, setstateinputvalue] = useState({})
	const [resultfirm, setresultfirm] = useState([]) // Lưu danh sách firm tìm kiếm đc
	const [infofirm, setinfofirm] = useState("") // Lưu thông tin cụ thể 1 firm khi click vào
	const [stateidyoutube, setidyoutube] = useState("") // Lưu id của clip để sự dụng cho youtube
	const [check, setcheck] = useState(false) // Check để kiểm tra trường hợp click nhiều lần vào cùng 1 clip thì ấn/ hiện

	// Hàm callback lấy từ khóa người dùng nhập vào
	const searchfirm = (input) => {
		setstateinputvalue(input)
		// Kiểm tra nếu nhập vào rỗng hoặc khoảng trắng thì return
		if (input.inputvalue.trim() == "") {
			return
		}
		let genre = input.genre;
		let mediatype = input.mediatype;
		let language = input.language;
		let year = input.year;
		let genretk = `&genre=${genre}`
		let mediatypetk = `&mediatype=${mediatype}`
		let languagetk = `&language=${language}`
		let yeartk = `&year=${year}`
		let url = `${link}/api/movies/search/${statepage}${TOKEN}`
		let urlok = url;
		if (genre.trim()) {
			urlok = urlok + genretk;
		}
		if (mediatype != "") {
			urlok = urlok + mediatypetk;
		}
		if (language != "") {
			urlok = urlok + languagetk;
		}
		if (yeartk.trim()) {
			urlok = urlok + yeartk;
		}
		// Tạo hàm kết nối để API và set dữ liệu nhận về vào state resultfirm
		const fetchfirm = async () => {
			try {
				const a = await fetch(urlok, {
					method: "POST",
					body: JSON.stringify(input),
					headers:
					{
						"Content-Type": "application/json"
					}
				})
				if (a.status !== 200) {
					const error = await a.json();
					throw error;
				}
				const b = await a.json()
				setresultfirm(b)
			} catch (error) {
				console.log(error)
			}

		}
		fetchfirm()
	}
	// Khi click vào nút reset thì thiết lập về dự liệu rỗng
	const resetfirm = () => {
		setresultfirm([])
		setinfofirm("")
	}
	// Tạo obj firm gồm hàm searchfirm và reset để truyền
	let firm = {
		search: searchfirm,
		reset: resetfirm
	}
	// các thuộc tính mặc định sử dụng cho thẻ youtube
	const opts = {
		height: '400',
		width: '100%',
		playerVars: {
			autoplay: 0,
		},
	};
	// Hàm callback khi click vào 1 ảnh
	const clickHandler = async (result) => {
		// Khi click cuoộn xuống clip
		if (ref.current) {
			ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
		}

		// Kiểm tra click trùng với firm đang đc hiển thị thì set lại check và return luôn
		if (result == infofirm) {
			setcheck((prev) => !prev)
			return
		}
		// Set checjk = truee
		setcheck(true)
		// Call API để lấy id youtube
		const fetchyoutube = async function () {
			try {
				const res = await fetch(`${link}/api/movies/video/${result.id}${TOKEN}`,
					{
						method: "POST",
						body: JSON.stringify({ "a": "b" }),
						headers: {
							"Content-Type": "application/json"
						}
					}
				);
				if (res.status !== 200) {
					const error = await res.json();
					throw error;
				}
				const data = await res.json();
				setidyoutube({ "idyoutube": data.key })
			} catch (error) {
				console.log(error)
				setidyoutube("")
			}
		}
		fetchyoutube() // Gọi hàm 
		setinfofirm(result) // Lưu thông tin firm đc click vào stateinfofirm
	}
	// call back change page
	const selecthandler = (value) => {
		setstatepage(value)
	}
	// fetch firm change with page change
	const fetchfirm2 = async () => {
		try {
			const a = await fetch(`${link}/api/movies/search/${statepage}${TOKEN}`, {
				method: "POST",
				body: JSON.stringify(stateinputvalue),
				headers:
				{
					"Content-Type": "application/json"
				}
			})
			if (a.status !== 200) {
				const error = await a.json();
				throw error;
			}
			const b = await a.json()
			setresultfirm(b)
		} catch (error) {
			console.log(error)
		}

	}
	useEffect(() => {
		fetchfirm2()
	}, [statepage])
	return (
		<div className={style.searchdiv}>
			<Navbar />
			<SearchForm onsearch={firm} />
			{
				// Kiểm tra điều kiện ban đầu hoặc khi search ko có firm thỏa mãn
				resultfirm.length != 0 ? <ResultList onselect={selecthandler} resultfirm={resultfirm} OnclickHandler={clickHandler} /> : <h2>Không có film</h2>
			}
			{
				// Kiểm tra điều kiện phải có thông tin firm đc click và check == true thì mới hiển thị
				(infofirm != "" && check) &&
				<div className={style.detail}>
					<div className={style.info}>
						<h2>{infofirm.original_title}</h2>
						<p>Release Date: {infofirm.release_date
						}</p>
						<p>Vote: {infofirm.vote_average}/10</p>
						<p>{infofirm.overview
						}</p>
					</div>
					<div ref={ref} className={style.clip}>
						{
							// Nếu tồn tại idyoutube thì hiện clip còn không thì hiển thị ảnh
							stateidyoutube.idyoutube ?
								<YouTube
									videoId={stateidyoutube.idyoutube}
									opts={opts}

								/> : <img style={{ width: "100%", height: "100%" }} src={"https://image.tmdb.org/t/p/w500" + infofirm.backdrop_path} alt="" />
						}

					</div>
				</div>

			}

		</div>
	);
};

export default Search;
