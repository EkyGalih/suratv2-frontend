import React from 'react'
import { Link, NavLink, useNavigate } from "react-router-dom"
import logo from "./logo.png"
import { useDispatch, useSelector } from 'react-redux'
import { LogOut, reset } from "../../../features/authSlice"
import { IoApps, IoIdCard, IoLogInOutline } from 'react-icons/io5'

const NavbarAdmin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    const logout = () => {
        dispatch(LogOut());
        dispatch(reset);
        navigate("/");
    }
    return (
        <div>
            <nav className="navbar is-fixed-top has-shadow" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <NavLink to="/dashboard" className="navbar-item">
                        <img src={logo} width="112" height="28" alt='logo' />
                    </NavLink>

                    <a href='!#' role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="navbar-item has-dropdown is-hoverable mr-5">
                                <a className="navbar-link" href="https://bulma.io/documentation/overview/start/">
                                    <IoApps className='mr-1'/> Tools
                                </a>
                                <div className="navbar-dropdown is-boxed">
                                    <Link className='navbar-item' to={`/admin/profile/${user && user.id}`}>
                                        <IoIdCard className='mr-1'/> Profile
                                    </Link>
                                    <hr className="navbar-divider" />
                                    <div className="buttons">
                                        <button onClick={logout} className="button is-text">
                                            <IoLogInOutline className='mr-1' /> Keluar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavbarAdmin