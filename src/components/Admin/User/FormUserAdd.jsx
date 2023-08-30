import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { IoPeople, IoPersonAdd, IoPlayBack, IoSave } from 'react-icons/io5'

const FormUserAdd = () => {
    const [pegawai, setPegawai] = useState([]);

    const [pegawaiId, setPegawaiId] = useState("");
    const [nama, setNama] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [level, setLevel] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getPegawai();
    }, []);

    const getPegawai = async () => {
        const response = await axios.get('http://localhost:5000/pegawais');
        setPegawai(response.data);
    };

    const handleChange = async (e) => {
        const pegId = e.target.value;
        const response = await axios.get(`http://localhost:5000/pegawai/${pegId}`);
        setPegawaiId(response.data.id);
        setNama(response.data.name);
        setUsername(response.data.nip);
        setPassword(response.data.nip);
        setConfPassword(response.data.nip);
    }

    const saveUser = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/users', {
                pegawaiId: pegawaiId,
                nama_lengkap: nama,
                username: username,
                password: password,
                confPassword: confPassword,
                level: level
            });
            navigate("/admin/users", {state: {msg: "Pengguna berhasil dibuat!"}});
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }

    return (
        <div>
            <h1 className='title'><IoPeople/> Pengguna</h1>
            <h2 className='subtitle'><IoPersonAdd/> Tambah Pengguna Baru</h2>
            <div className="columns is-centered">
                <div className="column is-half">
                    <div className="card is-shadowless">
                        <div className="card-content">
                            <div className="content">
                                <form onSubmit={saveUser}>
                                {msg && <p className='has-text-centered notification is-danger'>{msg}</p>}
                                    <div className="field">
                                        <label className="label">Pegawai</label>
                                        <div className="control">
                                            <div className="select is-fullwidth">
                                                <select onChange={handleChange}>
                                                    <option value="">--Pilih--</option>
                                                    {pegawai.map((peg, index) => (
                                                        <option key={index} value={peg.id}>{peg.name}</option>
                                                    ))}
                                                </select>
                                                <input type="hidden" value={pegawaiId} onChange={(e) => setPegawaiId(e.target.value)} className="input" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Nama Lengkap</label>
                                        <div className="control">
                                            <input type="text" className="input" value={nama} onChange={(e) => setNama(e.target.value)} placeholder='Nama Lengkap' />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Username</label>
                                        <div className="control">
                                            <input type="text" className="input" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Password</label>
                                        <div className="control">
                                            <input type="text" placeholder='*****' value={password} onChange={(e) => setPassword(e.target.value)} className="input" />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Confirm Password</label>
                                        <div className="control">
                                            <input type="text" placeholder='*****' value={confPassword} onChange={(e) => setConfPassword(e.target.value)} className="input" />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Level</label>
                                        <div className="control">
                                            <div className="select is-fullwidth">
                                                <select value={level} onChange={(e) => setLevel(e.target.value)}>
                                                    <option value="">--Pilih--</option>
                                                    <option value="admin">Admin</option>
                                                    <option value="pimpinan">Pimpinan</option>
                                                    <option value="agendaris">Agendaris</option>
                                                    <option value="user">Users</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="control">
                                            <button className="button is-success mr-1"><IoSave className='mr-1' /> Simpan</button>
                                            <Link to="/admin/users" className='button button-default'><IoPlayBack className='mr-1' />Kembali</Link>
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

export default FormUserAdd