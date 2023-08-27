import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { IoAddSharp, IoBusinessSharp, IoPlayBack, IoSave } from 'react-icons/io5'

const FormAddBidang = () => {
    const [nama_bidang, setNamaBidang] = useState("");
    const [sub_bidang, setSubBidang] = useState("tes");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const saveBidang = async (e) =>{
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/bidang', {
                nama_bidang: nama_bidang,
                sub_bidang: sub_bidang
            });
            navigate('/admin/bidang');
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);;
            }
        }
    }

    return (
        <div>
            <h1 className='title'><IoBusinessSharp/> Bidang</h1>
            <h2 className='subtitle'><IoAddSharp/> Tambah Bidang Baru</h2>
            <div className="columns is-centered">
                <div className="column is-half">
                    <div className="card is-shadowless">
                        <div className="card-content">
                            <div className="content">
                                {msg && <p className='has-text-centered notification is-danger'>{msg}</p>}
                                <form onSubmit={saveBidang}>
                                    <div className="field">
                                        <label className="label">Nama Bidang</label>
                                        <div className="control">
                                            <input type="text" className="input" value={nama_bidang} onChange={(e) => setNamaBidang(e.target.value)} placeholder='Nama Bidang' />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="control">
                                            <button type='submit' className="button is-success mr-1"><IoSave className='mr-1'/> Simpan</button>
                                            <Link to='/admin/bidang' className='button is-default'><IoPlayBack className='mr-1'/> Kembali</Link>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormAddBidang