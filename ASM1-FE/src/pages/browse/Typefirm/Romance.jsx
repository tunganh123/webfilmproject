import React from 'react';
import SwiperNet from '../../../UI/SwiperNet';
const Romance = ({ statee, onselect }) => {
    let arroption = [];
    for (let index = 1; index <= statee.total_pages
        ; index++) {
        arroption.push(index)
    }
    const d = document.querySelector("#selectoptionRomance")
    const changeHandler = () => {
        onselect(d.value)
    }
    return (
        <div>
            <SwiperNet statee={statee} />
            <div style={{ display: "flex", alignItems: "center" }}>
                <h2>Romance Movie</h2>
                <select onChange={changeHandler} name="" id="selectoptionRomance" style={{ height: "100%", marginLeft: "2rem" }}>
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

export default Romance;