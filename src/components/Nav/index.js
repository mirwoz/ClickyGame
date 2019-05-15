import React from "react";
import "./style.css";

// Component for the Navbar

function Nav(props) {
    return (
        <nav className="navbar">
            <a href="/">Clicky Game</a>
            <ul>
                <li className="brand">
                    Score: {props.score} | Top Score: {props.topScore}
                </li>
            </ul>
        </nav>
    );
}

export default Nav;
