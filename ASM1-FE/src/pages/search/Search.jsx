import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../browse/Navbar';
import style from "../css/Search.module.css"
import SearchForm from './SearchForm/SearchForm';
import ResultList from './ResultList/ResultList';
import { TOKEN } from '../../Token/Token';
import { MovieDetail } from '../browse/MovieDetail';
import { fetchData } from '../../utils/fetchdata';
// Lưu thông tin mặc định
const Search = () => {
	// Gắn cho phần detail để scroll xuống
	const ref = useRef()
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
		// Kiểm tra nếu nhập vào rỗng hoặc khoảng trắng thì return
		if (input.inputvalue.trim() == "") {
			return
		}
		setstateinputvalue(input)
		let genre = input.genre;
		let mediatype = input.mediatype;
		let language = input.language;
		let year = input.year;
		let genretk = `&genre=${genre}`
		let mediatypetk = `&mediatype=${mediatype}`
		let languagetk = `&language=${language}`
		let yeartk = `&year=${year}`
		let urlok = `api/movies/search/${statepage}${TOKEN}`
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
		fetchData(urlok, (x) => setresultfirm(x), "POST", JSON.stringify(input))
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
		fetchData(`api/movies/video/${result.id}${TOKEN}`, (x) => setidyoutube({ "idyoutube": x.key }), "POST", JSON.stringify({ "a": "b" }))
		setinfofirm(result) // Lưu thông tin firm đc click vào stateinfofirm
	}
	// call back change page
	const selecthandler = (value) => {
		setstatepage(value)
	}
	useEffect(() => {
		fetchData(`api/movies/search/${statepage}${TOKEN}`, (x) => setresultfirm(x), "POST", JSON.stringify(stateinputvalue))
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
				<MovieDetail ref={ref} detailyoutube={stateidyoutube} detail={infofirm} />

			}
		</div>
	);
};

export default Search;
