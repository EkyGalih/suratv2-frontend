import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {IoPerson, IoBusinessSharp, IoHome, IoLogOut, IoPeople} from "react-icons/io5"
import { useDispatch, useSelector } from 'react-redux'
import { LogOut, reset } from "../../../features/authSlice"

const SidebarAdmin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useSelector((state) => state.auth);

    const logout = () =>{
        dispatch(LogOut());
        dispatch(reset);
        navigate("/");
    }


    return (
        <div>
            <aside className="menu pl-5 pt-5 pr-6 has-shadow">
                <p className="menu-label">
                    MENU
                </p>
                <ul className="menu-list">
                    <li><NavLink to={"/admin/dashboard"} className='is-active'><IoHome/> Dashboard</NavLink></li>
                    <li><NavLink to={"/admin/pegawai"}><IoPeople/> Pegawai</NavLink></li>
                    <li><NavLink to={"/admin/users"}><IoPerson/> Users</NavLink></li>
                    <li><NavLink to={"/admin/bidang"}><IoBusinessSharp/> Bidang</NavLink></li>
                </ul>
                <p className="menu-label">
                    Setting
                </p>
                <ul className="menu-list">
                    <li><button onClick={logout} className='button is-white'><IoLogOut/> Logout</button></li>
                </ul>
            </aside>
        </div>
    )
}

export default SidebarAdmin