import React from 'react';
import SwiperNet from '../../../UI/SwiperNet';
const Original = ({ statee, onselect }) => {
    let arroption = [];
    for (let index = 1; index <= statee.total_pages
        ; index++) {
        arroption.push(index)
    }
    const d = document.querySelector("#selectoptionOriginal")
    const changeHandler = () => {
        onselect(d.value)
    }
    return (
        <div>
            <SwiperNet statee={statee} checkk={true} />
            <div style={{ display: "flex", alignItems: "center" }}>
                <h2>Original Movie</h2>
                <select onChange={changeHandler} name="" id="selectoptionOriginal" style={{ height: "100%", marginLeft: "2rem" }}>
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

export default Original;