import React, { useRef } from 'react';
import style from "./Searchform.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SearchForm = ({ onsearch }) => {
    // Sử dụng ref để lấy thông tin về dữ liệu input
    const ref = useRef()
    const refgenre = useRef()
    const refyear = useRef()
    const refmediatype = useRef()
    const reflanguage = useRef()
    const searchHandler = (e) => {
        e.preventDefault()
        // init datainput
        let datainput = {
            inputvalue: ref.current.value.trim(),
            genre: refgenre.current.value.trim(),
            mediatype: refmediatype.current.value,
            language: reflanguage.current.value,
            year: refyear.current.value.trim()
        }

        // Gọi hàm callback
        onsearch.search(datainput)
    }
    const resetHandler = (e) => {
        e.preventDefault()
        // Khi click vào reset thì hiển thị lại dữ liệu và gọi hàm callback
        ref.current.value = ""
        onsearch.reset()
    }
    return (
        <form action="" className={style.form}>
            <div className={style.searchform}>
                <input ref={ref} type="text" placeholder='input type firm please!' />
                <FontAwesomeIcon style={{ width: "30px", height: "2rem", marginRight: "20px", fontWeight: "400", color: "rgb(80, 69, 69)" }} icon="fa-solid fa-magnifying-glass" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", columnGap: "1rem" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <label style={{ color: "black", marginRight: "0.7rem" }} htmlFor="">Genre</label>
                    <input ref={refgenre} style={{ border: "1px solid black", marginLeft: "0px", height: "1rem", fontSize: "0.8rem" }} type="text" />
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <label style={{ color: "black", marginRight: "0.7rem" }} htmlFor="">MediaType</label>
                    <select ref={refmediatype} name="" id="mediatype">
                        <option value="">mediatype</option>
                        <option value="all">all</option>
                        <option value="movie">movie</option>
                        <option value="tv">tv</option>
                        <option value="person">person</option>
                    </select>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <label style={{ color: "black", marginRight: "0.7rem" }} htmlFor="">Language</label>
                    <select ref={reflanguage} name="" id="language">
                        <option value="">language</option>
                        <option value="en">en-us</option>
                        <option value="jp">jp</option>
                        <option value="kr">kr</option>
                    </select>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <label style={{ color: "black", marginRight: "0.7rem" }} htmlFor="">Year</label>
                    <input ref={refyear} style={{ border: "1px solid black", marginLeft: "0px", height: "1rem", fontSize: "0.8rem", marginRight: "0.5rem" }} type="text" />
                </div>
            </div>

            <div className={style.btnform}>
                <button onClick={resetHandler}>RESET</button>
                <button onClick={searchHandler}>SEARCH</button>
            </div>
        </form>
    )
}

export default SearchForm;