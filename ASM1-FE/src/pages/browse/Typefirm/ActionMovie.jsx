import React from 'react';
import SwiperNet from '../../../UI/SwiperNet';
const ActionMovie = ({ statee, onselect }) => {
    // Tao mang arroption 1-> pagemax
    let arroption = [];
    for (let index = 1; index <= statee.total_pages
        ; index++) {
        arroption.push(index)
    }
    const d = document.querySelector("#selectoptionaction")
    // Change select -> call ham ben movielist
    const changeHandler = () => {
        onselect("ActionMovies", d.value)
    }
    return (
        <div>
            <SwiperNet statee={statee} />
            <div style={{ display: "flex", alignItems: "center" }}>
                <h2>Action Movie</h2>
                <select onChange={changeHandler} name="" id="selectoptionaction" style={{ height: "100%", marginLeft: "2rem" }}>
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

export default ActionMovie;