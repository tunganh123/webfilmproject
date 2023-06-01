import React, { useRef } from 'react';
import style from "./ResultList.module.css"
import Imgresult from './ImgResult';
const ResultList = ({ resultfirm, OnclickHandler, onselect }) => {
    const ref = useRef()
    // Tao mang arroption 1-> pagemax
    let arroption = [];
    for (let index = 1; index <= resultfirm.total_pages
        ; index++) {
        arroption.push(index)
    }
    // Change select -> call ham ben movielist
    const changeHandler = () => {
        // callback 
        onselect(ref.current.value)
    }
    return (
        <div className={style.resultlist}>
            <div style={{ display: "flex", alignItems: "center" }}>
                <h2>Search Result</h2>
                <select onChange={changeHandler} ref={ref} id="selectoptionsearchok" style={{ height: "100%", marginLeft: "2rem" }}>
                    {
                        arroption.map((op) =>
                            <option value={op} key={op}>page {op}</option>
                        )
                    }
                </select>
            </div>
            <div className={style.result}>
                {
                    resultfirm.results && resultfirm.results.map((res, i) => <Imgresult key={i} InclickHandler={OnclickHandler} res={res} />)
                }
            </div>
        </div>
    )
}

export default ResultList;