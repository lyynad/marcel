import "./Header.css"

import logo from "../assets/logo.png";

import { Link } from "react-router-dom";

function Header () {
    return (
        <div className="header-container">
            <img className="logo" src={logo} alt="logo" />
            <div className="header-items">
                <Link to = "/">
                    <p className="header-item header-item-search">SEARCH</p>
                </Link>
                <div className="items-divider"></div>
                <Link to="/about" className="header-item header-item-home">
                    <p className="header-item header-item-about">ABOUT</p>
                </Link>
            </div>
        </div>
    )
}

export default Header;