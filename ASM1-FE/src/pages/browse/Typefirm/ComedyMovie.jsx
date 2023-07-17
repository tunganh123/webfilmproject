import React from 'react';
import SwiperNet from '../../../UI/SwiperNet';
const ComedyMovie = ({ statee, onselect }) => {
    let arroption = [];
    for (let index = 1; index <= statee.total_pages
        ; index++) {
        arroption.push(index)
    }
    const d = document.querySelector("#selectoptionComedy")
    const changeHandler = () => {
        onselect("ComedyMovies", d.value)
    }
    return (
        <div>
            <SwiperNet statee={statee} />
            <div style={{ display: "flex", alignItems: "center" }}>
                <h2>Comedy Movie</h2>
                <select onChange={changeHandler} name="" id="selectoptionComedy" style={{ height: "100%", marginLeft: "2rem" }}>
                    {
                        arroption.map((op) =>
                            <option value={op} key={op}>page {op}</option>
                        )
                    }
                </select>
            </div>
        </div>
    )
}

export default ComedyMovie;