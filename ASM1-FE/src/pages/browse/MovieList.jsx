import React, { useState, useEffect, createContext, useRef } from 'react';
import style from "./MovieList.module.css"
import Trending from './Typefirm/Trending';
import Original from './Typefirm/Original';
import TopRated from './Typefirm/TopRated';
import ActionMovie from './Typefirm/ActionMovie';
import ComedyMovie from './Typefirm/ComedyMovie';
import HorrorMovie from './Typefirm/HorrorMovie';
import Romance from './Typefirm/Romance';
import Documentaries from './Typefirm/Documentaries';
import YouTube from 'react-youtube';
import { TOKEN } from '../../Token/Token';
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { FacebookIcon, TwitterIcon } from "react-share";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SwiperNet from '../../UI/SwiperNet';
// Tạo context để truyền dữ liệu
export const movieList = createContext()
//Danh sách link API
const MovieList = () => {
    const link = process.env.REACT_APP_URL_FETCH;
    // State set page
    const [statepageOriginals, setstatepageOriginals] = useState(1)
    const [statepageTrending, setstatepageTrending] = useState(1)
    const [statepageTopRated, setstatepageTopRated] = useState(1)
    const [statepageActionMovies, setstatepageActionMovies] = useState(1)
    const [statepageComedyMovies, setstatepageComedyMovies] = useState(1)
    const [statepageHorrorMovies, setstatepageHorrorMovies] = useState(1)
    const [statepageRomanceMovies, setstatepageRomanceMovies] = useState(1)
    const [statepageDocumentaries, setstatepageDocumentaries] = useState(1)

    const requests = {
        fetchTrending: `${link}/api/movies/trending/${statepageTrending}${TOKEN}`,
        fetchNetflixOriginals: `${link}/api/movies/discover/35${TOKEN}&page=${statepageOriginals}`,
        fetchTopRated: `${link}/api/movies/top-rate/${statepageTopRated}${TOKEN}`,
        fetchActionMovies: `${link}/api/movies/discover/28${TOKEN}&page=${statepageActionMovies}`,
        fetchComedyMovies: `${link}/api/movies/discover/35${TOKEN}&page=${statepageComedyMovies}`,
        fetchHorrorMovies: `${link}/api/movies/discover/27${TOKEN}&page=${statepageHorrorMovies}`,
        fetchRomanceMovies: `${link}/api/movies/discover/10749${TOKEN}&page=${statepageRomanceMovies}`,
        fetchDocumentaries: `${link}/api/movies/discover/99${TOKEN}&page=${statepageDocumentaries}`,
        // fetchSearch: `/search/movie?api_key=${API_KEY}&language=en-US`,
    };
    // Gắn cho phần detail để scroll xuống
    const ref = useRef()
    // Danh sách state, mỗi thể loại lưu 1 state

    const [stateOriginals, setOriginals] = useState([])
    const [stateTrending, setTrending] = useState([])
    const [stateTopRated, setTopRated] = useState([])
    const [stateActionMovies, setActionMovies] = useState([])
    const [stateComedyMovies, setComedyMovies] = useState([])
    const [stateHorrorMovies, setHorrorMovies] = useState([])
    const [stateRomanceMovies, setRomanceMovies] = useState([])
    const [stateDocumentaries, setDocumentaries] = useState([])
    const [detailstate, setdetailstate] = useState("") // state lưu film cụ thể khi click vào ảnh
    const [detailyoutube, setdetailyoutube] = useState("") //state lưu id để sử dụng Youtube
    const [check, setcheck] = useState(false)   // State kiểm tra khi click 2 lần vào cùng 1 ảnh thì ẩn/hiện detail firm

    const [statechangecolor, setchangecolor] = useState("")
    const [statelistlike, setstatelistlike] = useState([])
    const [statecheckshowlist, setstatecheckshowlist] = useState(false)
    // Tạo hàm kết nối API
    const fetchNet = async function (type, setstate) {
        try {
            const a = await fetch(type)
            if (a.status != 200) {
                const error = a.json();
                throw error
            }
            const b = await a.json();
            setstate(b)

        } catch (error) {
            console.log(error)
        }
    }
    //Cho chạy lần đầu tiên, lưu dữ liệu film vào từng state tương ứng với từng thể loại
    useEffect(() => {
        fetchNet(requests.fetchNetflixOriginals, setOriginals)
        fetchNet(requests.fetchTrending, setTrending)
        fetchNet(requests.fetchTopRated, setTopRated)
        fetchNet(requests.fetchActionMovies, setActionMovies)
        fetchNet(requests.fetchComedyMovies, setComedyMovies)
        fetchNet(requests.fetchHorrorMovies, setHorrorMovies)
        fetchNet(requests.fetchRomanceMovies, setRomanceMovies)
        fetchNet(requests.fetchDocumentaries, setDocumentaries)
    }, [statepageActionMovies, statepageComedyMovies, statepageDocumentaries,
        statepageHorrorMovies, statepageOriginals, statepageRomanceMovies,
        statepageTopRated, statepageTrending])
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
        const fetchyoutube = async function () {
            try {
                const a = await fetch(`${link}/api/movies/video/${detail.id}${TOKEN}`,
                    {
                        method: "POST",
                        body: JSON.stringify({ "a": "b" }),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                if (a.status != 200) {
                    const error = a.json();
                    throw error
                }
                const b = await a.json();
                setdetailyoutube({ "idyoutube": b.key })

            } catch (error) {
                setdetailyoutube("")
            }
            // Nếu k có trường hợp nào thỏa mãn thì sẽ set lại detailyoutube = ""

        }
        // Gọi hàm và gán dữ liệu cho detail youtube
        fetchyoutube()
        // Set dữ liệu thông tin firm vừa click vào detailstate
        setdetailstate(detail)
    }
    // Obj lưu các thuộc tính mặc định để sử dụng cho youtube
    const opts = {
        height: '400',
        width: '100%',
        playerVars: {
            autoplay: 0,
        },
    };
    // Lưu hàm callback vào data để truyền qua provider
    const data = {
        handler: detailHandler,
    }
    // callback set page
    const selecthandleraction = (value) => {
        console.log(value)
        setstatepageActionMovies(value)
    }
    const selecthandleroriginal = (value) => {
        setstatepageOriginals(value)
    }
    const selecthandlercomedy = (value) => {
        setstatepageComedyMovies(value)
    }
    const selecthandlerhorror = (value) => {
        setstatepageHorrorMovies(value)
    }
    const selecthandlerromance = (value) => {
        setstatepageRomanceMovies(value)
    }
    const selecthandlerdocument = (value) => {
        setstatepageDocumentaries(value)
    }
    const selecthandlertrending = (value) => {
        setstatepageTrending(value)
    }
    const selecthandlertoprated = (value) => {
        setstatepageTopRated(value)
    }
    let urlok = detailyoutube.idyoutube ? `https://www.youtube.com/watch?v=${detailyoutube.idyoutube}` : "https://image.tmdb.org/t/p/w500" + detailstate.backdrop_path
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
                            <Original onselect={selecthandleroriginal} statee={stateOriginals} />
                            <Trending onselect={selecthandlertrending} statee={stateTrending} />
                            <TopRated onselect={selecthandlertoprated} statee={stateTopRated} />
                            <ActionMovie onselect={selecthandleraction} statee={stateActionMovies} />
                            <ComedyMovie onselect={selecthandlercomedy} statee={stateComedyMovies} />
                            <HorrorMovie onselect={selecthandlerhorror} statee={stateHorrorMovies} />
                            <Romance onselect={selecthandlerromance} statee={stateRomanceMovies} />
                            <Documentaries onselect={selecthandlerdocument} statee={stateDocumentaries} />
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
                    <div className={style.detail}>
                        <div className={style.info}>
                            <h2>{detailstate.original_title} <FontAwesomeIcon color={statechangecolor} onClick={addlistmoviehandler} style={{ marginLeft: "1rem" }} icon="fa-solid fa-folder-plus" /> </h2>
                            <p>Release Date: {detailstate.release_date
                            }</p>
                            <p>Vote: {detailstate.vote_average}/10</p>
                            <p>{detailstate.overview
                            }</p>
                            <div>
                                <FacebookShareButton
                                    url={urlok}
                                    description={"aiueo"}
                                    className="Demo__some-network__share-button"
                                >
                                    <FacebookIcon size={32} round /> Share
                                </FacebookShareButton>
                                <TwitterShareButton style={{ margin: "1rem" }}
                                    title={"test"}
                                    url={urlok}
                                    hashtags={["hashtag1", "hashtag2"]}
                                >
                                    <TwitterIcon size={32} round />
                                    Share
                                </TwitterShareButton>
                            </div>
                        </div>

                        <div ref={ref} className={style.clip}>
                            {
                                // Kiểm tra nếu detailyoutube tồn tại idyoutube thì sẽ hiện thị click còn không sẽ hiện thị ảnh backdrops
                                detailyoutube.idyoutube ? <YouTube
                                    videoId={detailyoutube.idyoutube}
                                    opts={opts}

                                /> : <img style={{ width: "100%", height: "100%" }} src={"https://image.tmdb.org/t/p/w500" + detailstate.backdrop_path} alt="" />
                            }

                        </div>

                    </div>
                }
            </movieList.Provider>
        </>
    )
}

export default MovieList;