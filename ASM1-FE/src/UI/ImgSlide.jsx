import React, { useContext } from 'react';
import { movieList } from '../pages/browse/MovieList';

const ImgSlide = ({ res, checkk }) => {
    // Lấy hàm callback bên MovieList truyền thông qua useContext
    const data = useContext(movieList)
    const clickHandler = () => {
        // Khi click vào ảnh thì gọi lại hàm và truyền dữ liệu thông tin về film đó
        data.handler(res)
    }

    return (
        <img onClick={clickHandler} style={{ width: "100%", height: "auto" }}
            // Nếu checkk == true thì sử dụng ảnh poster(ảnh dọc cho Original)
            src={!checkk ? "https://image.tmdb.org/t/p/w500"
                + res.backdrop_path :
                "https://image.tmdb.org/t/p/w500" + res.poster_path}
            alt="" />
    )
}

export default ImgSlide;