import React from 'react';
import {Link} from "react-router-dom";
import cn from "classnames";

import chuck from "../../img/chucknorris_logo_coloured_small.png";

import "./css/index.css";

const rout = [
    {
        label: "Home",
        href: "/"
    },
    {
        label: "Profile",
        href: "/profile"
    }
];

class Header extends React.Component {


    render() {
        let currentUrl = window.location.pathname;

        return (
            <>
                <div className="chuck-img__container">
                    <img className="chuck-img" src={chuck} alt="Chuck"/>
                </div>
                <ul className="header_link-container">
                    {rout.map((item)=>{
                        let btnClass = cn(
                            "header_lint-btn",
                            {"disabled-link": currentUrl === item.href}
                        );
                        return (
                            <li key={item.href}>
                                <button className={btnClass} disabled={currentUrl === item.href}>
                                    <Link to={item.href}>{item.label}</Link>
                                </button>
                            </li>
                        )
                    })}
                </ul>
            </>
        )
    }
}

export default Header;
