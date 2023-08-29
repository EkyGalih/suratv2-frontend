import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { IoEye, IoPerson } from 'react-icons/io5'
import { useParams } from 'react-router-dom';

const DetailPegawaiView = () => {
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
  const [pensiun, setPensiun] = useState("");
  const [url, setUrl] = useState("");
  const [foto, setFoto] = useState("");
  const { id } = useParams();
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const getPegawaiById = async () => {
      const response = await axios.get(`http://localhost:5000/pegawai/${id}`);
      setNip(response.data.nip);
      setUrl(response.data.url);
      setFoto(response.data.foto);
    }
    getPegawaiById();
  }, [id]);

  return (
    <div>
      <h1 className='title'><IoPerson /> Pegawai</h1>
      <h2 className='subtitle'><IoEye /> Detail Pegawai</h2>
      <div className="card">
        <div className="card-content">
          <div className="columns">
            <div className="column is-half">
              <img src={url} alt={url} />
            </div>
            <div className="column">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet, quibusdam.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailPegawaiView