import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { IoAdd, IoCheckboxSharp, IoClose, IoCreate, IoCreateOutline, IoEyeSharp, IoList, IoPerson, IoTrash } from 'react-icons/io5';

const PegawaiList = () => {
    const [pegawai, setPegawai] = useState([]);
    const [deleteId, setDeleteId] = useState("");
    const [isModal, setModal] = useState("");
    const [msg, setMsg] = useState("");

    useEffect(() => {
        getPegawai();
    }, []);

    const getPegawai = async () => {
        const response = await axios.get('http://localhost:5000/pegawai');
        setPegawai(response.data);
    };

    // FUNGSI HANDLE CLOSE (CLOSE MODAL)
    const handleClose = () => {
        setModal("");
    }

    // FUNGSI UNTUK MEMBERIKAN PARAMETER KE MODAL DAN DIKIRIM KE FUNSGI handleDeleteUser
    const deletePegawai = async (pegawaiId) => {
        setDeleteId(pegawaiId);
        setModal('is-active');
    }

    // FUNGSI HAPUS USER
    const handleDeletePegawai = async () => {
        try {
            await axios.delete(`http://localhost:5000/bidang/${deleteId}`);
            setModal("");
            getPegawai();
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    };

    return (
        <div>
            <h1 className='title'><IoPerson /> Pegawai</h1>
            <h2 className='subtitle'><IoList /> Daftar Pegawai</h2>
            <Link to='/admin/pegawai/add' className='button is-small is-success mb-2'><IoAdd className='mr-1' />Tambah Pegawai</Link>

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

            <p className="has-text-centered">{msg}</p>
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
                                <Link to={`/admin/pegawai/show/${peg.id}`} className='button is-small is-primary is-light'><IoEyeSharp className='mr-1'/>Show</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default PegawaiList