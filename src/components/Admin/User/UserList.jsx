import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import axios from 'axios'
import { IoAdd, IoCheckboxSharp, IoClose, IoCreateOutline, IoList, IoPeople, IoSearch, IoTrash } from 'react-icons/io5';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);
    const limit = useState(11);
    const [pages, setPages] = useState(0);
    const [rows, setRows] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [query, setQuery] = useState("");
    const [msgPage, setMsgPage] = useState("");

    const [deleteId, setDeleteId] = useState("");
    const [isModal, setModal] = useState("");
    const [msg, setMsg] = useState("");

    useEffect(() => {
        getUsers();
    }, [page, keyword]);

    // FUNGSI GET USER
    const getUsers = async () => {
        const response = await axios.get(`http://localhost:5000/users?search_query=${keyword}&page=${page}&limit=${limit}`);
        setUsers(response.data.result);
        setPage(response.data.page);
        setPages(response.data.totalPage);
        setRows(response.data.totalRows);
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
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    };

    // fungsi ganti halaman
    const changePage = ({ selected }) => {
        setPage(selected);
        if (selected === 9) {
            setMsgPage("Jika tidak menemukan data yang Anda cari, silahkan cari data dengan kata kunci spesifik!");
        } else {
            setMsgPage("");
        }
    };

    // fungsi cari data
    const searchData = (e) => {
        e.preventDefault();
        setPage(0);
        setKeyword(query);
    };

    return (
        <div>
            <h1 className='title'><IoPeople /> Pengguna</h1>
            <h2 className='subtitle'><IoList /> Daftar Pengguna</h2>
            <div className="columns">
                <div className="column is-two-thirds">
                    <Link to="/admin/users/add" className='button is-primary is-small'><IoAdd /> Tambah Pengguna</Link>
                </div>
                <div className="column">
                    {/* FORM SEARCH DATA */}
                    <form onSubmit={searchData}>
                        <div className="field has-addons">
                            <div className="control is-expanded">
                                <input type="text" className="input" value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Cari Pengguna' />
                            </div>
                            <div className="control">
                                <button className="button is-info" type='submit'><IoSearch /> Cari</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

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
            <p>Total Data: {rows}, Halaman: {rows ? page + 1 : 0} of {pages}</p>
            <p className='has-text-centered has-text-danger'>{msg}</p>
            <nav className="pagination is-centered" key={rows} role='navigation' aria-label='pagination'>
                <ReactPaginate
                    previousLabel={"< Prev"}
                    nextLabel={"Next >"}
                    pageCount={Math.min(10, pages)}
                    onPageChange={changePage}
                    containerClassName={"pagination-list"}
                    pageLinkClassName={"pagination-link"}
                    previousLinkClassName={"pagination-previous"}
                    nextLinkClassName={"pagination-next"}
                    activeLinkClassName={"pagination-link is-current"}
                    disabledLinkClassName={"pagination-link is-disabled"}
                />
            </nav>
        </div>
    )
}

export default UserList