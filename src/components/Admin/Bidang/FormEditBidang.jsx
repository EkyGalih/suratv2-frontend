import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { IoPlayBack, IoSave } from 'react-icons/io5'
import axios from 'axios'

const FormEditBidang = () => {
    const [nama_bidang, setNamaBidang] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        const getBidangById = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/bidang/${id}`);
                setNamaBidang(response.data.nama_bidang);
            } catch (error) {
                if (error.response) {
                    setMsg(error.response.data);
                }
            }
        }
        getBidangById();
    }, [id]);

    const updateBidang = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/bidang/${id}`, {
                nama_bidang: nama_bidang
            });
            navigate('/admin/bidang');
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }

    return (
        <div>
            <h1 className='title'>Bidang</h1>
            <h2 className='subtitle'>Edit Bidang</h2>
            <div className="columns is-centered">
                <div className="column is-half">
                    <div className="card is-shadowless">
                        <div className="card-content">
                            <div className="content">
                                <form onSubmit={updateBidang}>
                                {msg && <p className='has-text-centered notification is-danger'>{msg}</p>}
                                    <div className="field">
                                        <label className="label">Nama Bidang</label>
                                        <div className="control">
                                            <input type="text" className="input" value={nama_bidang} onChange={(e) => setNamaBidang(e.target.value)} placeholder='Nama bidang' />
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

export default FormEditBidang