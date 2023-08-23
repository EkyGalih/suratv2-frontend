import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { IoSave } from 'react-icons/io5';

const FormUserAdd = () => {
    const [pegawai, setPegawai]= useState([]);

    const [pegawaiId, setPegawaiId] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [level, setLevel] = useState("");

    useEffect(() =>{
        getPegawai();
        
    }, []);

    const getPegawai = async() =>{
        const response = await axios.get('http://localhost:5000/pegawai');
        setPegawai(response.data);
    };

    return (
        <div>
            <h1 className='title'>Pengguna</h1>
            <h2 className='subtitle'>Tambah Pengguna Baru</h2>
            <div className="columns is-centered">
                <div className="column is-half">
                    <div className="card is-shadowless">
                        <div className="card-content">
                            <div className="content">
                                <form>
                                    <div className="field">
                                        <label className="label">Pegawai</label>
                                        <div className="control">
                                            <div className="select is-fullwidth">
                                                <select value={pegawaiId} onChange={(e)=> setPegawaiId(e.target.value)}>
                                                    <option value="">--Pilih--</option>
                                                    {pegawai.map((peg, index)=>(
                                                        <option value={peg.id}>{peg.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Username</label>
                                        <div className="control">
                                            <input type="text" className="input" value={username} onChange={(e)=> setUsername(e.target.value)} placeholder='Username' />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Password</label>
                                        <div className="control">
                                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder='******' />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Level</label>
                                        <div className="control">
                                            <div className="select is-fullwidth">
                                                <select value={level} onChange={(e)=> setLevel(e.target.value)}>
                                                    <option value="admin">Admin</option>
                                                    <option value="pimpinan">Pimpinan</option>
                                                    <option value="agendaris">Agendaris</option>
                                                    <option value="users">Users</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="control">
                                            <button className="button is-success"><IoSave className='mr-1'/> Simpan</button>
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