import React from 'react';
import style from "../css/Banner.module.css"
const Banner = ({ firmRandom }) => {
    return (
        <div className={style.banner} >
            <h1>{firmRandom.name}</h1>
            <button>Play</button>
            <button>MyList</button>
            <p >{firmRandom.overview}</p>
        </div>
    )
}

export default Banner;