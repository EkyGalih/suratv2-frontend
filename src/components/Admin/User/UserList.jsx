import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        const response = await axios.get('http://localhost:5000/users');
        setUsers(response.data);
    };

    const deleteUser = async (userId) =>{
        await axios.delete(`http://localhost:5000/users/${userId}`);
        getUsers();
    };

    return (
        <div>
            <h1 className='title'>Pengguna</h1>
            <h2 className='subtitle'>Daftar Pengguna</h2>
            <Link to="/admin/users/add" className='button is-primary mb-2'>Tambah Pengguna</Link>
            <table className='table is-striped is-fullwidth'>
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
                            <td>{index+1}</td>
                            <td>{user.nama_lengkap}</td>
                            <td>{user.username}</td>
                            <td>{user.level}</td>
                            <td>
                                <Link to={`/users/edit/${user.id}`} className='button is-small is-info'>Edit</Link>
                                <button onClick={()=> deleteUser(user.id)} className='button is-small is-danger'>Hapus</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default UserList