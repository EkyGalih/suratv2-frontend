import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { IoBusiness, IoPeople, IoPerson } from 'react-icons/io5';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const WelcomeAdmin = () => {
  const { user } = useSelector((state) => state.auth);
  const [pegawai, setPegawai] = useState(0);
  const [bidang, setBidang] = useState(0);
  const [users, setUser] = useState(0);

  useEffect(() => {
    getPegawai();
    getBidang();
    getPengguna();
  }, []);

  const getPegawai = async () => {
    const response = await axios.get('http://localhost:5000/pegawais');
    setPegawai(response.data.length);
  };

  const getBidang = async () => {
    const response = await axios.get('http://localhost:5000/bidang');
    setBidang(response.data.length);
  };

  const getPengguna = async () => {
    const response = await axios.get('http://localhost:5000/users');
    setUser(response.data.result.length);
  };

  return (
    <div>
      <h1 className='title'>Beranda</h1>
      <h2 className='subtitle'>Selamat Datang <strong>{user && user.nama_lengkap}</strong></h2>
      <div className="columns">
        <div className="column is-one-third">
          {/* PEGAWAI */}
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                <IoPeople /> Pegawai
              </p>
            </header>
            <div class="card-content">
              <div class="content">
                <h1 className='has-text-grey-dark has-text-centered'>{pegawai} Pegawai</h1>
              </div>
            </div>
            <footer class="card-footer">
              <p class="card-footer-item">
                <span>
                  <Link to='/admin/pegawai' className='has-text-info'>Lihat Daftar</Link>
                </span>
              </p>
              <p class="card-footer-item">
                <span>
                  Share on <a href="#">Facebook</a>
                </span>
              </p>
            </footer>
          </div>
        </div>


        {/* PENGGUNA */}
        <div className="column is-one-third">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                <IoPerson /> Pengguna
              </p>
            </header>
            <div class="card-content">
              <div class="content">
                <h1>{users} Pengguna</h1>
              </div>
            </div>
            <footer class="card-footer">
              <p class="card-footer-item">
                <span>
                  <Link to='/admin/users'>Lihat Daftar</Link>
                </span>
              </p>
              <p class="card-footer-item">
                <span>
                  Share on <a href="#">Facebook</a>
                </span>
              </p>
            </footer>
          </div>
        </div>

        {/* BIDANG */}
        <div className="column is-one-third">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                <IoBusiness /> Bidang
              </p>
            </header>
            <div class="card-content">
              <div class="content">
                <h1>{bidang} Bidang</h1>
              </div>
            </div>
            <footer class="card-footer">
              <p class="card-footer-item">
                <span>
                  <Link to='/admin/bidang'>Lihat Daftar</Link>
                </span>
              </p>
              <p class="card-footer-item">
                <span>
                  Share on <a href="#">Facebook</a>
                </span>
              </p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WelcomeAdmin