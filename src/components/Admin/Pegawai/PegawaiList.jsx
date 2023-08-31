import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoAdd, IoCheckboxSharp, IoClose, IoCreateOutline, IoEyeSharp, IoList, IoPerson, IoSearch, IoTrash } from 'react-icons/io5';
import ReactPaginate from 'react-paginate';

const PegawaiList = () => {
    const [pegawai, setPegawai] = useState([]);
    const [page, setPage] = useState(0);
    const limit = useState(10);
    const [pages, setPages] = useState(0);
    const [rows, setRows] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [query, setQuery] = useState("");
    const [msgPage, setMsgPage] = useState("");

    const location = useLocation();
    const navigate = useNavigate();

    const [deleteId, setDeleteId] = useState("");
    const [isModal, setModal] = useState("");
    const [msg, setMsg] = useState("");

    useEffect(() => {
        getPegawai();
        if (location.state != null) {
            setMsg(location.state.msg);
        } else {
            setMsg("");
        }
    }, [page, keyword]);

    const getPegawai = async () => {
        const response = await axios.get(`http://localhost:5000/pegawai?search_query=${keyword}&page=${page}&limit=${limit}`);
        setPegawai(response.data.result);
        setPage(response.data.page);
        setPages(response.data.totalPage);
        setRows(response.data.totalRows);
    };

    // FUNGSI HANDLE CLOSE (CLOSE MODAL)
    const handleClose = () => {
        setModal("");
    }

    // FUNGSI HANDLE CLOSE (CLOSE NOTIFICATION)
    const closeNotif = () => {
        navigate(location.state, {});
        setMsg("");
    }

    // FUNGSI UNTUK MEMBERIKAN PARAMETER KE MODAL DAN DIKIRIM KE FUNSGI handleDeleteUser
    const deletePegawai = async (pegawaiId) => {
        setDeleteId(pegawaiId);
        setModal('is-active');
    }

    // FUNGSI HAPUS USER
    const handleDeletePegawai = async () => {
        try {
            await axios.delete(`http://localhost:5000/pegawai/${deleteId}`);
            setModal("");
            getPegawai();
            setMsg("Pegawai Berhasil dihapus!");
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
    const searchPegawai = (e) => {
        e.preventDefault();
        setPage(0);
        setKeyword(query);
    };

    return (
        <div>
            <h1 className='title'><IoPerson /> Pegawai</h1>
            <h2 className='subtitle'><IoList /> Daftar Pegawai</h2>
            <div className="box mr-2">
                <div className="columns">
                    <div className="column is-two-thrids">
                        <Link to='/admin/pegawai/add' className='button is-normal is-info'><IoAdd className='mr-1' />Tambah Pegawai</Link>
                    </div>
                    <div className="column">
                        {/* FORM SEARCH DATA */}
                        <form onSubmit={searchPegawai}>
                            <div className="field has-addons">
                                <div className="control is-expanded">
                                    <input type="text" className="input" value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Cari Pegawai' />
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
                            <button className="button is-danger" onClick={handleDeletePegawai}><IoCheckboxSharp className='mr-1' /> yes</button>
                            <button className="button is-default" onClick={handleClose}><IoClose className='mr-1' /> No</button>
                        </footer>
                    </div>
                </div>

                {msg && <div className="columns is-fullwidth notification is-success is-light p-1"> <div className='column is-four-fifths'>{msg}</div> <div className="column"></div> <div className='column'><sup><button className='delete is-small has-text-right' onClick={closeNotif}>&times;</button></sup></div></div>}
                <table className='table is-striped is-fullwidth'>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama Pegawai</th>
                            <th>Nip</th>
                            <th>Jenis Pegawai</th>
                                <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pegawai.map((peg, index) => (
                            <tr key={peg.id}>
                                <td>{index + 1}</td>
                                <td>{peg.name}</td>
                                <td>{peg.nip ?? '-'}</td>
                                <td>{peg.jenis_pegawai}</td>
                                <td>
                                    <Link to={`/admin/pegawai/edit/${peg.id}`} className='button is-small is-info mr-1'><IoCreateOutline className='mr-1' /> Edit</Link>
                                    <button onClick={() => deletePegawai(peg.id)} className='button is-small is-danger mr-1'><IoTrash className='mr-1' />Hapus</button>
                                    <Link to={`/admin/pegawai/show/${peg.id}`} className='button is-small is-success'><IoEyeSharp className='mr-1' />Show</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <p>Total Pegawai {rows}, Halaman: {rows ? page + 1 : 0} of {pages}</p>
                <p className='has-text-centered has-text-danger'>{msgPage}</p>
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
        </div>
    )
}

export default PegawaiList