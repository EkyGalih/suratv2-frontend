import React, { useEffect } from 'react'
import LayoutAdmin from '../../Layouts/Admin/LayoutAdmin'
import PegawaiList from '../../../components/Admin/Pegawai/PegawaiList'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../../../features/authSlice';

const Pegawai = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
    if (user && user.level !== 'admin') {
      navigate(-1);
    }
  }, [isError, user, navigate]);

  return (
    <LayoutAdmin>
        <PegawaiList/>
    </LayoutAdmin>
  )
}

export default Pegawai