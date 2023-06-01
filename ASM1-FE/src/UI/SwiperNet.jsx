import React, { useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { movieList } from '../pages/browse/MovieList';
// Sử dụng thư viện Swiper và swiperSlide để hiện thị danh sách ảnh và trượt
// Import Swiper styles
import 'swiper/css';
import ImgSlide from './ImgSlide';
const SwiperNet = ({ statee, checkk = false, onselect }) => {
    // Lấy hàm callback bên MovieList truyền thông qua useContext
    const data = useContext(movieList)
    // Kiểm tra mảng dữ liệu nhận vào nên rỗng thì return luôn
    if (statee.length == 0) {
        return
    }
    return (
        <div >

            <Swiper
                spaceBetween={10}
                slidesPerView={7}
                onSlideChange={() => { }}
                onSwiper={(swiper) => { }}
            >
                {
                    statee.results.map((res, i) =>
                        <SwiperSlide key={i}>
                            {/* Check để sử dụng cho Orriginal */}
                            <ImgSlide res={res} checkk={checkk} />
                        </SwiperSlide>)
                }

            </Swiper>
        </div>

    )
}

export default SwiperNet;