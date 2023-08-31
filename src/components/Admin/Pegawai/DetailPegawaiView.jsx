import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { IoBriefcase, IoBusinessSharp, IoCalendar, IoIdCard, IoMedal, IoPlayBack, IoPower, IoQrCodeSharp, IoTimer, IoTrendingUp } from 'react-icons/io5'
import { Link, useParams } from 'react-router-dom';

const DetailPegawaiView = () => {
  const [nip, setNip] = useState("");
  const [name, setName] = useState("");
  const [jenis_pegawai, setJenisPegawai] = useState("");
  const [tempat_lahir, setTempatlahir] = useState("");
  const [tgl_lahir, setTglLahir] = useState("");
  const [bidangId, setBidangId] = useState("")
  const [nama_jabatan, setNamaJabatan] = useState("");
  const [sk, setSk] = useState("");
  const [pangkatId, setPangkatId] = useState("");
  const [golonganId, setGolonganId] = useState("");
  const [mkg, setMkg] = useState("");
  const [umur, setUmur] = useState("");
  const [jk, setJk] = useState("");
  const [agama, setAgama] = useState("");
  const [kp, setKp] = useState("");
  const [pensiun, setPensiun] = useState("");
  const [url, setUrl] = useState("");
  const [foto, setFoto] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const getPegawaiById = async () => {
      const response = await axios.get(`http://localhost:5000/pegawai/${id}`);
      setName(response.data.name);
      setNamaJabatan(response.data.jabatan);
      setTempatlahir(response.data.tempat_lahir);
      setTglLahir(response.data.tanggal_lahir);
      setMkg(response.data.masa_kerja_golongan);
      setUmur(response.data.umur);
      setNip(response.data.nip);
      setUrl(response.data.url);
      setFoto(response.data.foto);
      setSk(response.data.no_sk);
      setKp(response.data.kenaikan_pangkat);
      setPensiun(response.data.batas_pensiun);
      setAgama(response.data.agama);
      setJk(response.data.jenis_kelamin);
      setJenisPegawai(response.data.jenis_pegawai);
      setBidangId(response.data.bidang.nama_bidang);
      setPangkatId(response.data.pangkat.nama_pangkat);
      setGolonganId(response.data.Golongan.nama_golongan);
    }
    getPegawaiById();
  }, [id]);

  return (
    <div>
      <h1 className='title'> Pegawai</h1>
      <h2 className='subtitle'> Detail Pegawai</h2>
      <div className="columns">
        <div className="column is-four-fifths"></div>
        <div className="column"></div>
        <div className="column">
          <Link to={'/admin/pegawai'} className='button is-normal is-default'><IoPlayBack className='mr-1' /> Kembali</Link>
        </div>
      </div>
      <div className="card">
        <div className="card-content">
          <div className="columns">
            <div className="column is-half">
              <img src={url} alt={url} />
            </div>
            <div className="column">
              <h2 className="title is-2"><IoIdCard /> {name}</h2>
              <h4 className="subtitle is-4"><IoQrCodeSharp/> {nip ?? '-'} ({golonganId+" - "+pangkatId})</h4>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailPegawaiView