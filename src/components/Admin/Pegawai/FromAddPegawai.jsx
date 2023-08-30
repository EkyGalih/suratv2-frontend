import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoAdd, IoAddSharp, IoPeople, IoPlayBack } from 'react-icons/io5'
import axios from 'axios';

const FromAddPegawai = () => {
    const [bidang, setBidang] = useState([]);
    const [pangkat, setPangkat] = useState([]);
    const [golongan, setGolongan] = useState([]);

    const [nip, setNip] = useState("");
    const [name, setName] = useState("");
    const [jenis_pegawai, setJenisPegawai] = useState("");
    const [tempat_lahir, setTempatlahir] = useState("");
    const [tgl_lahir, setTglLahir] = useState("");
    const [bidangId, setBidangId] = useState("");
    const [jabatan, setJabatan] = useState("");
    const [nama_jabatan, setNamaJabatan] = useState("");
    const [sk, setSk] = useState("");
    const [bank, setBank] = useState("");
    const [rekening, setRekening] = useState("");
    const [pangkatId, setPangkatId] = useState("");
    const [golonganId, setGolonganId] = useState("");
    const [mkg, setMkg] = useState("");
    const [diklat, setDiklat] = useState("");
    const [pendidikan, setPendidikan] = useState("");
    const [umur, setUmur] = useState("");
    const [jk, setJk] = useState("");
    const [agama, setAgama] = useState("");
    const [kp, setKp] = useState("");
    const [pensiun, setPensiun] = useState(0);
    const [foto, setFoto] = useState("");
    const [preview, setPreview] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const responseBidang = await axios.get('http://localhost:5000/bidang');
        const responsePangkat = await axios.get('http://localhost:5000/pangkat');
        const responseGolongan = await axios.get('http://localhost:5000/golongan');
        setBidang(responseBidang.data);
        setPangkat(responsePangkat.data);
        setGolongan(responseGolongan.data);
    };

    // Load Image preview
    const loadImage = (e) => {
        const image = e.target.files[0];
        setFoto(image);
        setPreview(URL.createObjectURL(image));
    };

    const savePegawai = async(e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("nip", nip);
        formData.append("jenis_pegawai", jenis_pegawai);
        formData.append("name", name);
        formData.append("tempat_lahir", tempat_lahir);
        formData.append("tanggal_lahir", tgl_lahir);
        formData.append("nama_jabatan", nama_jabatan);
        formData.append("jabatan", jabatan);
        formData.append("initial_jabatan", jabatan);
        formData.append("masa_kerja_golongan", mkg);
        formData.append("diklat", diklat);
        formData.append("pendidikan", pendidikan);
        formData.append("no_sk", sk);
        formData.append("no_rekening", rekening);
        formData.append("nama_rekening", bank);
        formData.append("umur", umur);
        formData.append("jenis_kelamin", jk);
        formData.append("agama", agama);
        formData.append("foto", foto);
        formData.append("kenaikan_pangkat", kp);
        formData.append("batas_pensiun", pensiun);
        formData.append("pangkatId", pangkatId);
        formData.append("golonganId", golonganId);
        formData.append("bidangId", bidangId);
        
        try {
            await axios.post("http://localhost:5000/pegawai", formData, {
                "Content-type": "multipart/form-data"
            });
            navigate("/admin/pegawai", {state: {msg: "Pegawai berhasil dibuat!"}});
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }

    return (
        <div>
            <h1 className='title'><IoPeople /> Pegawai</h1>
            <h2 className='subtitle'><IoAddSharp /> Tambah Pegawai baru</h2>
            <div className="columns is-centered">
                <div className="column is-fullwidth">
                    <div className="card is-shadowless">
                        <div className="card-content">
                            <div className="content">
                                <form onSubmit={savePegawai}>
                                    <p className='has-text-centered has-text-danger'>{msg}</p>
                                    <div className="field">
                                        <div className="columns">
                                            <div className="column is-half">
                                                <div className="field">
                                                    <div className="control">
                                                        <input type="hidden" className="input" />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    <label className="label">NIP</label>
                                                    <div className="control">
                                                        <input type="number" className="input" value={nip} onChange={(e) => setNip(e.target.value)} placeholder="NIP" />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    <label className="label">Nama Pegawai <sup className='has-text-danger'>*</sup></label>
                                                    <div className="control">
                                                        <input type="text" className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama Pegawai" />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    <label className="label">Jenis Pegawai <sup className='has-text-danger'>*</sup></label>
                                                    <div className="control">
                                                        <div className="select is-fullwidth">
                                                            <select value={jenis_pegawai} onChange={(e) => setJenisPegawai(e.target.value)}>
                                                                <option value="">-----</option>
                                                                <option value="pns">PNS</option>
                                                                <option value="kontrak">Tenaga Kontrak</option>
                                                                <option value="ptt">PTT</option>
                                                                <option value="p3k">PPPK</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    <label className="label">Tempat/Tanggal Lahir <sup className='has-text-danger'>*</sup></label>
                                                    <div className="control">
                                                        <div className="columns">
                                                            <div className="column is-three-quarters">
                                                                <input type="text" className="input" value={tempat_lahir} onChange={(e) => setTempatlahir(e.target.value)} placeholder='Tempat Lahir' />
                                                            </div>
                                                            <div className="column is-one-quarter">
                                                                <input type="date" className="input" value={tgl_lahir} onChange={(e) => setTglLahir(e.target.value)} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    <label className="label">Bidang <sup className='has-text-danger'>*</sup></label>
                                                    <div className="control">
                                                        <div className="select is-fullwidth">
                                                            <select value={bidangId} onChange={(e) => setBidangId(e.target.value)}>
                                                                <option value="">------</option>
                                                                {bidang.map((bid) => (
                                                                    <option key={bid.id} value={bid.id}>{bid.nama_bidang}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    <label className="label">Jabatan <sup className='has-text-danger'>*</sup></label>
                                                    <div className="control">
                                                        <div className="select is-fullwidth">
                                                            <select value={nama_jabatan} onChange={(e) => setNamaJabatan(e.target.value)}>
                                                                <option value="">------</option>
                                                                <option value="pegawai">Pegawai</option>
                                                                <option value="kaban">Kaban</option>
                                                                <option value="sekabn">Sekban</option>
                                                                <option value="kabag">Kabag</option>
                                                                <option value="kasubag">Kasubag</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    <label className="label">Nama Jabatan</label>
                                                    <div className="control">
                                                        <input type="text" className="input" value={jabatan} onChange={(e) => setJabatan(e.target.value)} placeholder="Jabatan" />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    <label className="label">No SK</label>
                                                    <div className="control">
                                                        <input type="text" className="input" value={sk} onChange={(e) => setSk(e.target.value)} placeholder="nomor SK" />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    <label className="label">Bank Akun</label>
                                                    <div className="columns">
                                                        <div className="column is-half">
                                                            <div className="control">
                                                                <div className="select is-fullwidth">
                                                                    <select value={bank} onChange={(e) => setBank(e.target.value)}>
                                                                        <option value="">-----</option>
                                                                        <option value="ntb">Bank NTB</option>
                                                                        <option value="bni">Bank BNI</option>
                                                                        <option value="bri">Bank BRI</option>
                                                                        <option value="mandiri">Bank MANDIRI</option>
                                                                        <option value="bca">Bank BCA</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="column is-half">
                                                            <div className="control">
                                                                <input type="text" className="input" value={rekening} onChange={(e) => setRekening(e.target.value)} placeholder='Nomor Rekening' />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    <label className="label">Pangkat / Golongan</label>
                                                    <div className="columns">
                                                        <div className="column is-half">
                                                            <div className="control">
                                                                <div className="select is-fullwidth">
                                                                    <select value={pangkatId} onChange={(e) => setPangkatId(e.target.value)}>
                                                                        <option value="">--------</option>
                                                                        {pangkat.map((pan) => (
                                                                            <option key={pan.id} value={pan.id}>{pan.nama_pangkat}</option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="column is-half">
                                                            <div className="control">
                                                                <div className="select is-fullwidth">
                                                                    <select value={golonganId} onChange={(e) => setGolonganId(e.target.value)}>
                                                                        <option value="">--------</option>
                                                                        {golongan.map((gol) => (
                                                                            <option key={gol.id} value={gol.id}>{gol.nama_golongan}</option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="column is-half">
                                                <div className="field mt-3">
                                                    <label className="label">Diklat</label>
                                                    <div className="control">
                                                        <textarea className='textarea' placeholder='Diklat' value={diklat} onChange={(e) => setDiklat(e.target.value)}></textarea>
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    <label className="label">Masa Kerja Golongan</label>
                                                    <div className="control">
                                                        <input type="text" className="input" value={mkg} onChange={(e) => setMkg(e.target.value)} placeholder="Masa Kerja Golongan" />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    <label className="label">Pendidikan</label>
                                                    <div className="control">
                                                        <input type="text" className="input" value={pendidikan} onChange={(e) => setPendidikan(e.target.value)} placeholder="Pendidikan" />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    <label className="label">Umur <sup className='has-text-danger'>*</sup></label>
                                                    <div className="control">
                                                        <input type="number" className="input" value={umur} onChange={(e) => setUmur(e.target.value)} placeholder="Umur" />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    <label className="label">Jenis Kelamin <sup className='has-text-danger'>*</sup></label>
                                                    <div className="control">
                                                        <div className="select is-fullwidth">
                                                            <select value={jk} onChange={(e) => setJk(e.target.value)}>
                                                                <option value="-">--------</option>
                                                                <option value="pria">Pria</option>
                                                                <option value="wanita">Wanita</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    <label className="label">Agama <sup className='has-text-danger'>*</sup></label>
                                                    <div className="control">
                                                        <div className="select is-fullwidth">
                                                            <select value={agama} onChange={(e) => setAgama(e.target.value)}>
                                                                <option value="-">--------</option>
                                                                <option value="islam">Islam</option>
                                                                <option value="hindu">hindu</option>
                                                                <option value="kristen">kristen</option>
                                                                <option value="budha">budha</option>
                                                                <option value="konghucu">konghucu</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    <label className="label">Kenaikan Pangkat</label>
                                                    <div className="control">
                                                        <input type="text" className="input" value={kp} onChange={(e) => setKp(e.target.value)} placeholder="Kenaikan Pangkat" />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    <label className="label">Tahun Pensiun</label>
                                                    <div className="control">
                                                        <input type="number" className="input" value={pensiun} onChange={(e) => setPensiun(e.target.value)} placeholder="Tahun Pensiun" />
                                                    </div>
                                                </div>
                                                <div className="columns is-fullwidth">
                                                    <div className="column is-one-third">
                                                        <div className="field">
                                                            <label className="label">Foto</label>
                                                            <div className="control">
                                                                <div className="columns">
                                                                    <div className="column is-three-quarters">
                                                                        <div className="file">
                                                                            <label className="file-label">
                                                                                <input type="file" className="file-input" onChange={loadImage} />
                                                                                <span className='file-cta'>
                                                                                    <span className='file-label'>Pilih File</span>
                                                                                </span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="column">
                                                        {preview ? (
                                                            <figure className='image is-128x128'>
                                                                <img src={preview} alt="Prewview Image" />
                                                            </figure>
                                                        ) : (
                                                            ""
                                                        )}
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <div className="field">
                                        <div className="control">
                                            <button type="submit" className="button is-success mr-2"><IoAdd /> Simpan</button>
                                            <Link to="/admin/pegawai" className='button is-default'><IoPlayBack className='mr-1' />Kembali</Link>
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

export default FromAddPegawai