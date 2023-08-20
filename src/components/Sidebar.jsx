import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div>
            <aside className="menu has-shadow">
                <p className="menu-label">
                    General
                </p>
                <ul className="menu-list">
                    <li><NavLink to={"/dashboard"}>Dashboard</NavLink></li>
                    <li><NavLink to={"/pegawai"}>Pegawai</NavLink></li>
                </ul>
                <p className="menu-label">
                    Administration
                </p>
                <ul className="menu-list">
                    <li><NavLink to={"/users"}>Users</NavLink></li>
                    <li>
                        <NavLink className="is-active">Manage Your Team</NavLink>
                        <ul>
                            <li><NavLink>Members</NavLink></li>
                            <li><NavLink>Plugins</NavLink></li>
                            <li><NavLink>Add a member</NavLink></li>
                        </ul>
                    </li>
                    <li><NavLink>Invitations</NavLink></li>
                    <li><NavLink>Cloud Storage Environment Settings</NavLink></li>
                    <li><NavLink>Authentication</NavLink></li>
                </ul>
                <p className="menu-label">
                    Transactions
                </p>
                <ul className="menu-list">
                    <li><NavLink>Payments</NavLink></li>
                    <li><NavLink>Transfers</NavLink></li>
                    <li><button className='button is-white'>Logout</button></li>
                </ul>
            </aside>
        </div>
    )
}

export default Sidebar