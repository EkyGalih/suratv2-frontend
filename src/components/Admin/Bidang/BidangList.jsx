import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { IoBusinessSharp, IoCheckboxSharp, IoClose, IoCreateOutline, IoList, IoTrash } from 'react-icons/io5'

const BidangList = () => {
    const [bidang, setBidang] = useState([]);
    const [deleteId, setDeleteId] = useState("");
    const [isModal, setModal] = useState("");
    const [msg, setMsg] = useState("");

    useEffect(() => {
        getBidang();
    }, []);

    const getBidang = async () =>{
        const response = await axios.get('http://localhost:5000/bidang');
        setBidang(response.data);
    }

    // FUNGSI HANDLE CLOSE (CLOSE MODAL)
    const handleClose = () => {
        setModal("");
    }

    // FUNGSI UNTUK MEMBERIKAN PARAMETER KE MODAL DAN DIKIRIM KE FUNSGI handleDeleteUser
    const deleteBidang = async (bidangId) => {
        setDeleteId(bidangId);
        setModal('is-active');
    }

    // FUNGSI HAPUS USER
    const handleDeleteBidang = async () => {
        try {
            await axios.delete(`http://localhost:5000/bidang/${deleteId}`);
            setModal("");
            getBidang();
        } catch (error) {
            if (error.response)
            {
                setMsg(error.response.data.msg);
            }
        }
    };

  return (
    <div>
        <h1 className='title'><IoBusinessSharp/> Bidang</h1>
            <h2 className='subtitle'><IoList/> Daftar Bidang</h2>
            <Link to="/admin/bidang/add" className='button is-primary is-small mb-2 mr-1'><IoCreateOutline/> Tambah Bidang</Link>
            <Link to="/admin/sub-bidang/add" className='button is-link is-small mb-2'><IoCreateOutline/> Tambah Sub Bidang</Link>
            
            {/* MODAL KONIFRM DELETE USER */}
            <div className={`modal ${isModal}`}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Apakah anda yakin?</p>
                        <button className="delete" aria-label="close" onClick={handleClose}></button>
                    </header>
                    <footer className="modal-card-foot">
                        <button className="button is-danger" onClick={handleDeleteBidang}><IoCheckboxSharp className='mr-1' /> yes</button>
                        <button className="button is-default" onClick={handleClose}><IoClose className='mr-1' /> No</button>
                    </footer>
                </div>
            </div>

            <p className="has-text-centered">{msg}</p>
            <table className='table is-striped is-fullwidth'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama Bidang</th>
                        <th>Jumlah Pegawai</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bidang.map((bid, index)=>(
                        <tr key={bid.id}>
                            <td>{index+1}</td>
                            <td>{bid.nama_bidang}</td>
                            <td>0</td>
                            <td>
                                <Link to={`/admin/bidang/edit/${bid.id}`} className="button is-small is-info mr-1"><IoCreateOutline className='mr-1'/> Edit</Link>
                                <button onClick={() => deleteBidang(bid.id)} className='button is-small is-danger'><IoTrash/> Hapus</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
    </div>
  )
}

export default BidangList