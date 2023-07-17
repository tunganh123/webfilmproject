import React, { useState, useEffect, createContext, useRef } from 'react';
import style from "../css/MovieList.module.css"
import Trending from './Typefirm/Trending';
import TopRated from './Typefirm/TopRated';
import ActionMovie from './Typefirm/ActionMovie';
import ComedyMovie from './Typefirm/ComedyMovie';
import HorrorMovie from './Typefirm/HorrorMovie';
import Romance from './Typefirm/Romance';
import Documentaries from './Typefirm/Documentaries';
import { TOKEN } from '../../Token/Token';
import SwiperNet from '../../UI/SwiperNet';
import { fetchData } from '../../utils/fetchdata';
import { MovieDetail } from './MovieDetail';
// Tạo context để truyền dữ liệu
export const movieList = createContext()
const abovelink = `api/movies/`
//Danh sách link API
const MovieList = () => {
    // Danh sách state, mỗi thể loại lưu 1 state
    const [statetype, setstatetype] = useState({
        Trending: [],
        TopRated: [],
        ActionMovies: [],
        ComedyMovies: [],
        HorrorMovies: [],
        RomanceMovies: [],
        Documentaries: [],
    })
    // State set page
    const [statepage, setpage] = useState({
        Trending: 1,
        TopRated: 1,
        ActionMovies: 1,
        ComedyMovies: 1,
        HorrorMovies: 1,
        RomanceMovies: 1,
        Documentaries: 1,
    })
    const requests = {
        Trending: `${abovelink}trending/${statepage.Trending}${TOKEN}`,
        NetflixOriginals: `${abovelink}discover/35${TOKEN}&page=${statepage.Originals}`,
        TopRated: `${abovelink}top-rate/${statepage.TopRated}${TOKEN}`,
        ActionMovies: `${abovelink}discover/28${TOKEN}&page=${statepage.ActionMovies}`,
        ComedyMovies: `${abovelink}discover/35${TOKEN}&page=${statepage.ComedyMovies}`,
        HorrorMovies: `${abovelink}discover/27${TOKEN}&page=${statepage.HorrorMovies}`,
        RomanceMovies: `${abovelink}discover/10749${TOKEN}&page=${statepage.RomanceMovies}`,
        Documentaries: `${abovelink}discover/99${TOKEN}&page=${statepage.Documentaries}`,
    };
    // Gắn cho phần detail để scroll xuống
    const ref = useRef()
    const [detailstate, setdetailstate] = useState("") // state lưu film cụ thể khi click vào ảnh
    const [detailyoutube, setdetailyoutube] = useState("") //state lưu id để sử dụng Youtube
    const [check, setcheck] = useState(false)   // State kiểm tra khi click 2 lần vào cùng 1 ảnh thì ẩn/hiện detail firm
    const [statechangecolor, setchangecolor] = useState("")
    const [statelistlike, setstatelistlike] = useState([])
    const [statecheckshowlist, setstatecheckshowlist] = useState(false)
    //Cho chạy lần đầu tiên, lưu dữ liệu film vào từng state tương ứng với từng thể loại
    useEffect(() => {
        for (const index in requests) {
            fetchData(requests[index], (vl) => {
                setstatetype((prev) => {
                    return {
                        ...prev,
                        [index]: vl
                    }
                })
            })
        }
    }, [statepage])
    // Hàm callback khi click vào ảnh sẽ lấy đc thông tin firm đó
    const detailHandler = async (detail) => {
        // Khi click cuoộn xuống clip
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
        setchangecolor("")
        // Kiểm tra nếu dữ liệu của fiem vừa click == dữ liệu trạng thái trước đó thì dảo ngược trạng thái check. (Click nhiều lần vào cùng 1 film)
        // Nếu đúng thì return luôn
        if (detail == detailstate) {
            setcheck((prev) => !prev)
            return
        }
        // Dữ liệu khác thì luôn set check = true 
        setcheck(true)
        // gọi API để lấy id youtube với tham số id của film vừa click
        // api/movies/video/${detail.id}${TOKEN}
        fetchData(`api/movies/video/${detail.id}${TOKEN}`, (x) => setdetailyoutube({ "idyoutube": x.key }), "POST", JSON.stringify({ a: "b" }))
        // Set dữ liệu thông tin firm vừa click vào detailstate
        setdetailstate(detail)
    }

    // Lưu hàm callback vào data để truyền qua provider
    const data = {
        handler: detailHandler,
    }
    // callback set page
    const selecthandler = (type, val) => {
        setpage((prev) => {
            return {
                ...prev,
                [type]: Number(val)
            }
        })
    }
    const addlistmoviehandler = () => {
        setchangecolor("yellow")
        setstatelistlike((prev) => [...prev, detailstate])
    }
    return (
        <>
            <movieList.Provider value={data}>
                <div className={style.movielist} style={{ display: "flex", justifyContent: 'flex-end' }}>
                    <button onClick={() => {
                        setdetailstate("")
                        setstatecheckshowlist((prev) => !prev)
                    }} >Show my list</button>

                </div>
                {/* Hiển thị danh sách firm */}
                {
                    !statecheckshowlist ?
                        <div className={style.movielist}>
                            <Trending onselect={selecthandler} statee={statetype.Trending} />
                            <TopRated onselect={selecthandler} statee={statetype.TopRated} />
                            <ActionMovie onselect={selecthandler} statee={statetype.ActionMovies} />
                            <ComedyMovie onselect={selecthandler} statee={statetype.ComedyMovies} />
                            <HorrorMovie onselect={selecthandler} statee={statetype.HorrorMovies} />
                            <Romance onselect={selecthandler} statee={statetype.RomanceMovies} />
                            <Documentaries onselect={selecthandler} statee={statetype.Documentaries} />
                        </div>
                        :
                        <div className={style.movielist}>
                            <SwiperNet statee={{ results: statelistlike }} />
                        </div>
                }
                {
                    // Kiểm tra check phải bằng true và tồn tại thông tin 1 bộ firm cụ thể vừa click thì mới hiển thị
                    (detailstate != "" && check) &&
                    // Thông tin cụ thể của film mới click
                    <div style={{ margin: "30px 50px" }}>
                        <MovieDetail ref={ref} detailyoutube={detailyoutube} addlistmoviehandler={addlistmoviehandler} detail={detailstate} changecolor={statechangecolor} />
                    </div>
                }
            </movieList.Provider>
        </>
    )
}

export default MovieList;