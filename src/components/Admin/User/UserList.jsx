import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { IoAdd, IoCheckboxSharp, IoClose, IoCreateOutline, IoList, IoPeople, IoTrash } from 'react-icons/io5';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [deleteId, setDeleteId] = useState("");
    const [isModal, setModal] = useState("");
    const [msg, setMsg] = useState("");

    useEffect(() => {
        getUsers();
    }, []);

    // FUNGSI GET USER
    const getUsers = async () => {
        const response = await axios.get('http://localhost:5000/users');
        setUsers(response.data);
    };

    // FUNGSI HANDLE CLOSE (CLOSE MODAL)
    const handleClose = () => {
        setModal("");
    }

    // FUNGSI UNTUK MEMBERIKAN PARAMETER KE MODAL DAN DIKIRIM KE FUNSGI handleDeleteUser
    const deleteUser = async (userId) => {
        setDeleteId(userId);
        setModal('is-active');
    }

    // FUNGSI HAPUS USER
    const handleDeleteUser = async () => {
        try {
            await axios.delete(`http://localhost:5000/users/${deleteId}`);
            setModal("");
            getUsers();
        } catch (error) {
            if (error.response)
            {
                setMsg(error.response.data.msg);
            }
        }
    };

    return (
        <div>
            <h1 className='title'><IoPeople/> Pengguna</h1>
            <h2 className='subtitle'><IoList/> Daftar Pengguna</h2>
            <Link to="/admin/users/add" className='button is-primary is-small mb-2'><IoAdd /> Tambah Pengguna</Link>

            {/* MODAL KONIFRM DELETE USER */}
            <div className={`modal ${isModal}`}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Apakah anda yakin?</p>
                        <button className="delete" aria-label="close" onClick={handleClose}></button>
                    </header>
                    <footer className="modal-card-foot">
                        <button className="button is-danger" onClick={handleDeleteUser}><IoCheckboxSharp className='mr-1' /> yes</button>
                        <button className="button is-default" onClick={handleClose}><IoClose className='mr-1' /> No</button>
                    </footer>
                </div>
            </div>

            <p className="has-text-centered">{msg}</p>
            <table className='table is-striped is-hoverable is-fullwidth'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama Pengguna</th>
                        <th>Username</th>
                        <th>Level</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.nama_lengkap}</td>
                            <td>{user.username}</td>
                            <td>{user.level}</td>
                            <td>
                                <Link to={`/admin/users/edit/${user.id}`} className='button is-small is-info mr-1'><IoCreateOutline /> Edit</Link>
                                <button onClick={() => deleteUser(user.id)} className='button is-small is-danger'><IoTrash /> Hapus</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default UserList