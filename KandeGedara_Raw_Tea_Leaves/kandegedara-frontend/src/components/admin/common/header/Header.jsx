import React from 'react';
import './admin-header.css'
import logo from '../../../../assets/image/logo/logo.svg'
import {Link} from "react-router-dom";


function Header() {
    return (
        <div className="wrapper">
            <div className="top_navbar">
                <div className="hamburger">
                    <div className="one"/>
                    <div className="two"/>
                    <div className="three"/>
                </div>
                <div className="col-12 top_menu">
                    <div className="col-7  d-flex justify-content-end">
                        <img src={logo} alt=""/>
                    </div>
                    <div className="col-5 d-flex justify-content-end">
                        <ul className="mb-0">
                            <li className="mt-1">
                                <p className="d-inline me-2"><i className="fa fa-sign-out logoutIcon"
                                                                aria-hidden="true"/>
                                </p>
                                <p className="d-inline ms-2 me-2 fw-bold profileText">Indudini</p>
                            </li>
                            <li>
                                <Link to="/">
                                    <i className="fas fa-user"/>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Header;