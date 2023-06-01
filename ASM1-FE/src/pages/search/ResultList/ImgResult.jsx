import React from 'react';

const Imgresult = ({ res, InclickHandler }) => {
    // console.log(InclickHandler)
    const clickHandler = () => {
        InclickHandler(res)
    }
    return (
        <img onClick={clickHandler} src={"https://image.tmdb.org/t/p/w500" + res.poster_path
        } alt="" />
    )
}

export default Imgresult;