import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/Navbar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// Cài đặt và import Fontawesome để lấy hình search
const Navbar = () => {
    const navi = useNavigate()
    const [state, setstate] = useState()
    // Add sự kiện cuộn cho window
    window.addEventListener("scroll", function () {
        if (this.window.scrollY > 100) {
            setstate("background")
        } else setstate()
    })
    return (
        <div className={`navbarfixed ${state ? state : ""}`}>
            <div className="navbar">
                <h2 onClick={() => navi("/")}>Movie App</h2>
                <FontAwesomeIcon onClick={() => navi("/search")}
                    style={{ width: "30px", height: "30px", fontWeight: "400", color: "white", marginRight: "50px" }} icon="fa-solid fa-magnifying-glass" />
            </div>
        </div>

    )
}

export default Navbar;