import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { IoBriefcase, IoBusinessSharp, IoCalendar, IoCreateOutline, IoIdCard, IoMedal, IoPower, IoQrCodeSharp, IoTrendingUp } from 'react-icons/io5'
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';

const ViewProfile = () => {
    const { id } = useParams();
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [nip, setNip] = useState("");
    const [jenis_pegawai, setJenisPegawai] = useState("");
    const [tempat_lahir, setTempatlahir] = useState("");
    const [tgl_lahir, setTglLahir] = useState("");
    const [bidangId, setBidangId] = useState("")
    const [nama_jabatan, setNamaJabatan] = useState("");
    const [sk, setSk] = useState("");
    const [pangkatId, setPangkatId] = useState("");
    const [golonganId, setGolonganId] = useState("");
    const [pegawaiId, setPegawaiId] = useState("");
    const [mkg, setMkg] = useState("");
    const [umur, setUmur] = useState("");
    const [jk, setJk] = useState("");
    const [agama, setAgama] = useState("");
    const [kp, setKp] = useState("");
    const [pensiun, setPensiun] = useState("");

    const location = useLocation();
    const navigate = useNavigate();
    const [msg, setMsg] = useState("");

    useEffect(() => {
        getUserById();
        console.log(location);
        if (location.state != null) {
            setMsg(location.state.msg);
        } else {
            setMsg("");
        }
    }, [id]);

    const getUserById = async () => {
        const response = await axios.get(`http://localhost:5000/users/${id}`);
        setImage(response.data.pegawai.url);
        setName(response.data.nama_lengkap);
        setNamaJabatan(response.data.pegawai.jabatan);
        setTempatlahir(response.data.pegawai.tempat_lahir);
        setTglLahir(response.data.pegawai.tanggal_lahir);
        setMkg(response.data.masa_kerja_golongan);
        setUmur(response.data.pegawai.umur);
        setMkg(response.data.pegawai.masa_kerja_golongan);
        setNip(response.data.pegawai.nip);
        setSk(response.data.pegawai.no_sk);
        setKp(response.data.pegawai.kenaikan_pangkat);
        setPensiun(response.data.pegawai.batas_pensiun);
        setAgama(response.data.pegawai.agama);
        setJk(response.data.pegawai.jenis_kelamin);
        setJenisPegawai(response.data.pegawai.jenis_pegawai);
        setPegawaiId(response.data.pegawaiId);

        const bidang = await axios.get(`http://localhost:5000/bidang/${response.data.pegawai.bidangId}`);
        if (bidang.data !== null) {
            setBidangId(bidang.data.nama_bidang);
        } else {
            setBidangId("");
        }

        const pangkat = await axios.get(`http://localhost:5000/pangkat/${response.data.pegawai.pangkatId}`);
        if (pangkat.data !== null) {
            setPangkatId(pangkat.data.nama_pangkat);
        } else {
            setPangkatId("");
        }

        const golongan = await axios.get(`http://localhost:5000/golongan/${response.data.pegawai.golonganId}`);
        if (golongan.data !== null) {
            setGolonganId(golongan.data.nama_golongan);
        } else {
            setGolonganId("");
        }
    }

    // FUNGSI HANDLE CLOSE (CLOSE NOTIFICATION)
    const closeNotif = () => {
        navigate(location.state, {});
        setMsg("");
    }

    return (
        <div>
            <h1 className="title"><IoIdCard /> Profile</h1>
            <div className="box">
                <div className="columns is-fullwidth">
                    {msg && <div className="columns is-fullwidth notification is-success is-light p-1"> <div className='column is-four-fifths'>{msg}</div> <div className="column"></div> <div className='column'><sup><button className='delete is-small has-text-right' onClick={closeNotif}>&times;</button></sup></div></div>}
                    <div className="column is-half">
                        <div class="card">
                            <div class="card-image">
                                <figure class="image is-4by6">
                                    <img src={image} alt={name} />
                                </figure>
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <h2 className="title is-2"><IoIdCard /> {name}</h2>
                        <h4 className="subtitle is-4"><IoQrCodeSharp /> {nip ?? '-'} {golonganId === "" ? '' : +'(' + golonganId + " - " + pangkatId + ')'}</h4>
                        <h4 className="subtitle is-5"><IoBusinessSharp /> Bidang {bidangId}</h4>
                        <p className="subtitle is-5"><IoBriefcase /> {nama_jabatan}</p>
                        <p><IoCalendar /> {tempat_lahir + ', ' + tgl_lahir + ' (' + umur + ' Tahun)'}</p>
                        <p><IoMedal /> Nomor SK: {sk ?? '-'} ({mkg ?? '-'})</p>
                        {jenis_pegawai === 'pns' ? <p><IoTrendingUp /> {kp}</p> : ''}
                        {jenis_pegawai === 'pns' ? <p><IoPower /> Pensiun Tahun {pensiun}</p> : ''}
                        <div className="columns column is-one-fifth mt-2">
                            <div className="tag is-success mr-2">{jk ?? '-'}</div>
                            <div className="tag is-success mr-2">{agama ?? '-'}</div>
                            <div className="tag is-success mr-2">{jenis_pegawai ?? '-'}</div>
                        </div>
                        <div className="columns is-fullwidth">
                            <div className="column is-two-fitfhs">
                                <Link to={`/admin/pegawai/edit/${pegawaiId}`} className='button is-info is-small is-outlined'><IoCreateOutline /> Edit</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewProfile