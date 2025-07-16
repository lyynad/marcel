import "./Header.css"

import logo from "../assets/logo.png";

function Header () {
    return (
        <div className="header-container">
            <img className="logo" src={logo} alt="logo" />
            <div className="header-items">
                <p className="header-item header-item-search">SEARCH</p>
                <div className="items-divider"></div>
                <p className="header-item header-item-about">ABOUT</p>
            </div>
        </div>
    )
}

export default Header;