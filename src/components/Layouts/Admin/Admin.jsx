import React from 'react'
import { useSelector } from 'react-redux'

const WelcomeAdmin = () => {
  const {user} = useSelector((state) => state.auth);
  return (
    <div>
        <h1 className='title'>Beranda</h1>
        <h2 className='subtitle'>Selamat Datang <strong>{user && user.nama_lengkap}</strong></h2>
    </div>
  )
}

export default WelcomeAdmin